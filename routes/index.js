'use strict';
var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile').development);

/* GET home page. */
router.get('/', function(req, res) {
      knex('users').select('map_name', 'map_description', 'map_image', 'user_name')
        .innerJoin('maps', 'users.id', 'maps.user_id').where({
          user_id: users
        })
        .asCallback(function(err, maps) {
            if (err) {
              console.log(err);
            } else {
              res.render('index', maps)

            })

          module.exports = router;