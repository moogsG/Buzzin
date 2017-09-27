'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes/index');
const users = require('./routes/users');
const maps = require('./routes/maps');

const app = express();

const settings = require("./settings"); // settings.json
module.exports = require('knex')(require('./knexfile')['development']);

/*Cookie Session
 ****************
 */
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

/*View Engine
 *************
 */

//THis is a test comment\\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(cookieParser());

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