// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads homepage.handlebars
  app.get("/", function(req, res) {
    res.render("homePage", {});
  });
  // index route loads servicesList.handlebars
  app.get("/servicesList", function(req, res) {
    res.render("servicesList", {});
  });
  // index route loads login.handlebars
  app.get("/login", function(req, res) {
    res.render("login", {});
  });
  // index route loads signupForm.handlebars
  app.get("/signupForm", function(req, res) {
    res.render("signupForm", {});
  });
  // GET all list of workers in each category
  // parse MYSQL,
  // render data using HANDLEBARS
  app.get("/workersList/:service", function(req, res) {
    db.Worker.findAll({
      where: {
        Service: req.params.service
      }
    }).then(function(data) {
      var hbsObject = {
        workers: data
      };
      //console.log(hbsObject.workers[0].dataValues);
      res.render("workersList", hbsObject);
    });
  });
};
