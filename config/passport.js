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
    console.log(profile);

    // build a new person profile
    const newPerson = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value
    }

    // check to see if the person is already in the database
    try {
      let person = await Person.findOne({ googleId: profile.id})
      console.log('do we have a person: ', person);
      if ( person === null ) {
        console.log('we should be adding a person to the db');
        // if person doesn't exist in the database, create a new record for the person
        person = await Person.create(newPerson);
      }
      // return the person without an error (null is space holder for error)
      done(null, person);
    } catch (err) {
      console.error('we had an error trying to create a new person in the DB: ', err)
    }
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