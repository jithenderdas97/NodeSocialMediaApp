const Post = require('../../models/post')
const Category = require('../../models/category')
const { validationResult } = require('express-validator')

const index = async (req, res) => {
    try {
        const posts = await Post.find().populate({path:'post_category',select:'category_name -_id'});
        console.log(posts);
        res.render('manage-posts/list-post', {title:"Manage Posts", posts})
    } catch (err) {
        console.log(err);
    }
}

const createOrEdit = async (req, res) => {
    try {
        const id = req.params.id
        let title = "Create Post" 
        const postOldValues = ""
        const categories = await Category.find().sort({ category_name: 1 })
        if (id) {
            title = "Edit Post" 
            let editPost = await Post.findById(id)
            res.render('manage-posts/edit-post', {title, postOldValues, categories,editPost})
        }
        res.render('manage-posts/create-post', {title, postOldValues, categories})
    } catch (err) {
        
    }
}

const store = async (req, res) => {
    try {
        const categories = await Category.find().sort({ category_name: 1 })
        const errors = validationResult(req)
        let postOldValues = req.body
        if (!errors.isEmpty()) {
            req.flash('postValidation',errors.mapped())
            return res.render('manage-posts/create-post', {title:"Create Post", postOldValues, categories})
        }
        await Post.create(postOldValues)
        req.flash('success','Post created successfully')
        res.redirect('/posts');
    } catch (err) {
        console.log(err);
    }
}

const update = async (req, res) => {
    try {
        const id = req.params.id
        const categories = await Category.find().sort({ category_name: 1 })
        const errors = validationResult(req)
        let postOldValues = req.body
        let editPost = await Post.findById(id)
        if (!errors.isEmpty()) {
            req.flash('postValidation',errors.mapped())
            return res.render('manage-posts/edit-post', {title:"Edit Post", postOldValues, categories, editPost})
        }
        if (!editPost) {
            req.flash('error', 'Post id is not matched')
            return res.redirect('/posts')
        }
        await Post.findByIdAndUpdate(id, postOldValues)
        req.flash('success','Post updated successfully')
        return res.redirect('/posts')
    } catch (err) {
        console.log(err);
        req.flash('error', `Error: ${err.message}`)
        return res.redirect('/posts')
    }
}

const view = async (req, res) => {
    try {
        const id=req.params.id
        const post = await Post.findById(id)
        res.render('manage-posts/view-post',{post})
    } catch (err) {
        console.log(err)       
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.params.id
        await Post.findByIdAndDelete(id)
        req.flash('error','Post deleted successfully')
        res.redirect('/posts')
    } catch (err) {
        console.log(err);
        req.flash('error', 'Something went wrong')
        return redirect('/posts')
    }
}

module.exports = {
    index,
    createOrEdit,
    store,
    update,
    view,
    destroy
}