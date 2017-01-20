var moment = require('moment');
var mysql = require('../lib/db');
var ObjectID = require('mongodb').ObjectID;

// 存文章
exports.save = function(article, callback){
    var sql = "INSERT  INTO articles SET ?";

    mysql(function(db){
        db.query(sql, article, function(err, res) {
            if(err){
                return callback(err);
            }
            callback(null, res[0]);
        })
    })
};

// 获取文章详情
exports.getOne = function(aid, callback){
    var sql = "SELECT * FROM articles WHERE id = ?";

    mysql(function(db){
        db.query(sql, [aid], function(err, res) {
            if(err){
                return callback(err);
            }
            callback(null, res[0]);
        })
    })
};

// 获取文章列表
exports.getList = function(callback){
    var sql = "SELECT * FROM articles";
    
    mysql(function(db){
        db.query(sql, function(err, res) {
            if(err){
                return callback(err);
            }
            callback(null, res);
        });
    });
};

// 编辑文章
exports.updateArticle = function(aid, article, callback){
    var sql = "UPDATE articles SET title = ?, content = ?, update_time = ? WHERE id = ?";
    var now = moment().format('YYYY-MM-DD HH:mm:ss');

    mysql(function(db){
        db.query(sql, [article.title, article.content, now, aid], function(err, res) {
            if(err){
                return callback(err);
            }
            callback(null, res[0])
        })
    })
};

// 删除文章
exports.deleteArticle = function(aid, callback){
    var sql = "DELETE FROM articles WHERE id = ?"

    mysql(function(db) {
        db.query(sql, [aid], function(err, res) {
            if(err) {
                return callback(true);
            }
            callback(null, res[0])
        })
    })
};
