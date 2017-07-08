var os = require('os');
var Article = require('../models/article');

module.exports = {
    init: function(app) {
        app.get("/", this.index)
        app.get("/test", this.test)
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
    },

    test: function(req, res, next) {
        res.render("test")

        // res.json({
        //     EOL: os.EOL,
        //     platform: os.platform(),
        //     release: os.release(),
        //     arch: os.arch(),
        //     // constants: os.constants,
        //     freemem: os.freemem(),
        //     totalmem: os.totalmem(),
        //     cpus: os.cpus(),
        //     loadavg: os.loadavg()
        // })
    }
}
