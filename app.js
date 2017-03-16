const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');



const routes = require('./routes');
const config = require('./config');

const app = express();

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
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.use(function (req, res, next) {
    next({
      code: 'NotFound',
      message: 'NotFound ' + req.path
    });
});

app.use(function(err, req, res, next) {
    if (err.code == 'NotFound') {
        res.render('404');
    } else {
        res.render('error', { error: err });
    }
});

module.exports = app;
