
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");


// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/isAuthenticated");

module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('homePage', {});
    });

     //GET route - homePage
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

    //GET route sign-up form
    app.get("/signupForm", function (req, res) {
        res.render("signupForm");
    });

    // GET route login
    app.get('/login', function (req, res) {
        res.render('login');
    });

    //GET route service category
    app.get("/servicesList", function (req, res) {
        res.render("servicesList");
    });

    // GET all list of workers in each category
    // parse MYSQL,
    // render data using HANDLEBARS 
    app.get("/workersList/:service", function (req, res) {
        db.Worker.findAll({ where: { Service: req.params.service } })
            .then(function (data) {
                var hbsObject = { workers: data };
                //console.log(hbsObject.workers[0].dataValues);
                res.render("workersList", hbsObject)
            });
    });

   


    //********* BELOW ARE RESTRICTED ROUTES ***** */
    //code block: if user clicked on chat feature and is not logged in, render login page
    app.get("/mailto:email", function (req, res) {
        // If the user already has an account allow chat page to render
        if (req.user) {
            res.render("mailto:");
        }
        //if not, render sign-up form
        else {
            res.render("login");
        }
    });

    //code block: if user clicked on chat feature and is not logged in, render login page
    app.get("/chat/:id", function (req, res) {
         // If the user already has an account allow chat page to render
        if (req.user){
            res.render("chatBoxHirer");
        }
        //if not, render sign-up form
        else {
            res.render("login");
        }
    });

    // code block: if user clicked on map feature and is not logged in, render login page
    app.get("/workersListMap", function (req, res) {
        // If the user already has an account allow map page to render
        if (req.user) {
            res.redirect("workersListMap");
        }
        else {
            //if not, render sign-up form
            res.render("signupForm");
            //if successful login redirect to the map
            // >> how to code that?
        }
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/signupForm", isAuthenticated, function (req, res) {
        res.render("homePage");
    });

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function (req, res) {
        console.log("firing here from profile page >>>>>>>>>>>", req.user);
        res.render('chatterBoxHirer', {
            user: req.user // get the user out of session and pass to template
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
    
    // app.get('/*', function (req, res) {
    //     res.render('homepage');
    // });
    

};
