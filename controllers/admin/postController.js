const Post = require('../../models/post')

const index = async (req, res) => {
    try {
        const posts = await Post.find();
        res.render('manage_posts/index', {posts})
    } catch (err) {
        console.log(err);
    }
}

const createOrEdit = async (req, res) => {
    try {
        const id = req.params.id
        let editPost = ""
        if (id) {
            editPost = await Post.findById(id)
        }
        res.render('manage_posts/create', {editPost})
    } catch (err) {
        
    }
}

const store = async (req, res) => {
    try {
        const post = await Post.create(req.body)
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
    }
}

const view = async (req, res) => {
    try {
        const id=req.params.id
        const post = await Post.findById(id)
        console.log(post);
        res.render('manage_posts/view',{post})
    } catch (err) {
        console.log(err)
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.params.id
        const deletePost = await Post.findByIdAndDelete(id)
        res.redirect('/posts')
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    index,
    createOrEdit,
    store,
    view,
    destroy
}