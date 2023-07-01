const app = require("./index")
const userRoutes = require("./user.routes")

const ApplicationRoutes = (app) => {
    app.use(userRoutes)
}

module.exports = ApplicationRoutes