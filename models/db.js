var MongoClient = require('mongodb').MongoClient;
var config = require('../config').mongo;
var url = 'mongodb://localhost:27017/' + config.db;

module.exports = function(callback){
	MongoClient.connect(url, function(err, db){
		if (err) {
			console.log('数据库连接失败~');
		}else{
			console.log('连接成功');
			callback(db);
		}
	});
};

