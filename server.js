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
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;


//Environment variables
require('dotenv').config();
clientID: "1034421344860-ksgl4clmlrtsm20bej5kvev2v1pnuk7e.apps.googleusercontent.com";
clientSecret: "YUGny2EgMQtDg6Jd7u8XLljA";


// Sets up the Express App
// =============================================================
var PORT = process.env.PORT || 8000;

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

// required for passport

app.use(passport.initialize());


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Google authentication configuration
passport.use(new GoogleStrategy({
  clientID: "1034421344860-ksgl4clmlrtsm20bej5kvev2v1pnuk7e.apps.googleusercontent.com",
  clientSecret: "YUGny2EgMQtDg6Jd7u8XLljA",
  callbackURL: "http://localhost:8080/auth/google/callback"
},
  function (accessToken, refreshToken, profile, done) {
    db.users.findOne({ where: { google_id: profile.id } }).then(function (user) {
      if (!user) {
        var google_id = profile.id;
        var email = profile.emails[0].value;
        db.users.create({ user_email: email, google_id: google_id }).then(function (user) {
          return done(null, user);
        })
      } else {
        return done(null, user);
      }
    })
  }
));



// Routes
// =============================================================
require('./routes/routes.js')(app, passport);

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
