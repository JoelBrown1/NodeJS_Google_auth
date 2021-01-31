/**
 * routes for top level pages
 */

const express = require('express');
const passport = require('passport');
const router = express.Router();

/**
 * @description: Authenticate with google
 * @route:  GET /auth/google
 * @param: takes passport which requires the type of auth, and the scope of the auth
 * @docs: http://www.passportjs.org/packages/passport-google-oauth2/
 */
router.get('/google', passport.authenticate('google', { scope: ['profile']}))
/**
 * @description: Google auth callback
 * @route:  GET /auth/google/callback
 */
router.get('/google/callback', passport.authenticate( 'google', { 
  failureRedirect: '/'
}), (req, res) => {
  console.log('do we get past the failureRedirect catch');
  // if authentication is successfull, redirect to the dashboard
  // failure redirect is handled above
  res.redirect('/dashboard');
})

module.exports = router;