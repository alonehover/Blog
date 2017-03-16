const fs = require('fs')
const path = require("path")

module.exports = function(app) {
    const FS_CONTROLLER_PATH = path.join(__dirname, "../controllers/")
    let service = null

    fs.readdirSync(FS_CONTROLLER_PATH)
        .forEach(file_name => {
            service = require(`../controllers/${file_name}`)
            service.init && service.init(app)
        })
}

