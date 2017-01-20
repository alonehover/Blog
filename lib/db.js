// var MongoClient = require('mongodb').MongoClient;
// var config = require('../config').mongo;
// var url = 'mongodb://localhost:27017/' + config.db;

// module.exports = function(callback){
// 	MongoClient.connect(url, function(err, db){
// 		if (err) {
// 			console.log('数据库连接失败~');
// 		}else{
// 			console.log('连接成功');
// 			callback(db);
// 		}
// 	});
// };

var mysql = require("mysql");
var config = require("../config").mysql;

var pool = mysql.createPool(config)

pool.on('connection', function(connection) {  
    console.log("链接成功");
});

pool.on('error', function(err) {  
    console.log("链接失败");
});

module.exports = function(callback) {
    pool.getConnection(function(err, db){
        if(err){
            console.log("数据库链接失败~！");
        }else{
            callback(db);
        }
    })
}