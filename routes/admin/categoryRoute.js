const categoryRouter = require('express').Router()
const {
    listCategory,
    createOrEditCategory,
    createOrUpdateCategory,
    viewCategory,
    deleteCategory
} = require('../../controllers/admin/categoryController')

const {categoryValidators} = require('../../validators/admin/category-validators')

categoryRouter.get('/', listCategory)
categoryRouter.get('/create', createOrEditCategory)
categoryRouter.post('/', categoryValidators, createOrUpdateCategory)
categoryRouter.get('/edit/:id', createOrEditCategory)
categoryRouter.put('/', categoryValidators, createOrUpdateCategory)
categoryRouter.get('/view/:id', viewCategory)
categoryRouter.delete('/', deleteCategory)

module.exports = categoryRouter