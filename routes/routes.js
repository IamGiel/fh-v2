// Grabbing our models
var db = require("../models");
var passport = require("../config/passport");

// Routes
// =============================================================
module.exports = function (app, passport) {

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
        // So we're sending the user back the route to the members page because the redirect will happen on the front end
        // They won't get this or even be able to access this page if they aren't authed
        res.json("/chatBoxHirer");
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
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

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });


    // =====================================
    // google ROUTES =====================
    // =====================================
    // route for google authentication and login
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['public_profile', 'email']
    }));

    // handle the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // route for logging out
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
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
        console.log("HBSOBJECT HERE >>>>>>", req.params);
        db.Worker.findAll({ where: { zip_code: req.params.zip_code } })
            .then(function (data) {
                var hbsObject = { workers: data };
                console.log("HBSOBJECT HERE >>>>>>", hbsObject);
                //console.log(hbsObject.workers[0].dataValues);
                res.render("workersListMap", hbsObject)
            });
    });



    app.get("/chat/:id", function (req, res) {
        res.render("chatBoxHirer");
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