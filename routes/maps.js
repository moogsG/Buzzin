'use strict';
const express = require('express');
const router = express.Router();

/* GET Maps. */
router.get('/', function(req, res) {
  res.render('maps', { title: 'Express' });
});

module.exports = router;
