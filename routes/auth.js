var authController = require("../controllers/authController.js");
var db = require("../models");


module.exports = function(app, passport) {
  app.get("/signupForm", authController.signup);
  app.get("/login", authController.login);
  app.get("/homePage", authController.homePage);
  app.get("/logout", authController.logout);
  app.get("/servicesList", authController.servicesList);
  app.get("/workersList", authController.workersList);
    app.get("/workersListMap", authController.workersListMap);


  // app.get("/chatBoxHirer", isLoggedIn, authController.chatBoxHirer);
  app.get("/workersListMap", authController.workersListMap);

  // GET all types of workers on a MAP with markers
  app.get("/workersListMap/:zip_code", function(req, res) {
    db.Worker.findAll({
      where: {
        zip_code: req.params.zip_code
      }
    }).then(function(data) {
      var hbsObject = {
        workers: data
      };
      console.log("HBSOBJECT HERE >>>>>>", hbsObject);
      //console.log(hbsObject.workers[0].dataValues);
      res.render("workersListMap", hbsObject);
    });
  });

  app.post(
    "/signupForm",
    passport.authenticate("local-signup", {
      successRedirect: "/workersList/:service",

      failureRedirect: "/signupForm"
    })
  );
  app.post(
    "/login",
    passport.authenticate("local-signin", {
      successRedirect: "/workersList/:service",

      failureRedirect: "/login",
      // failureFlash: false // allow flash messages
    })
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();

    res.redirect("/homePage");
  }
};
