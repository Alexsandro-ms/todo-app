const express = require("express")
const { createUser, removeUser, editUser, listUser, findUser, logInUser } = require("../controllers/user.controller")

const router = express.Router()

router.get("/auth/list/:id", listUser)
router.post("/auth/register", createUser)
router.post("/auth/login", logInUser)
router.post("/auth/find", findUser)
router.delete("/auth/remove/:id", removeUser)
router.put("/auth/edit/:id", editUser)

module.exports = router;