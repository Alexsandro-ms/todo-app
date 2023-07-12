const express = require("express")
const { createUser, removeUser, editUser, listUser } = require("../controllers/user.controller")

const router = express.Router()

router.get("/auth/list/:id", listUser)
router.post("/auth/register", createUser)
router.delete("/auth/remove/:id", removeUser)
router.put("/auth/edit/:id", editUser)

module.exports = router;