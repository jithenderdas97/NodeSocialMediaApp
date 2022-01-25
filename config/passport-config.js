const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const {compare} = require('bcryptjs')

const init = (passport) => {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const userExists = await User.findOne({ email }).select('+password')
            if(!userExists){
                return done(null,false, {message: 'Invalid user'})
            }
            const match = await compare(password, userExists.password)
            if (!match) {
                return done(null, false, {message:'Invalid email or password'})
            }
            return done(null, userExists)
        }
        catch (err) {
            return done(err)
        }
    }));

    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })

    passport.deserializeUser(async(id, done) => {
        try {
            const user = await User.findById(id)
            return done(null, user)

        } catch (err) {
            return done(err)
        }
    })
}

module.exports = init
