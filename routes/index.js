'use strict';
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile').development);

/* GET home page. */
router.get('/', function(req, res) {

  knex('maps').select()
    .then((maps) => {
      let templateVars = {
        maps: maps
      }
      res.render('index', templateVars)
    })
})

module.exports = router;
