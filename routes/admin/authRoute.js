const authRoute = require("express").Router()
const passport = require('passport')
const {
    signUp,
    register,
    signIn,
    logout,
    resetPassword,
} = require('../../controllers/admin/authController')

authRoute.get('/sign-up', signUp)
authRoute.post('/sign-up', register)
authRoute.get('/sign-in', signIn)
authRoute.post('/sign-in', passport.authenticate('local',{successRedirect:'/dashboard', failureRedirect:'/auth/sign-in', failureMessage:'Something went wrong' }))
authRoute.get('/logout', logout)
authRoute.get('/reset-password', resetPassword)

module.exports = authRoute;