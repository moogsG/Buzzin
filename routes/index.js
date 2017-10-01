'use strict';
var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile').development);

/* GET home page. */
router.get('/', function(req, res) {
    let object = {
        user: null
    }
    res.render('index', object);

});

// router.get('/users', function(req, res) {
//     knex('users')
//       .select()
//       .then((users) => {
//         res.render('index', users)
//       })
//       .catch((err) => {
//         console.error(err);
//       })
//   } else {
//     console.log('Already logged in!');
//     res.redirect('/users'); //Need to add error
//   }
// }
module.exports = router;