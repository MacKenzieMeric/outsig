const bodyParser = require('body-parser');
const check = require('express-validator');
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(bodyParser.urlencoded({extended: true}));
app.use(check());
app.use(express.static(__dirname + '/public'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret',
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 60 * 60 * 1000}
}));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/', routes); // Define last

app.listen(port);
