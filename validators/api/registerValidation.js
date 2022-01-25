const { check } = require('express-validator')

const registerValidation = [
    check('fullname').notEmpty().withMessage('Fullname is required'),
    check('email').notEmpty().withMessage('Email is required'),
    check('password').notEmpty().withMessage('password is required')
];

const loginValidation = [
    check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    check('password').notEmpty().withMessage('Password is required').isLength({min:8}).withMessage('Password should be min 8 characters')
]

module.exports = {registerValidation,loginValidation}