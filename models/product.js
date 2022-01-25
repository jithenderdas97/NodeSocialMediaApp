const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required:[true, "Product name is required"]
    },
    product_price: {
        type: Number,
        required:[true, "Product price is required"]
    },
    net_weight: {
        type: String,
    },
    status: {
        type: Number,
        default:1
    }
},
{timestamps: true}
)

module.exports = mongoose.model('Product', productSchema)