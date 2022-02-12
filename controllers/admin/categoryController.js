const Category = require('../../models/category');
const { validationResult } = require('express-validator')

exports.listCategory = async (req, res) => {
    try {
        let perPage = 5
        let page = req.query.page || 1
        let skip = (perPage * page) - perPage
        const categories = await Category.find().skip(skip).limit(perPage)
        const categoriesCount = await Category.countDocuments()
        console.log(categoriesCount);
        res.render('manage-categories/list-category', {
            title: 'Manage Categories',
            categories,
            current: page,
            pages: Math.ceil(categoriesCount / perPage)
        })
    } catch (error) {
        req.flash('error', `Error: ${error.message}`)
        res.redirect('/categories')   
    }
}

exports.createOrEditCategory = async (req, res) => {
    try {
        const { id } = req.params
        let title = "Create Categories"
        let categoryOldValues = "";
        if (id) {
          let editCategory = await Category.findById(id)
            if (!editCategory) {
                req.flash('error', 'Category id doesn\'t exists')
                return res.redirect('/categories')
            }
            title = "Edit Categories"
            return res.render('manage-categories/edit-category',{title, editCategory, categoryOldValues})
        }
       return res.render('manage-categories/create-category',{title, categoryOldValues})
    } catch (error) {
        req.flash('error', `Error: ${error.message}`)
        res.redirect('/categories')   
    }
}

exports.createOrUpdateCategory = async (req, res) => {
    try {
        const errors = validationResult(req)
        const id = req.query.id
        const categoryOldValues = req.body
        if (!errors.isEmpty()) {
            req.flash('validationMsg', errors.mapped())
            if (id) {
                const editCategory = await Category.findById(id)
                return res.render('manage-categories/edit-category',{title:"Edit Categories",editCategory, categoryOldValues})
            } else {
                return res.render('manage-categories/create-category',{title:"Create Categories", categoryOldValues})
            }
        }
        let msg = "";
        if (!id) {
            await Category.create(categoryOldValues)
            msg = "Category created successfully"
        }
        else {
            await Category.findByIdAndUpdate(id, categoryOldValues)
            msg = "Category updated successfully"
        }
        req.flash('success', msg)
        res.redirect('/categories')   
    } catch (error) {
        req.flash('error', `Error: ${error.message}`)
        res.redirect('/categories')   
    }    
}

exports.viewCategory = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Category.findById(id)
        if (!category) {
            req.flash('error', 'Category id doesn\'t exists')
            return res.redirect('/categories')   
        }
        res.render('manage-categories/view-category', {title:'View Category',category})
    } catch (error) {
        req.flash('error', `Error: ${error.message}`)
        res.redirect('/categories')   
    }
  
}

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.query.id
        await Category.findByIdAndDelete(id)
        req.flash('error', 'Category deleted successfully')
    } catch (error) {
        req.flash('error', `Error: ${error.message}`)
    }    
    res.redirect('/categories')   
}