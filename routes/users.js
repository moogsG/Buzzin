'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const usersRoutes = express.Router();


/*Knex
******
*Gets connect script from knexfile
*/
const knex = require('knex')(require('../public/scripts/knexfile').development);

usersRoutes.use(bodyParser.urlencoded({
  extended: true
}));

/* GET users listing. */
usersRoutes.get('/', (req, res) => {
  res.render('users');
});

/* GET partials
***************
*/
usersRoutes.get('/register', (req, res) => {
  res.render('./partials/users/_userRegister');
});

/*Login
 *******
 *Could be put request
 *Fix later
 */
usersRoutes.post('/login', (req, res) => {
  knex('users').select()
    .where('username', '=', req.body.username)
    .andWhere('password', '=', bcrypt.compareSync(req.body.password))
    .then((login) => {
      req.session.username = login[0].id;
    })
    .catch((err) => {
      console.error(err);
    })
    .then(() => {
      knex.destroy();
    });
    res.redirect('/');
});

/*Register
**********
*/
usersRoutes.post('/register', (req, res) => {

  /*NEEDS CHECKS FOR SHIT*/

  let hash = bcrypt.hashSync(req.body.password, 10);

  let values = {
    username: req.body.username,
    password: hash,
    email: req.body.email
  };
  knex('users').insert(values)
    .then(() => {
      console.log('Registered New User');
    })
    .catch((err) => {
      console.error(err);
    })
    .then(() => {
      knex.destroy();
    });

  req.session.username = req.body.username;
  res.redirect('/');
});

/*Clears cookies username
 **************************
 *Clears username cookie
 *Returns to /urls
 */
usersRoutes.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = usersRoutes;
