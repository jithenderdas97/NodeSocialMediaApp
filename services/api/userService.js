const User = require('../../models/user');
const { hash } = require('bcryptjs')

const saveUser = async (user) => {
    const { fullname, email, password } = user

    const hashPsw = await hash(password, 10)
    
    return await User.create({
        fullname,
        email,
        password: hashPsw
    })
}

module.exports = {saveUser}