const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const { createUser, removeUser, editUser, listUser, findUser, logInUser, sendPasswordRecoveryEmail, changePassword } = require("../controllers/user.controller")

const router = express.Router()

router.get("/auth/list/:id", listUser)
router.post("/auth/register", createUser)
router.post("/auth/login", logInUser)
router.post("/auth/find", findUser)
router.delete("/auth/remove/:id", authMiddleware, removeUser)
router.put("/auth/edit/:id", authMiddleware, editUser)
router.post("/auth/sendPasswordToken", sendPasswordRecoveryEmail)
router.put("/auth/changePassword", changePassword)

module.exports = router;