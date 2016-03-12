var User = require('../models/user');
var Article = require('../models/article');
var md5 = require('../lib/md5');
var marked = require('marked');

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
        Article.getList(function(err,list){
            if (err) {
                console.log(err);
                return next(err);
            }
            res.render('index', {
              title: '主页',
              user: req.session.user,
              flash: req.flash('info').toString(),
              list: list
            });
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
      if (user != null) {

      }
      console.log(user);
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

  //  文章添加
  app.get('/post', checkLogin);
  app.get('/post', function(req,res,next){
      res.render('article/add',{
          title : "写文章",
          user : req.session.user,
          flash: req.flash('info').toString()
      });
  });

  // 文章添加操作
  app.post('/post', checkLogin);
  app.post('/post', function(req,res,next){
        var body = req.body;
        var data = {
            title : body.title,
            content : body.content
        };

        Article.save(data, function(err, result){
            if (err) {
              console.log('存储失败！');
              return next(err);
            }
            req.flash('info', '添加成功!');
            res.redirect('/');
        });
  });

  //  显示文章详情
  app.get('/post/:aid', function(req,res,next){
      var id = req.params.aid;
      var user = req.session.user;
      Article.getOne(id, function(err, result){
          if (err) {
              return next(err);
          }
          res.render('article/show',{
              article_id : id,
              title : result.title,
              content : marked(result.content),
              user : user,
              flash : req.flash('info').toString()
          });
      });

  });

  //  显示文章编辑
  app.get('/edit/:aid', checkLogin);
  app.get('/edit/:aid', function(req,res,next){
      var id = req.params.aid;
      var user = req.session.user;;
      Article.getOne(id, function(err, result){
          if (err) {
              return next(err);
          }
          res.render('article/edit',{
              title : result.title,
              content : result.content,
              user : user,
              flash : req.flash('info').toString()
          });
      });

  });

  // 提交文章编辑内容
  app.post('/edit/:aid', checkLogin);
  app.post('/edit/:aid', function(req,res,next){
        var id = req.params.aid;
        var body = req.body;
        var data = {
            title : body.title,
            content : body.content
        };

        Article.updateArticle(id, data, function(err, result){
            if (err) {
              console.log('修改失败！');
              return next(err);
            }
            req.flash('info', '编辑成功!');
            res.redirect('/post/:' + id);
        });
  });

  // 删除文章
  app.get('/del/:aid', checkLogin);
  app.get('/del/:aid', function(req,res,next){
        var id = req.params.aid;

        Article.deleteArticle(id, function(err, result){
            if (err) {
              console.log('删除失败！');
              return next(err);
            }
            req.flash('info', '删除成功!');
            res.redirect('/');
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

};
