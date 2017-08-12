const config = require('../config.json');

if(config.db === "mongo"){
	var MongoClient = require('mongodb').MongoClient;
	var mongoConfig = require('../config').mongo;
	var url = 'mongodb://localhost:27017/' + mongoConfig.db;

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
}else if(config.db === "mysql") {
	var mysql      = require('mysql');
	var pool = mysql.createPool(config.mysql);

	module.exports = function(sql, option, callback) {
		pool.getConnection(function(err, connection) {
			if(err) throw err;
			
			console.log('mysql数据库连接成功');

			connection.query(sql, option, function(err, res, fields) {
				connection.release();

				if(err) {
					return callback(err);
				}

				callback(null, res);
			})
		});
	}
}
