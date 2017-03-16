var Article = require('../models/article');

module.exports = {
    init: function(app) {
        app.get("/", this.index)
    },

    index: function(req, res, next) {
        Article.getList(function(err,list){
            if (err) {
                console.log(err);
                return next(err);
            }
            res.render('index', {
              title: '首页',
              user: req.session.user,
              flash: req.flash('info').toString(),
              list: list
            });
        });
    }
}
