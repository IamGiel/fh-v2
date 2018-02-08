
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/isAuthenticated");

module.exports = function (app) {

    // // route for home page
    app.get('/', function (req, res, next) {
        res.render('homePage'); // load the index.ejs file
    });

    app.get("/chat/:id", function (req, res) {
        if (req.user){
            res.render("chatBoxHirer");
        }
        else {
            res.render("login");
        }
    });

    // route for home page with a conditional
    app.get("/workersListMap", function (req, res) {
        // If the user already has an account allow map to render
        if (req.user) {
            res.redirect("workersListMap");
        }
        //if not, render sign-up form
        res.render("signupForm");
    });

    app.get("/login", function (req, res) {
        // If the user already has an account send them to the home page
        if (req.user) {
            res.redirect("/chatBoxHirer");
        }
        res.render("login");
    });

    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/signupForm", isAuthenticated, function (req, res) {
        res.render("signupForm");
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

    app.get('/example/b', function (req, res, next) {
        console.log('the response will be sent by the next function ...')
        // next()
    }, function (req, res) {
        res.send('Hello from B!')
    })
    

};
