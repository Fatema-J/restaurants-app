var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

require('dotenv').config()
require('./config/database')
require('./config/passport');

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var restaurantsRouter = require('./routes/restaurants')
var basketsRouter = require('./routes/baskets')
const orderedItemsRouter = require('./routes/ordered-item')
var recieptRouter = require('./routes/reciept')
var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(methodOverride('_method'));

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
<<<<<<< HEAD
  res.locals.user = req.user
  next()
})
=======
  res.locals.user = req.user;
  next();
});
>>>>>>> 0ebbe03e47752d97c4c155c58feaeee0508fcc43

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/restaurants', restaurantsRouter)
app.use('/baskets', basketsRouter)
app.use('/', orderedItemsRouter)
app.use('/reciept', recieptRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
