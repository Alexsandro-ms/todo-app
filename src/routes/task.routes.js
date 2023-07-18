const express = require("express")
const { createTask, editTask, findTask, listTasks, removeTask } = require("../controllers/task.controller")

const router = express.Router()

router.get("/task/list/:userId", listTasks)
router.post("/task/create", createTask)
router.post("/task/find/:id", findTask)
router.delete("/task/remove/:id", removeTask)
router.put("/task/edit/:id", editTask)

module.exports = router;