const User = require('../../models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const { hash, compare } = require('bcryptjs')

const signUp = (req, res) => {
    res.render('auth/register')
}

const register = async(req, res) => {
    const { email, fullname, password } = req.body
    const hashedPwd = await hash(password, 10)
    const saveUser = await User.create({
        email,
        fullname,
        password:hashedPwd
    })
    res.redirect('/auth/sign-in');
}

const signIn = (req, res) => {
    res.render('auth/login')
}

const logout = (req, res) => {
    req.logout()
    res.redirect('/auth/sign-in')
}

const resetPassword = (req, res) => {
    res.render('auth/forgot_password')
}

module.exports = {
    signUp,
    register,
    signIn,
    logout,
    resetPassword,
}