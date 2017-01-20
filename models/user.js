var mysql = require('../lib/db');
var assert = require('assert');

exports.save = function(user, callback){
    var sql = "INSERT INTO users SET ?";

    mysql(function(db) {
        db.query(sql, user, function(err, res) {
            if(err) {
                return callback(err);
            }
            callback(null, res[0])
        })
    })
};

exports.get = function(name, callback){
    var sql = "SELECT * FROM users WHERE name = ?";

    mysql(function(db) {
        db.query(sql, [name], function(err, res) {
            if(err) {
                callback(err)
            }
            console.log(res);
            callback(null, res[0])
        })
    })
}
