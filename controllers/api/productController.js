const Product = require('../../models/product')
const catchAsyncErrors = require('../../utils/catchAsyncErrors')

const createProduct = catchAsyncErrors(async (req, res) => {
    const product = await Product.create(req.body)
    res.status(201).json({
        success: true,
        product
    })
})

const getProducts = catchAsyncErrors(async (req, res) => {
    const products = await Product.find().sort({product_name:1})
    const productsCount = await Product.find().countDocuments()
    res.status(200).json({
        success: true,
        no_of_products:productsCount,
        products
    })
})

const viewProduct = catchAsyncErrors(async (req, res) => {
    const id = req.params._id
    const singleProduct = await Product.findById(id)
    if (!singleProduct)
    {
        res.status(404).json({
            success: false,
            message:`No product found in this id:${id}`
        })  
    }
    res.status(200).json({
        success: true,
        singleProduct
    })
})

const updateProduct = catchAsyncErrors(async (req, res) => {
    const id = req.params._id
    let findProduct = await Product.findById(id)
    if (!findProduct)
    {
        res.status(404).json({
            success: false,
            message:`No product found in this id:${id}`
        })  
    }
    findProduct = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        findProduct
    })      
})

const deleteProduct = catchAsyncErrors(async (req, res) => {
    const id = req.params._id
    const findProduct = await Product.findByIdAndDelete(id)
    if (!findProduct)
    {
        res.status(404).json({
            success: false,
            message:`No product found in this id:${id}`
        })  
    }
    await Product.findByIdAndDelete(id)
    res.status(204).json({
        success: true,
        message: "Product deleted successfully"
    })    
})

module.exports = {
    createProduct,
    getProducts,
    viewProduct,
    updateProduct,
    deleteProduct
}