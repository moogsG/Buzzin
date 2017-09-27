'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const users = require('./routes/users');

const app = express();

// view engine setup

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});



module.exports = app;
