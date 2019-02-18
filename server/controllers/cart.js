const models = require('../models')

class CartController {
    static async find(req, res) {
        try {
            let cartData = await models.Cart.find({ user: req.auth._id }).lean()
            res.status(200).json(cartData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findOne(req, res) {
        try {
            let cartData = await models.Cart.findOne({ _id: req.params.cartId }).lean()
            res.status(200).json(cartData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        try {
            let cartData = await models.Cart.create({
                user: req.auth._id,
                product: req.body.productId,
            })
            res.status(201).json(cartData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            let cartData = await models.Cart.findOneAndUpdate({ _id: req.params.cartId }, {
                $set: {
                    user: req.auth._id,
                    product: req.body.productId,
                }
            })
            res.status(201).json(cartData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            let cartData = await models.Cart.findOneAndDelete({ _id: req.params.cartId })
            res.status(200).json(cartData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = CartController
