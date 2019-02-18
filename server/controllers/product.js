const models = require('../models')

class ProductController {
    static async find(req, res) {
        try {
            let productData = await models.Product.find({}).lean()
            res.status(200).json(productData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findOne(req, res) {
        try {
            let productData = await models.Product.findOne({ _id: req.params.productId }).lean()
            res.status(200).json(productData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        try {
            let productData = await models.Product.create({
                title: req.body.title,
                description: req.body.description,
            })
            res.status(201).json(productData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            let productData = await models.Product.findOneAndUpdate({ _id: req.params.productId }, {
                $set: {
                    title: req.body.title,
                    description: req.body.description,
                }
            })
            res.status(201).json(productData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            let productData = await models.Product.findOneAndDelete({ _id: req.params.productId })
            res.status(200).json(productData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = ProductController
