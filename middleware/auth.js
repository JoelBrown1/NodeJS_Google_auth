module.exports = {
  ensureAuth: function (req, res, next) {
    console.log('what are the keys in req: ', Object.keys(req));
    /**
     * params passed in are:
     * request
     * response
     * 'next' - is the next function to call when finished with current logic
     */
    try {
      console.log('ensureAuth: req obj: ', req);
      if(req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/');
      }     
    } catch (error) {
      console.error(error)
    }
  },
  ensureGuest: function (req, res, next) {
    try {
      console.log('ensureGuest: req obj: ', req);
      if(req.isAuthenticated()) {
        res.redirect('/dashboard')
      } else {
        return next();
      }    
    } catch (error) {
      console.error(error)
    }
  }
}