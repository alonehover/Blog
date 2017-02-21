var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

var routes = require('./routes/index');
var config = require('./config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');   // 设置模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev')); // 加载日志中间件
app.use(bodyParser.json()); // 加载json解析中间件
app.use(bodyParser.urlencoded({ extended: false })); // 加载解析urlencoded请求体的中间件
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// config.session.store = new MongoStore(config.mongo);
app.use(session(config.session));
app.use(flash());

routes(app);

app.listen(process.env.PORT || config.app, function() {
  console.log('Express server listening on port ' + config.app);
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('common/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('common/error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
