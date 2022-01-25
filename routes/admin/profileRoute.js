const profileRouter = require('express').Router()
const { changeProfile } = require('../../controllers/admin/profileController')

profileRouter.get('/change-profile', changeProfile)
module.exports = profileRouter