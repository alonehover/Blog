var moment = require('moment');
var mongodb = require('../lib/db');
var ObjectID = require('mongodb').ObjectID;

// 存文章
exports.save = function(article, callback){

    mongodb(function(db){

        db.collection('articles').insertOne(article, function(err, result){
            db.close();
            if (err) {
                return callback(err);
            }
            callback(null, result);  //成功！err 为 null，并返回存储后的用户文档
        });

    });
};

// 获取文章详情
exports.getOne = function(aid, callback){
    mongodb(function(db){

        db.collection('articles').findOne({"_id": new ObjectID(aid)},function(err, result){
            db.close();
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });

    });
};

// 获取文章列表
exports.getList = function(callback){

    mongodb(function(db){

        db.collection('articles').find().sort({_id:-1}).toArray(function(err, result){
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    });
};

// 编辑文章
exports.updateArticle = function(aid, article, callback){

    mongodb(function(db){

        db.collection('articles').updateOne(
          {"_id": new ObjectID(aid)},
          {
            $set: {
              "title": article.title,
              "content": article.content,
              "update_time": moment().format('YYYY-MM-DD HH:mm:ss')
            },
            $currentDate: { "lastModified": true }
          },
          function(err, result){
            db.close();
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });

    });
};

// 删除文章
exports.deleteArticle = function(aid, callback){

    mongodb(function(db){

        db.collection('articles').deleteOne(
          {"_id": new ObjectID(aid)},
          function(err, result){
            db.close();
            if (err) {
                return callback(err);
            }
            console.log(result);
            callback(null, result);
        });

    });
};
