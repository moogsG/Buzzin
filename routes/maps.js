'use strict';
const express = require('express');
const mapRouter = express.Router();
const bodyParser = require('body-parser');
const knex = require('knex')(require('../knexfile').development);
const cookieSession = require('cookie-session');
mapRouter.use(bodyParser.urlencoded({
    extended: true
}));

mapRouter.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

/* GET Maps. */
mapRouter.get('/', function(req, res) {

    res.render('maps', {
        title: 'Express'
    });
});

mapRouter.get('/edit/:id', (req, res) => {
    if (!req.params.id) {
        console.log('no id')
    } else {
        knex('maps').select()
            .where({
                'id': req.params.id
            })
            .catch((err) => {
                console.error(err);
            })
            .then((data) => {
                let templateVars = {

                    map: data
                };
                console.log(data);
                res.render('./partials/maps/_editMaps', templateVars);
            });
    }
});

mapRouter.get('/:id/point', (req, res) => {
    knex('points').select()
        .where({
            'map_id': req.params.id
        })
        .then((data) => {
            let points = data;
            res.send(points);
        })
        .catch((err) => {
            console.error(err);
        });
});

mapRouter.get('/new', (req, res) => {
    res.render('./partials/maps/_createMaps');
});

mapRouter.get('/show/:id', (req, res) => {
    knex('maps').select()
        .where({
            'id': req.params.id
        })
        .catch((err) => {
            console.error(err);
        })
        .then((data) => {
            let templateVars = {
                user: req.session.username,
                map: data
            };
            console.log(templateVars);
            res.render('./partials/maps/_showMaps', templateVars);
        });

});

mapRouter.post('/newMap', (req, res) => {

    let values = {
        user_id: req.session.username,
        map_name: req.body.name
    };

    knex('maps').insert(values)
        .then(() => {
            console.log('Created new map');
        })
        .catch((err) => {
            console.error(err);
        })
        .then(() => {
            res.render('maps')
        });
});

mapRouter.post('/newPoint/:id', (req, res) => {
    console.log(req.body.userId)
    let values = {
        user_id: req.body.userId,
        map_id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        address: req.body.address
    };

    knex('points').insert(values)
        .then((point) => {
            console.log('Created new point');
            res.send(point);
        })
        .catch((err) => {
            console.error(err);
        });
});

module.exports = mapRouter;