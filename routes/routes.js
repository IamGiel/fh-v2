
// Grabbing our models
var db = require("../models");
var passport = require("passport");

// Routes
// =============================================================
module.exports = function (app,) {

    // GET root route (thank for this Kane)
    app.get("/profile", function (req, res) {
        res.render("profile");
    });

    // GET all types of workers
    app.get("/workersList/:service", function (req, res) {
        db.Worker.findAll({where: {Service: req.params.service}})
        .then(function (data) {
            var hbsObject = {workers: data};
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
                console.log("HBSOBJECT HERE >>>>>>",hbsObject);
                //console.log(hbsObject.workers[0].dataValues);
                res.render("workersListMap", hbsObject)
            });
    });

    //chatbox page
    app.post("/api/login", function (req, res) {
        db.Worker.findAll({ where: { 
            email: req.body.email,
            password: req.body.password
             } 
        }).then(function (data) {
            if (data.length === 0) {
                res.render("login");
            }
            else {
            console.log(data);
                var hbsObject = { user: data };
                res.render("chatBox", hbsObject);
            }
            });
    });

    app.get("/chat/:id", function (req, res) {
        res.render("chatBoxHirer");
});

    // GET route - homePage
    app.get("/homePage", function (req, res) {
        console.log("homePage is working");
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

    app.get("/login", function (req, res) {
        res.render("login");
});

    app.get("/servicesList", function(req, res) {
        res.render("servicesList");
    });

    // GET root route (thank for this Kane)
    app.get("/*", function (req, res) {
        res.render("homePage");
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
    module.exports = function (app, passport) {

        // route for home page
        app.get('/', function (req, res) {
            res.render('homepage'); // load the index.ejs file
        });

        // route for login form
        // route for processing the login form
        // route for signup form
        // route for processing the signup form

        // route for showing the profile page
        app.get('/profile', isLoggedIn, function (req, res) {
            res.render('profile', {
                user: req.user // get the user out of session and pass to template
            });
        });

        


        // =====================================
        // FACEBOOK ROUTES =====================
        // =====================================
        // route for facebook authentication and login
        app.get('/auth/facebook', passport.authenticate('facebook', {
            scope: ['public_profile', 'email']
        }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/profile',
                failureRedirect: '/'
            }));

        // route for logging out
        app.get('/logout', function (req, res) {
            req.logout();
            res.redirect('/');
        });

    };

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/');
    }
//===================================================================

}
