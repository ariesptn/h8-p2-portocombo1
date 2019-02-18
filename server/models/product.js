const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: String,
    description: String,
})

const Product = mongoose.model('products', productSchema)

module.exports = Product
