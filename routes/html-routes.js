
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/isAuthenticated");

module.exports = function (app) {


    //homepage
    
    app.get('/*', function (req, res) {
        res.render('homepage');
    });
    app.get('/homepage', function (req, res) {
        res.render('homepage');
    });
    // Here we've add our isAuthenticated middleware to this route.
    // If a user who is not logged in tries to access this route they will be redirected to the signup page
    app.get("/api/login", isAuthenticated, function (req, res) {
        res.render('homePage');
    });

    // // route for home page
    // app.get('/', function (req, res) {
    //     res.render('homePage'); 
    // });

    // route for login
    app.get('/login', function (req, res) {
        res.render('login'); 
    });

    
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

    app.get('/example/b', function (req, res, next) {
        console.log('the response will be sent by the next function ...')
        // next()
    }, function (req, res) {
        res.send('Hello from B!')
    })
    

};
