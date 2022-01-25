const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/sign-in')
    } else {
        next()
    }
}

module.exports = isAuthenticated