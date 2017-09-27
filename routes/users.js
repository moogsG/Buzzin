'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

app.post("/login", (req, res, next) => {
  for (var key in users) {
    var user = users[key];
    if (user.email === req.body['email']) {
      if (bcrypt.compareSync(req.body['password'], user.password)) {
        req.session.username = user;
        res.redirect('/');
      } else {
        var err = new Error();
        err.status = 401;
        err.message = "Wrong password."
        next(err);
      };
    }
  }
  var err = new Error();
  err.status = 404;
  err.message = "Email is not registered."
  next(err);
});

module.exports = router;
