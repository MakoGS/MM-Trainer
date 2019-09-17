'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const serveFavicon = require('serve-favicon');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const mongoose = require('mongoose');
const passport = require('passport');
const hbs     = require('hbs');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const shopRouter = require('./routes/shop');
const userRouter = require('./routes/user');
const ptRouter = require('./routes/search-pt');
const adminUsersRouter = require('./routes/admin/users');
const adminShopsRouter = require('./routes/admin/shops');
const adminPtRouter = require('./routes/admin/pt');
const app = express();

hbs.registerPartials(__dirname + '/views/partials');

// Setup view engine
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));
app.use(express.static(join(__dirname, 'public')));
app.use(sassMiddleware({
  src: join(__dirname, 'public'),
  dest: join(__dirname, 'public'),
  outputStyle: process.env.NODE_ENV === 'development' ? 'nested' : 'compressed',
  sourceMap: true
}));
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60 * 60 * 24 * 1000 },
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60
  })
}));

require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => { 
  // res.locals.user   = req.user;  
  if (req.user) { 
    res.locals.client = (req.user.role === 'client');
    res.locals.pt     = (req.user.role === 'personalTrainer');
    res.locals.admin  = (req.user.role === 'admin');
  }
  next(); 
});

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', shopRouter);
app.use('/', userRouter);
app.use('/', ptRouter);
app.use('/admin', adminPtRouter);
app.use('/admin', adminShopsRouter);
app.use('/admin', adminUsersRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};

  res.status(error.status || 500);
  res.render('error');
});

module.exports = app;