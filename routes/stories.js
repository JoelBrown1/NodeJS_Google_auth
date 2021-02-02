const express = require('express');
const router = express.Router();
const {ensureAuth} = require('../middleware/auth');

const Story = require('../models/Story');

/**
 * @description: show add story page
 * @route: GET /stories/add
 */
router.get('/add', ensureAuth, (req, res) => {
  res.render('stories/add')
})
/**
 * @description: Process add form
 * @route: POST /stories
 */
router.post('/', ensureAuth, async (req, res) => {
  try {
    /** 
     * to use reqest.body somme middleware is required in the app
     * express urlencoding needs to be added
     * also add exoress json whick allows the use of json formatted data
    */
   // add the user data to the request body because the story data schema requires the user id
    req.body.user = req.user.id
    console.log('new story data: ', req.body);
    // make an entry into the stories db for the new story
    await Story.create(req.body);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error)
    res.render('error/500')
  }
})

/**
 * @description: show all stories
 * @route: GET /stories
 */
router.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({status: 'public'})
      .populate('user')
      .sort({createdAt: 'desc'})
      .lean();
    res.render('stories/index', {stories});
  } catch (error) {
    console.error(error);
    res.render('error/500')
  }
})


module.exports = router;