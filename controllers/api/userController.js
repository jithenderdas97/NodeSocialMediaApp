const User = require('../../models/user')
const { validationResult } = require('express-validator')
const getFetchRecord = require('../../utils/customGetData')
const catchAsyncErrors = require('../../utils/catchAsyncErrors')
const { saveUser } = require('../../services/api/userService')

const createUser = catchAsyncErrors(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const userExists = await User.exists({email:req.body.email})
    if (userExists) {
        return res.status(200).json({
            success: false,
            message: 'This User is already exists'
        });
    }

    const user = await saveUser(req.body)
  
    res.status(201).json({
        success: true,
        message: "User created successfully",
        user
    })
})

const getUsers = catchAsyncErrors(async (req, res) => {
    let users = await User.find().sort({ fullname: 1 })
    res.status(200).json(getFetchRecord(users,"All Users list"))
})

const updateUser = catchAsyncErrors(async (req, res) => {
    const id = req.params._id
    const findUser = await User.findById(id)
    if (!findUser)
    {
        res.status(404).json({
            success: false,
            message: `No user id ${id} found`
        });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors);
    }
    const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        user
    }); 
})

module.exports = {
    createUser,
    updateUser,
    getUsers
}