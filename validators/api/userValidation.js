const { check } = require('express-validator')

const createUserValidation = [
    check('fullname').notEmpty().withMessage('fullname is requied').isLength({min:5}).withMessage('fullname must be at least 5 chars long'),
    check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email'),
    check('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be 6 or more characters')
]

const updateUserValidation = [
    check('fullname').notEmpty().withMessage('fullname is requied').isLength({ min: 5 }).withMessage('fullname must be at least 5 chars long'),
    check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Please enter a valid email'),
]

module.exports = {
    createUserValidation,
    updateUserValidation
}