const moment = require('moment');
const marked = require('marked');
const Article = require('../models/article');
const signMiddleware = require("../middleware/signMiddleware")

module.exports = {
    init: function(app) {
        app.get("/post", signMiddleware.checkLogin)
        app.get("/post", this.postView)

        app.post("/post", signMiddleware.checkLogin)
        app.post("/post", this.addArticle)

        app.get("/article/:aid", this.articleDetail)

        app.get("/edit/:aid", signMiddleware.checkLogin)
        app.get("/edit/:aid", this.articleEditView)

        app.post("/edit/:aid", signMiddleware.checkLogin)
        app.post("/edit/:aid", this.editArticle)

        app.get("/del/:aid", signMiddleware.checkLogin)
        app.get("/del/:aid", this.articleDel)
    },

    postView: function(req, res, next) {
        res.render('article/add', {
            title : "写文章",
            user : req.session.user,
            flash: req.flash('info').toString()
        });
    },

    addArticle: function(req, res, next) {
        const body = req.body;
        const user = req.session.user;
        const data = {
            title : body.title,
            description : marked(body.content).replace(/<[^>]+>/g,"").slice(0, 200),
            content : body.content,
            author : user.name,
            create_time: new Date().getTime(),
            update_time: new Date().getTime(),
        };

        Article.save(data, function(err, result) {
            if (err) {
                console.log('存储失败！');
                return next(err);
            }
            req.flash('info', '添加成功!');
            res.redirect('/');
        });
    },

    articleDetail: function(req, res, next) {
        const id = req.params.aid;
        const user = req.session.user;
        Article.getOne(id, function(err, result) {
            if (err) {
                return next(err);
            }

            res.render('article/show', {
                article_id : id,
                title : result.title,
                description : result.description,
                author: result.author,
                content : marked(result.content),
                update_time: result.update_time,
                user : user,
                flash : req.flash('info').toString()
            });
        });
    },

    articleEditView: function(req, res, next) {
        const id = req.params.aid;
        const user = req.session.user;
        Article.getOne(id, function(err, result) {
            if (err) {
                return next(err);
            }
            res.render('article/edit', {
                title : result.title,
                content : result.content,
                user : user,
                flash : req.flash('info').toString()
            });
        });
    },

    editArticle: function(req, res, next) {
        const id = req.params.aid;
        const body = req.body;
        const user = req.session.user;
        const data = {
            title : body.title,
            description : marked(body.content).replace(/<[^>]+>/g,"").slice(0, 200),
            content : body.content,
            author : user.name,
            update_time: new Date().getTime()
        };

        Article.updateArticle(id, data, function(err, result){
            if (err) {
              console.log('修改失败！');
              return next(err);
            }
            req.flash('info', '编辑成功!');
            res.redirect('/article/' + id);
        });
    },

    articleDel: function(req, res, next) {
        const id = req.params.aid;

        Article.deleteArticle(id, function(err, result){
            if (err) {
              console.log('删除失败！');
              return next(err);
            }
            req.flash('info', '删除成功!');
            res.redirect('/');
        });
    }
}
