// Grabbing our models
var db = require("../models");
var passport = require("../config/passport");

// Routes
// =============================================================
module.exports = function (app, passport) {
    //at login route - authenticate
    app.get('/login', passport.authenticate('local', {
        successRedirect: 'homePage',
        failureRedirect: '/login'
    }));

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
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }

    // GET all types of workers
    app.get("/workersList/:service", function (req, res) {
        db.Worker.findAll({ where: { Service: req.params.service } })
            .then(function (data) {
                var hbsObject = { workers: data };
                //console.log(hbsObject.workers[0].dataValues);
                res.render("workersList", hbsObject)
            });
    });

    // GET all types of workers on a MAP with markers
    app.get("/workersListMap/:zip_code", function (req, res) {
        db.Worker.findAll({ where: { zip_code: req.params.zip_code } })

            if (req.user) {
                res.redirect("/workersListMap/:zip_coder")
                .then(function (data) {
                    var hbsObject = { workers: data };
                    console.log("HBSOBJECT HERE >>>>>>", hbsObject);
                    //console.log(hbsObject.workers[0].dataValues);
                    res.render("workersListMap", hbsObject)
                });
            }
            else{ 
                res.render("login");
            }       
    });

    // GET route - homePage
    app.get("/homePage", function (req, res) {
        console.log("homePage route is working from rout.js >>>>>>>>>");
        db.Worker.findAll({}).then(function (data) {
            var hbsObject = {
                worker: data
            };
            console.log("THIS is workers DATA heyyooo", hbsObject);
            res.render("homePage")
        })
    });

    //GET sign-up form
    app.get("/signupForm", function (req, res) {
        res.render("signupForm");
    });
    app.get("/servicesList", function (req, res) {
        res.render("servicesList");
    });



    // NEW USER info after sign-up, ADD to DATABASE (THIS CONNECTS WITH JQUERY WITH SAME post METHOD and ROUTE)
    app.post("/api/posts", function (req, res) {
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
        })
            .then(function (dbPost) {
                res.json(dbPost);
            });
    });


    // =============================================================


    //===================================================================

}