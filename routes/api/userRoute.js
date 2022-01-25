const router = require('express').Router()
const {createUser,updateUser,getUsers} = require('../../controllers/api/userController')
const {createUserValidation, updateUserValidation} = require('../../validators/api/userValidation')

router.get('/', getUsers)
router.post('/', createUserValidation , createUser)
router.put('/:_id', updateUserValidation, updateUser)

module.exports = router