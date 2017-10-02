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
  knex('users').select('map_name', 'map_description', 'user_name').innerJoin('maps', 'users.id', 'maps.user_id')
    .where({
      'users.id': req.session.id
    })
    .then((maps) => {
      let templateVars = {
        user: req.session.username,
        userId: req.session.userid,
        maps: maps
      }
      res.render('index', templateVars);
    })

});

module.exports = router;