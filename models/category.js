const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    category_name: {
        type: String,
        required:[true,'Category name is required']
    },
    category_description: {
        type: String,
    },
    status: {
        type: Number,
        default:1
    }
}, {timestamps:true})

module.exports = new mongoose.model('Category',categorySchema)
