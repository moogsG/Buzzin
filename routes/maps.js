'use strict';
const express = require('express');
const mapRouter = express.Router();
const bodyParser = require('body-parser');
const knex = require('knex')(require('../knexfile').development);
const cookieSession = require('cookie-session');
mapRouter.use(bodyParser.urlencoded({
    extended: true
}));

/* GET Maps. */
mapRouter.get('/', function(req, res) {
    let templateVars = {
        user: req.session.username,
        userId: req.session.userid,
        map: data
    };
    res.render('maps', templateVars, {
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
                console.log('foo')
                let templateVars = {
                    user: req.session.username,
                    userId: req.session.userid,
                    map: data
                };
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
            res.send(data)
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
        .then((map) => {
            let templateVars = {
                user: req.session.username,
                userId: req.session.userid,
                map: map
            };
            res.render('./partials/maps/_showMaps', templateVars);
        });
});

mapRouter.post('/newMap', (req, res) => {
    console.log(req.session.userid);
    let values = {
        user_id: req.session.userid,
        map_name: req.body.name
    };
    knex('maps').insert(values)
        .catch((err) => {
            console.error(err);
        })
        .then(() => {
            console.log('Created new map');
        })
        .then(() => {
            res.redirect('/')
        });

});

mapRouter.post('/newPoint/:id', (req, res) => {
    let values = {
        user_id: req.body.user,
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
