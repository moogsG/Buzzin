'use strict';
const express = require('express');
const mapRouter = express.Router();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const knex = require('knex')(require('../knexfile').development);

mapRouter.use(bodyParser.urlencoded({
  extended: true
}));

/* GET Maps. */
mapRouter.get('/', function(req, res) {

  res.render('maps', {
    title: 'Express'
  });
});

mapRouter.get('/new', (req, res) => {
  res.render('./partials/maps/_createMaps');
});

/*mapRouter.get('/edit/:id', (req, res) => {
      knex('maps').select()
      .where({
        'id': req.body.mapId
      })
    .then((data) => {
      console.log('Map found!' + data);
      res.render('./partials/maps/_editMaps', data)
    })
    .catch((err) => {
      console.error(err);
    });
});*/

mapRouter.get('/show', (req, res) => {
  res.render('./partials/maps/_showMaps');
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

mapRouter.post('/newPoint', (req, res) => {
  let values = {
    user_id: req.session.username,
    map_id: req.body.mapId,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    address: req.body.address
  };

  knex('maps').insert(values)
    .then(() => {
      console.log('Created new point');
    })
    .catch((err) => {
      console.error(err);
    });
});
module.exports = mapRouter;
