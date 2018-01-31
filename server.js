// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

const multer = require('multer');
const path = require('path');

var _ = require("underscore");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");



// Sets up the Express app to handle data parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Static directory
app.use(express.static('public'));

//@@@@@@@@@@@@@@@@@@@@@@>>>>> MULTER START<<<<<@@@@@@@@@@@@@@@@@@@@@@@@@@
// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

app.get('/', (req, res) => res.render('signupForm'));

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('signupForm', {
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.render('signupForm', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('signupForm', { file: "/uploads/" + req.file.filename});
      }
    }
  });
});

//@@@@@@@@@@@@@@@@@@@@@@>>>>> MULTER END <<<<<@@@@@@@@@@@@@@@@@@@@@@@@@@


var exphbs = require('express-handlebars');
var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance. 
  defaultLayout: "main",
  helpers: {
    everyNth: function (context, every, options) {
      var fn = options.fn, inverse = options.inverse;
      var ret = "";
      if (context && context.length > 0) {
        for (var i = 0, j = context.length; i < j; i++) {
          var modZero = i % every === 0;
          ret = ret + fn(_.extend({}, context[i], {
            isModZero: modZero,
            isModZeroNotFirst: modZero && i > 0,
            isLast: i === context.length - 1
          }));
        }
      } else {
        ret = inverse(this);
      }
      return ret;
    }
  }
});




app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
// =============================================================
require('./routes/routes.js')(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
