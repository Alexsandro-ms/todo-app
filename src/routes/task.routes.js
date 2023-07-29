const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const { createTask, editTask, findTask, listTasks, removeTask } = require("../controllers/task.controller")

const router = express.Router()

router.get("/task/list/:userId", listTasks)
router.post("/task/create", authMiddleware, createTask)
router.post("/task/find/:id", findTask)
router.delete("/task/remove/:id", removeTask)
router.put("/task/edit/:id", editTask)

module.exports = router;