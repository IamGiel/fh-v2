
// Grabbing our models
var db = require("../models");



// Routes
// =============================================================
module.exports = function (app) {

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
    app.get("/herewechat/:name", function (req, res) {
        db.Worker.findAll({ where: { name: req.params.name } })
            .then(function (data) {
                var hbsObject = { name: data };
                //console.log(hbsObject.workers[0].dataValues);

                res.render("chatbox");
            });
        
    });

    

    // GET route - homePage
    app.get("/homePage", function (req, res) {
        console.log("homePage is working");
        db.Worker.findAll({}).then(function (data) {
            var hbsObject = {
                worker: data
            };
            console.log("THIS is workers DATA heyyooo", hbsObject);
            res.render("homePage", hbsObject)
        })
    });

    //GET sign-up form
    app.get("/signupForm", function (req, res) {
            res.render("signupForm");
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
