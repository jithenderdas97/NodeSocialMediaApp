const express = require('express')
const router = express.Router()
const {
    createProduct,
    getProducts,
    viewProduct,
    updateProduct,
    deleteProduct
} = require('../../controllers/api/productController')

router.post('/', createProduct)
router.get('/', getProducts)
router.get('/:_id', viewProduct)
router.put('/:_id', updateProduct)
router.delete('/:_id', deleteProduct)

module.exports = router