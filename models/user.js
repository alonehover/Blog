var mongodb = require('./db');
var assert = require('assert');

exports.save = function(user, callback){

    mongodb(function(db){

        // console.log(user);
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
        // var users =db.collection('users').find();
        
        // console.log(users);
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
