'use strict';
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
/* GET home page. */

router.get('/', function(req, res) {
  if (!req.session.username) {
    req.session.username = null;
  }
  knex('maps').select()
    .then((maps) => {
      console.log(req.session.username)
      let templateVars = {
        user: req.session.username,
        maps: maps
      }
      res.render('index', templateVars)
    })
});

module.exports = router;
