'use strict';

const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const users = require('./routes/users');
const maps = require('./routes/maps');

const app = express();
// const knex = require('knex')(require('knexfile').development);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));

/*Cookie Session
 ****************
 */
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

/*View Engine
 *************
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());

/*Routes
 *******
 */
app.use('/', routes);
app.use('/users', users);
app.use('/maps', maps);


/// catch 404 and forwarding to error handler

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});



module.exports = app;