// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var bodyParser = require("body-parser");
const path = require("path");
var session = require("express-session");
var passport = require("passport");
var flash = require("connect-flash");
var _ = require("underscore");
var env = require("dotenv").load();

//Environment variables
require("dotenv").config();
clientID: process.env.CLIENT_ID;
clientSecret: process.env.CLIENT_SECRET;

// Sets up the Express App
// =============================================================
var PORT = process.env.PORT || 8000;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
// Static directory
app.use(express.static("public"));

var exphbs = require("express-handlebars");
var hbs = exphbs.create({
  // Specify helpers which are only registered on this instance.
  defaultLayout: "main",
  helpers: {
    everyNth: function(context, every, options) {
      var fn = options.fn,
        inverse = options.inverse;
      var ret = "";
      if (context && context.length > 0) {
        for (var i = 0, j = context.length; i < j; i++) {
          var modZero = i % every === 0;
          ret =
            ret +
            fn(
              _.extend({}, context[i], {
                isModZero: modZero,
                isModZeroNotFirst: modZero && i > 0,
                isLast: i === context.length - 1
              })
            );
        }
      } else {
        ret = inverse(this);
      }
      return ret;
    }
  }
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

/// required for passport
app.use(session({ secret: "gel" })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Routes
// =============================================================
require("./routes/routes.js")(app, passport);
require("./routes/html-routes.js")(app);
//Routes
var authRoute = require("./routes/auth.js")(app, passport);
//load passport strategies
require("./config/passport.js")(passport, db.Worker);

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
});

// app.get("/", function(req, res) {
//   res.send("Welcome to Passport with Sequelize");
// });

app.listen(PORT, function(err) {
  if (!err) console.log("Site is live");
  else console.log(err);
});

db.sequelize
  .sync()
  .then(function() {
    console.log("Nice! Database looks fine");
  })
  .catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
  });

//=======
// Imp NTH:
// trying to Remove DS Store. Use Code below:
// find. - name.DS_Store - print0 | xargs - 0 git rm - f--ignore - unmatch
