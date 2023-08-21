const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const { createTask, editTask, findTask, listTasks, removeTask, listTaskToday } = require("../controllers/task.controller")

const router = express.Router()

router.get("/task/list", authMiddleware, listTasks)
router.get("/task/list/today", authMiddleware, listTaskToday)
router.post("/task/create", authMiddleware, createTask)
router.get("/task/find/:id", authMiddleware, findTask)
router.delete("/task/remove/:id", authMiddleware, removeTask)
router.put("/task/edit/:id", authMiddleware, editTask)

module.exports = router;