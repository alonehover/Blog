var dbQuery = require('../lib/db');
const _table = 'users'

exports.save = function(user, callback){
    dbQuery('INSERT INTO ?? SET ?', [_table, user], function(err, res) {
        if(err) {
            return callback(err);
        }

        callback(null, res);
    });
};

exports.get = function(name, callback){
    dbQuery('SELECT * FROM ?? WHERE `name` = ?', [_table, name], function(err, res) {
        if(err) {
            return callback(err);
        }

        callback(null, res[0]);
    });
}
