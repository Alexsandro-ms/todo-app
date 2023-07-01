const express = require("express")
const { createUser } = require("../controllers/user.controller")

const router = express.Router()

router.post("/auth/register", createUser)

module.exports = router;