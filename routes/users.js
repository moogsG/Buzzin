'use strict';
const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const usersRoutes = express.Router();
const cookieSession = require('cookie-session');

/*Knex
 ******
 *Gets connect script from knexfile
 */
const knex = require('knex')(require('../knexfile').development);

usersRoutes.use(bodyParser.urlencoded({
    extended: true
}));

usersRoutes.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
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
usersRoutes.get('/login', (req, res) => {
    res.render('./partials/users/_login');
});

/*Login
 *******
 *Could be put request
 *Fix later
 */
const login = (req, res) => {
    if (!req.session.username) {
        let email = req.body.email;
        knex('users')
            .select()
            .where({
                'email': email
            })
            .then((login) => {
                if (bcrypt.compareSync(req.body.password, login[0].password)) {
                    req.session.username = login[0].user_name;
                    console.log(req.session.username);
                    let object = {
                        user: req.session.username
                    }

                    res.render('index', object)
                } else {
                    console.log('Passwords do not match!');
                    res.render('./partials/users/_userShow'); //Need to add error
                }
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        let object = {
            req: req.session.username
        }
        console.log('Already logged in!');
        res.render('index'); //Need to add error
    }
};

usersRoutes.get('/show', (req, res) => {
    let object = {
        user: req.session.username
    }
    res.render('./partials/users/_userShow', object);
});




usersRoutes.post('/login', (req, res) => {
    login(req, res);
});

/*Register
 **********
 */

usersRoutes.post('/register', (req, res) => {

    /*NEEDS CHECKS FOR SHIT*/

    let hash = bcrypt.hashSync(req.body.password, 10);

    let values = {
        user_name: req.body.username,
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
            login(req, res);
        });
});

usersRoutes.post('/favorite', (req, res) => {
  let values = {
    user_id: req.body.user_id,
    map_id: req.body.map_id
  };
  knex('fav_maps')
    .where(() => {
      knex('fav_maps').where({
        'user_id': values.user_id,
        'map_id': values.map_id
      });
    })
    .catch((err) => {
      res.render('./partials/maps/_showMaps');
      console.error(err);
    })
    .then((data) => {
        console.log(data);
      //knex.insert(values).into('fav_maps');
    })
    .then(() => {
      console.log('Added Favorite');
      res.render('./partials/maps/_showMaps');
    });
});
/*Clears cookies username
 **************************
 *Clears username cookie
 *Returns to /urls
 */
usersRoutes.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/');
});

module.exports = usersRoutes;