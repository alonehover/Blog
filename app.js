const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const routes = require('./routes');
const config = require('./config');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'resource/views'));
app.set('view engine', 'pug');   // 设置模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev')); // 加载日志中间件
app.use(bodyParser.json()); // 加载json解析中间件
app.use(bodyParser.urlencoded({ extended: false })); // 加载解析urlencoded请求体的中间件
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session(config.session));
app.use(flash());

routes(app);

app.listen(process.env.PORT || config.app, function() {
    console.log('Express server listening on port ' + config.app);
});

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('common/error', {
        error: err
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
        res.render('common/404');
    } else {
        res.render('common/error', { error: err });
    }
});

module.exports = app;
