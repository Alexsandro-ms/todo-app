const express = require("express")
const { createUser, removeUser, editUser } = require("../controllers/user.controller")

const router = express.Router()

router.post("/auth/register", createUser)
router.delete("/auth/remove/:id", removeUser)
router.put("/auth/edit/:id", editUser)

module.exports = router;