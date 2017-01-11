var express = require('express');
var router = express.Router();

var passport = require('../auth');

router.get('/login', function(req,res,next){
  res.locals.title = 'Log In';
  res.render('auth');
});

router.post('/login', passport.authenticate('local', {
  failureRedirect : '/login',
  successRedirect: '/user'
}));

router.get('/user', function(req,res,next){
  if(req.session.passport && req.session.passport.user){
    res.locals.title = 'Welcome!';
    res.locals.user = req.user;
    res.render('user');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;