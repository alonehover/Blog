const signMiddleware = require("../middleware/signMiddleware")
const User = require('../models/user');
const md5 = require('../lib/md5');

module.exports = {
    init: function(app) {
        app.get("/reg", signMiddleware.checkNotLogin)
        app.get("/reg", this.signUpView)

        app.post("/reg", signMiddleware.checkNotLogin)
        app.post("/reg", this.toSignUp)

        app.get("/login", signMiddleware.checkNotLogin)
        app.get("/login", this.signInView)

        app.post("/login", signMiddleware.checkNotLogin)
        app.post("/login", this.toSignIn)

        app.get("/logout", signMiddleware.checkLogin)
        app.get("/logout", this.toSignOut)
    },
    
    signUpView: function(req, res, next) {
        res.render('reg', {
            title: '注册',
            user: req.session.user,
            flash: req.flash('info').toString()
        });
    },

    toSignUp: function(req, res, next) {
        const body = req.body;
        const name = body.name;
        const password = body.password;
        const password_re = body.password_repeat;
        const email = body.email;

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

            const newUser = {
                name: name,
                password: md5(password),
                email: email,
            };

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
    },

    signInView: function(req, res, next) {
        res.render('signin', {
            title: '登录',
            user: req.session.user,
            flash: req.flash('info').toString()
        });
    },

    toSignIn: function(req, res, next) {
        const name = req.body.name;
        const password = req.body.password;

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
    },
    
    toSignOut: function(req, res, next) {
        req.session.user = null;
        req.flash('info', '登出成功!');
        res.redirect('/');
    }
}