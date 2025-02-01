const ModelListRoute = require("./ModelList.route")

module.exports = (app) => {
    app.use('', ModelListRoute)
}