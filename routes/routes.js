var fs = require('fs')

module.exports = function(app) {
    var FS_PATH_SERVICE = './routes/service'
    var REQUIRE_PATH_SERVICE = './service/'

    fs.readdir(FS_PATH_SERVICE, function(err, list) {
        if(err) {
            throw '没有找到service文件夹'
        }

        for(var e; list.length && (e = list.shift());) {
            var service = require(REQUIRE_PATH_SERVICE + e)
            service.init && service.init(app)
        }
    })
}