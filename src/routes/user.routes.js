const express = require("express")
const { createUser, removeUser,  } = require("../controllers/user.controller")

const router = express.Router()

router.post("/auth/register", createUser)
router.delete("/auth/remove/:id", removeUser)

module.exports = router;