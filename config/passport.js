var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. 
// In other words, we want login with an email and password
passport.use(new LocalStrategy(
    {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
    }, 
    function (req, email, password, done) {
        console.log("authenticating user email here...");
        // When a user tries to sign in this code runs
        db.Worker.findOne({
            where: {
                email: email,
            }, function (err, worker) {
                if (err) return done (err);
                if(!worker) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }
                if(!user.validPassword(password)){
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
                }
            }
        }).then(function (dbWorker) {
            // If there's no user with the given email
            if(!dbWorker) {
                console.log("failure to login...");
            } else {
                console.log("TESTING name >>>>>>\n", dbWorker.name);
                console.log("TESTING email >>>>>>\n", dbWorker.email);
                console.log("successful login...");
                console.log("email accepted");
            }
            // if (!dbWorker) {
            //     console.log("ooops check email...");
            // } else {
            
            // return reset(null, dbWorker);
            // }
        });
    }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
