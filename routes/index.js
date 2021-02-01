/**
 * routes for top level pages
 */

const express = require('express');
const router = express.Router();

// bring in the story model
const Story = require('../models/Stories');

/**
 * bringing in the route protection middleware
 * @abstract: to use ensureAuth or ensureGuest,
 * add the required function to as the second parameter to 
 * the get request function
 */
const {ensureAuth, ensureGuest} = require('../middleware/auth');

/**
 * @description: Login/Landing page
 * @route:  GET /
 */
router.get('/', ensureGuest, async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.user.id
    }).lean();
    res.render('login', {layout: 'login'});
  } catch (err) {
    console.error(err)
    res.render('error/500');
  }
})
/**
 * @description: Dashboard
 * @route:  GET /dashboard
 */
router.get('/dashboard', ensureAuth, (req, res) => {
  res.render('dashboard', {
    name: req.user.firstName,

  });
})

module.exports = router;