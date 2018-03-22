var bCrypt = require("bcrypt-nodejs");
// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

module.exports = function(passport, worker) {
  var Worker = worker;
  var LocalStrategy = require("passport-local").Strategy;

  //serialize
  passport.serializeUser(function(Worker, done) {
    done(null, Worker.id);
  });
  // deserialize user
  passport.deserializeUser(function(id, done) {
    db.Worker.findById(id).then(function(Worker) {
      if (Worker) {
        done(null, Worker.get());
      } else {
        done(Worker.errors, null);
      }
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // Telling passport we want to use a Local Strategy.
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        //storing all data
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null); //function that hashes password
        };
        //check to see user exists already
        db.Worker.findOne({
          where: {
            email: email
          }
        }).then(function(user) {
          if (user) {
            return done(null, false, {
              message: "That email is already taken"
            });
          } else {
            var userPassword = generateHash(password);

            var data = {
              email: email,

              password: userPassword,

              firstname: req.body.firstname,

              lastname: req.body.lastname
            };

            db.Worker.create(data).then(function(newWorker, created) {
              if (!newWorker) {
                return done(null, false);
              }

              if (newWorker) {
                return done(null, newWorker);
              }
            });
          }
        });
      }
    )
  );

  //LOCAL SIGN IN
  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email

        usernameField: "email",

        passwordField: "password",

        passReqToCallback: true // allows us to pass back the entire request to the callback
      },

      function(req, email, password, done) {
        var Worker = worker;

        var isValidPassword = function(Workerpass, password) {
          return bCrypt.compareSync(password, Workerpass);
        };

        db.Worker.findOne({
          where: {
            email: email
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist"
              });
            }

            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect password."
              });
            }

            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);

            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );
};

// // Telling passport we want to use a Local Strategy.
// // In other words, we want login with an email and password
// passport.use(new LocalStrategy(
//     {
//         usernameField: "email",
//         passwordField: "password",
//         passReqToCallback: true // allows us to pass back the entire request to the callback
//     },
//     function (req, email, password, done) {
//         console.log("authenticating user email here...");
//         // When a user tries to sign in this code runs
//         db.Worker.findOne({
//             where: {
//                 email: email,
//             }, function (err, worker) {
//                 if (err) return done (err);
//                 if(!worker) {
//                     return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
//                 }
//                 if(!user.validPassword(password)){
//                     return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
//                 }
//             }
//         }).then(function (dbWorker) {
//             // If there's no user with the given email
//             if(!dbWorker) {
//                 console.log("failure to login...");
//             } else {
//                 console.log("TESTING name >>>>>>\n", dbWorker.name);
//                 console.log("TESTING email >>>>>>\n", dbWorker.email);
//                 console.log("successful login...");
//                 console.log("email accepted");
//             }
//             // if (!dbWorker) {
//             //     console.log("ooops check email...");
//             // } else {

//             // return reset(null, dbWorker);
//             // }
//         });
//     }
// ));

// // In order to help keep authentication state across HTTP requests,
// // Sequelize needs to serialize and deserialize the user
// // Just consider this part boilerplate needed to make it all work
// passport.serializeUser(function (user, cb) {
//     cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//     cb(null, obj);
// });

// // Exporting our configured passport
// module.exports = passport;
