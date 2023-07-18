const app = require("./index")
const userRoutes = require("./user.routes")
const taskRoutes = require("./task.routes")

const ApplicationRoutes = (app) => {
    app.use(userRoutes)
    app.use(taskRoutes)
}

module.exports = ApplicationRoutes