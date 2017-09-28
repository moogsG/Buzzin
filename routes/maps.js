'use strict';
const express = require('express');
const mapRouter = express.Router();

/* GET Maps. */
mapRouter.get('/', function(req, res) {

    res.render('maps', {
        title: 'Express'
    });
});

module.exports = mapRouter;