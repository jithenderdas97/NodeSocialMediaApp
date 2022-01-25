const express = require('express')
const authRouter = express.Router()
const { register, login } = require('../../controllers/api/authController')
const {registerValidation,loginValidation} = require('../../validators/api/registerValidation')

authRouter.post('/register',registerValidation, register)
authRouter.post('/login',loginValidation, login)

module.exports = authRouter