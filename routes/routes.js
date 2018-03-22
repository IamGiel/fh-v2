// Grabbing our models

var passport = require("../config/passport");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  //at login route - authenticate
  // app.get('/login', passport.authenticate('local', {
  //     successRedirect: 'homePage',
  //     failureRedirect: '/login'
  // }));

  
  
  // redirect to the secure profile section // redirect back to the signup page if there is an error // allow flash messages

  app.post("/api/signup", function (req, res) {
      console.log(req.body);
      db.User.create({
          email: req.body.email,
          password: req.body.password
      }).then(function () {
          res.redirect(307, "/api/login");
      }).catch(function (err) {
          console.log(err);
          res.json(err);
          // res.status(422).json(err.errors[0].message);
      });
  });

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {

      // if user is authenticated in the session, carry on
      if (req.isAuthenticated){
          return next();
      } else {
      alert("dont know you...");

      // if they aren't redirect them to the home page
      res.redirect('/');
      }
  }

 

  // NEW USER info after sign-up, ADD to DATABASE (THIS CONNECTS WITH JQUERY WITH SAME post METHOD and ROUTE)
  app.post("/api/posts", function(req, res) {
    console.log("SEE THIS IN CONSOLE", req.body);
    db.Worker.create({
      url_link: req.body.url_link,
      name: req.body.name,
      zip_code: req.body.zip_code,
      comment: req.body.comment,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      service: req.body.service
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
