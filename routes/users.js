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
usersRoutes.get('/show', (req, res) => {
    knex('maps')
        .select()
        .where({
            'user_id': req.session.userid
        })
        .then((userMaps) => {
            let templateVars = {
                maps: userMaps,
                user: req.session.username,
                userId: req.session.userid
            }
            res.render('./userShow', templateVars);
        });
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
                    req.session.userid = login[0].id;
                    res.redirect('/')
                } else {
                    console.log('Passwords do not match!');
                    res.redirect(' /'); //Need to add error
                }
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        console.log('Already logged in!');
        res.redirect('/'); //Need to add error
    }
};

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
        .catch((err) => {
            console.error(err);
        })
        .then(() => {
            console.log('Registered New User');
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
        .where({
            'user_id': values.user_id,
            'map_id': values.map_id
        })
        .catch((err) => {
            res.render('./partials/maps/_showMaps');
            console.error(err);
        })
        .then((data) => {
            if (data[0]) {
                if (data[0].user_id == values.user_id && data[0].map_id == values.map_id) {
                    console.log('Data Exists');
                } else {
                    return knex('fav_maps').insert(values);
                    console.log('Insert data');
                }
            } else {
                return knex('fav_maps').insert(values);
                console.log('Insert data');
            }
        })
        .then(() => {
            res.redirect('/');
        })
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
