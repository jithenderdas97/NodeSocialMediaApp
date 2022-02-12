const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    post_title: {
        type:String,
        required:[true, 'Post title is required']
    },
    post_category: {
        type: mongoose.Schema.ObjectId,
        ref:"Category",
        required:[true, 'Post category is required']
    },
    post_privacy: {
        type:String,
        required:[true, 'Post privacy is required']
    },
    post_message: {
        type:String
    },
    status: {
        type:Number,
        default:"1"
    }
})

const Post = new mongoose.model('Post', PostSchema)
module.exports = Post