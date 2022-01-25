const dashboard = (req, res) => {
    res.render('dashboard',{user: req.user})
}

module.exports = {
    dashboard
}