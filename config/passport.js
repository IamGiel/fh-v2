// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
// load up the user model
var Worker = require('../models/worker');
// load the auth variables
var configAuth = require('./auth');

module.exports = function (passport) {

    // used to serialize the worker for the session
    passport.serializeWorker(function (worker, done) {
        done(null, worker.id);
    });

    // used to deserialize the worker
    passport.deserializeWorker(function (id, done) {
        Worker.findById(id, function (err, worker) {
            done(err, worker);
        });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL
    },

        // facebook will send back the token and profile
        function (token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {

                // find the user in the database based on their facebook id
                Worker.findOne({ 'facebook.id': profile.id }, function (err, worker) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the worker is found, then log them in
                    if (worker) {
                        return done(null, worker); // user found, return that user
                    } else {
                        // if there is no user found with that facebook id, create them
                        var newWorker = new Worker();

                        // set all of the facebook information in our user model
                        newWorker.facebook.id = profile.id; // set the users facebook id                   
                        newWorker.facebook.token = token; // we will save the token that facebook provides to the user                    
                        newWorker.facebook.name = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        newWorker.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                        // save our user to the database
                        newWorker.save(function (err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newWorker);
                        });
                    }

                });
            });

        }));


}