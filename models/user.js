const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required:[true, "Fullname is required"]
    },
    email: {
        type: String,
        required:[true, "Email is required"]
    },
    password: {
        type: String,
        select:false,
        required: [true, "Password is required"]
    },
    token: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    __v: {
        type: Number,
        select:false
    }
})

module.exports = mongoose.model('User', userSchema)