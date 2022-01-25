const dashboardRoute = require('express').Router()
const { dashboard } = require('../../controllers/admin/dashboardController');

dashboardRoute.get('/dashboard', dashboard)

module.exports = dashboardRoute