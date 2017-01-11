var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/google', function(req, res, next) {
  request('http://www.google.com', function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body);
    }
  });
});

module.exports = router;