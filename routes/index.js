'use strict';
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    let object = {
        user: null
    }
    res.render('index', object);

});
module.exports = router;
