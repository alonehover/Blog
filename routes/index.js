var User = require('../models/user');
var md5 = require('../lib/md5');

// 检测登陆状态
function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('info', '未登录!');
    return res.redirect('/login');
  }
  next();
}


function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.flash('info', '已登录!');
    return res.redirect('back');
  }
  next();
}

module.exports = function (app) {

  // 主页
  app.get('/', function (req, res, next) {
        res.render('index', {
          title: '主页',
          user: req.session.user,
          flash: req.flash('info').toString()
        });
  });

  // 注册显示
  app.get('/reg', checkNotLogin);
  app.get('/reg', function (req, res, next) {
    res.render('reg', {
      title: '注册',
      user: req.session.user,
      flash: req.flash('info').toString()
    });
  });


  // 注册操作
  app.post('/reg', checkNotLogin);
  app.post('/reg', function (req, res, next) {
    var body = req.body;
    var name = body.name;
    var password = body.password;
    var password_re = body.password_repeat;
    var email = body.email;

    if (password_re !== password) {
      req.flash('info', '两次输入的密码不一致!');
      return res.redirect('/reg');
    }

    User.get(name, function (err, user) {
      if (err) {
        console.log(err);
        return next(err);
      }
      if (user) {
        req.flash('info', '用户已存在!');
        return res.redirect('/reg');
      }

      var newUser = {
          name: name,
          password: md5(password),
          email: email,
      };

      console.log("准备插入数据");
      User.save(newUser, function (err) {
        if (err) {
          console.log('存储失败！');
          return next(err);
        }
        delete newUser.password;
        req.session.user = newUser;
        req.flash('info', '注册成功!');
        res.redirect('/');
      });
    });
  });

  // 登录显示
  app.get('/login', checkNotLogin);
  app.get('/login', function (req, res, next) {
    res.render('signin', {
      title: '登录',
      user: req.session.user,
      flash: req.flash('info').toString()
    });
  });

  // 登录操作
  app.post('/login', checkNotLogin);
  app.post('/login', function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;

    User.get(name, function (err, user) {
      if (err) {
        return next(err);
      }

      if (!user) {
        req.flash('info', '用户不存在!');
        return res.redirect('/login');
      }

      if (user.password != md5(password)) {
        req.flash('info', '密码错误!');
        return res.redirect('/login');
      }

      delete user.password;
      req.session.user = user;
      req.flash('info', '登录成功!');
      res.redirect('/');
    });
  });

  // 退出
  app.get('/logout', checkLogin);
  app.get('/logout', function (req, res, next) {
    req.session.user = null;
    req.flash('info', '登出成功!');
    res.redirect('/');
  });


  app.get('/post', function(req,res,next){
    
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
};
