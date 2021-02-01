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
  // if authentication is successfull, redirect to the dashboard
  // failure redirect is handled above
  res.redirect('/dashboard');
})

/**
 * @description:  logout the user
 * @route: GET /auth/logout
 */
router.get('/logout', (req, res) => {
  // with passport middleware, we have the logout method on the req obj
  req.logOut();
  // send the user to the index page
  res.redirect('/');
})

module.exports = router;