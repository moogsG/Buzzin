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

/*GET map by ID for Editing
 ***************************
 *Sends back map data
 */
mapRouter.get('/edit/:id', (req, res) => {
  if (!req.params.id) {} else {
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
          userId: req.session.userid,
          map: data
        };
        res.render('./partials/maps/_editMaps', templateVars);
      });
  };
});

/*GET points for map based off of map ID
 ****************************************
 *Sends back points
 */
mapRouter.get('/:id/point', (req, res) => {
  knex('points').select()
    .where({
      'map_id': req.params.id
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

/*GET new form for creating maps
 */
mapRouter.get('/new', (req, res) => {
  res.render('./partials/maps/_createMaps');
});

/*GET show for maps based on ID
 */
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
        maps: map
      };
      res.render('./partials/maps/_showMap', templateVars);
    });
});

/*POST Request for new Map
 */
mapRouter.post('/newMap', (req, res) => {

  let values = {
    user_id: req.session.userid,
    map_name: req.body.name,
    map_description: req.body.description,
    map_image: req.body.img
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

/*POST request to create a new point
 */
mapRouter.post('/newPoint/:id', (req, res) => {
  let values = {
    user_id: req.body.user,
    map_id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    address: req.body.address
  };
  console.log(values);

  knex('points').insert(values)
    .then((point) => {
      console.log('Created new point');
    })
    .catch((err) => {
      console.error(err);
    });
});

module.exports = mapRouter;
