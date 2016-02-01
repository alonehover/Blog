var mongodb = require('../lib/db');
var assert = require('assert');

exports.save = function(user, callback){

    mongodb(function(db){

        db.collection('users').insertOne(user, function(err, result){
            db.close();
            if (err) {
                return callback(err);
            }
            callback(null, result);  //成功！err 为 null，并返回存储后的用户文档
        });

    });
};

exports.get = function(name, callback){

    mongodb(function(db){

        var users =db.collection('users').find({"name":name});

        users.each(function(err, doc){

            assert.equal(err, null);

            if (doc != null) {

                callback(null, doc);

            }else{
                callback(null);
            }

        });

    });
}
