const User = require('../../models/user')

const changeProfile = async(req, res) => {
    const userId = req.user._id
    const user = await User.findById(userId)
    res.render('profile',{user})
}

module.exports = {
    changeProfile
}