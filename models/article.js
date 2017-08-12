var moment = require('moment');
var dbQuery = require('../lib/db');
const _table = 'articles'
// 存文章
exports.save = function(article, callback){
    dbQuery('INSERT INTO ?? SET ?', [_table, article], function(err, res){
        if(err) {
            console.log(err);
            return callback(err);
        }

        callback(null, res[0]);
    });
};

// 获取文章详情
exports.getOne = function(aid, callback){
    dbQuery('SELECT * FROM ?? WHERE `id` = ?', [_table, aid], function(err, res){
        if(err) {
            console.log("sqlerr");
            return callback(err);
        }

        res[0].create_time = moment(+res[0].create_time).format('YYYY-MM-DD')
        res[0].update_time = moment(+res[0].update_time).format('YYYY-MM-DD')

        callback(null, res[0]);
    });
};

// 获取文章列表
exports.getList = function(callback){
    dbQuery('SELECT * FROM ?? ORDER BY ?? DESC', [_table, 'create_time'], function(err, res) {
        if(err) {
            return callback(err);
        }

        res.forEach(function(item) {
            item.create_time = moment(+item.create_time).format('YYYY-MM-DD')
            item.update_time = moment(+item.update_time).format('YYYY-MM-DD')
        })

        callback(null, res);
    });
};

// 编辑文章
exports.updateArticle = function(aid, article, callback){
    dbQuery('UPDATE ?? SET ? WHERE `id` = ?', [_table, article, aid], function(err, res) {
        if(err) {
            return callback(err);
        }

        callback(null, res);
    });
};

// 删除文章
exports.deleteArticle = function(aid, callback){
    dbQuery('DELETE FROM ?? WHERE `id` = ?', [_table, aid], function(err, res) {
        if(err) {
            return callback(err);
        }
        callback(null, res);
    });
};
