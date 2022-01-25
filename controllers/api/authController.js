const { validationResult } = require('express-validator')
const User = require('../../models/user')
const catchAsyncErrors = require('../../utils/catchAsyncErrors')
const { hash, compare } = require('bcryptjs')
const {sign} = require('jsonwebtoken')

const register = catchAsyncErrors(async (req, res) => {
    const { email,fullname,password } = req.body
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       return res.status(422).json(errors)
    }
    const userExist = await User.findOne({ email })
    if (userExist)
    {
        return res.status(200).json({
            success: false,
            message: "User is already exists",
       }) 
    }
    const encryptedPassword = await hash(password, 10)
    
    const user = await User.create({
        fullname,
        email,
        password:encryptedPassword
    })

    res.status(201).json({
        success: true,
        message: "User is registered successfully",
        user
    })
})

const login = async (req, res) => {
    try {
        const { email, password } = req.body 
        const errors = validationResult(req)
        if (!errors.isEmpty())
        {
            res.status(422).json(errors.array())
        }
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(401).json({
                success: false,
                message:"Invalid email or password"
            })
        }
        const checkPassword = await compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({
                success: false,
                message:"Invalid email or password"
            })
        }
        const token = sign({user_id: user._id, email},process.env.JWT_SECRET)
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user,
            token
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: `Error message :${err.message}`
        })
    }
}

module.exports = {register,login}