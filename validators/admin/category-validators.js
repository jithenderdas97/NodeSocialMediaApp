const { check } = require('express-validator')

exports.categoryValidators = [
    check('category_name').trim().notEmpty().withMessage('Category name is required'),
    check('category_description').trim().notEmpty().withMessage('Description is required'),
    check('status').trim().notEmpty().withMessage('Status is required')
]

