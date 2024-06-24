const express = require('express');
const passport = require('passport');
const router = express.Router();

//@des auth with google
//@route GET/auth/google

router.get('/google', passport.authenticate('google', {scope:['profile']}))

//@des  Google auth callback
//@route GET/auth/google/callback

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/dashboard');
})


// @desc Logout User
// @route /user/logout

module.exports = router