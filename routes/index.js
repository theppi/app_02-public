const express = require('express'),
    router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(Object.keys(req.app.get("sockets")));
  res.render('index', { title: 'Express' });
});

module.exports = router;
