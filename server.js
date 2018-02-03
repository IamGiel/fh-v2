// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require("body-parser");
const path = require('path');
var _ = require("underscore");

// Sets up the Express App
// =============================================================
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

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  http.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
