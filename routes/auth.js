const express = require("express")
const AuthRouter = express.Router()

const { register, login } = require("../controllers/auth")

AuthRouter.route("/register").post(register)

AuthRouter.route("/login").post(login)

module.exports = AuthRouter
