const { check } = require('express-validator')

exports.postValidators = [
    check('post_title').trim().notEmpty().withMessage('Post name is required'),
    check('post_category').trim().notEmpty().withMessage('Select post category is required'),
    check('post_message').trim().notEmpty().withMessage('Post message is required'),
    check('post_privacy').trim().notEmpty().withMessage('Select post privacy is required'),
    check('status').trim().notEmpty().withMessage('Status is required'),
]