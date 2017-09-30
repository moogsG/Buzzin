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

mapRouter.get('/:id/point', (req, res) =>{
    knex('points').select()
      .where({
        'map_id': req.params.id
      })
      .then((data) =>{
       let points = data;
        res.send(points);
      })
      .catch((err) => {
        console.error(err);
      })
})

mapRouter.get('/new', (req, res) => {
  res.render('./partials/maps/_createMaps');
});

mapRouter.get('/edit/:id', (req, res) => {
  if (!req.params.id) {
    let data = [];
  } else {
    knex('maps').select()
      .where({
        'id': req.params.id
      })
      .then((data) => {
        console.log(data);
        let templateVars = {
          map: data
        }

        res.render('./partials/maps/_editMaps', templateVars);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

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

mapRouter.post('/:id/newPoint', (req, res) => {
  let values = {
    user_id: req.session.username.id,
    map_id: req.body.mapId,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    address: req.body.address
  };

  knex('points').insert(values)
    .then(() => {
      console.log('Created new point');
      res.redirect('maps')
    })
    .catch((err) => {
      console.error(err);
    });
});
module.exports = mapRouter;
