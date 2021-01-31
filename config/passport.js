const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Person = require('../models/Person');

// passport was passed in from app.js and can be used here
module.exports = function(passport) {
  // create a new google strategy that passport can use
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback' // path to callback - needs to match exactly as found in app.js and routes/auth.js
  }, 
  async (accessToken, refreshToken, profile, done) => {
    console.log('do we get to the google strategy async function');
    console.log(profile) 
    // 'done' is called to signify that we are finished with all the logic and ready to continue
  }));

  // more explanation given in passport docs for the use of serialize and deserialize functions:
  // http://www.passportjs.org/docs/
  passport.serializeUser( (user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser( (id, done) => {
    Person.findById(id, (err, user) => {
      done(err, user);
    });
  });
}