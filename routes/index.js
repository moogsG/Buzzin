'use strict';
const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {

  knex('maps').select()
    .then((maps) => {
      let templateVars = {
        maps: maps
      }
      res.render('index', templateVars)
    })


  // knex('users').select('map_name', 'map_description', 'map_image', 'user_name')
  //   .innerJoin('maps', 'users.id', 'maps.user_id').where({
  //     user_id: req.session.username
  //   })
  //   .asCallback(function(err, maps) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       let object = {
  //         user: null,
  //         maps: maps
  //       }
  //       res.render('index', object)

  //     }
  //   })
})


module.exports = router;
