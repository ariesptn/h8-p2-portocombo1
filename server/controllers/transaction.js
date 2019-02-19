const models = require('../models')

class TransactionController {
    static async checkout(req, res) {
        try {
            let cartData = await models.Cart.find({ user: req.auth._id })
                .populate('product').lean()
            let transactionData
            if (cartData) {
                transactionData = await models.Transaction.create({
                    user: req.auth._id,
                    items: cartData,
                    date: new Date(),
                })
            } else {
                throw { message: 'empty cart' }
            }
            cartData = await models.Cart.deleteMany({ user: req.auth._id })
            res.status(201).json(transactionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async find(req, res) {
        try {
            let transactionData = await models.Transaction.find({ user: req.auth._id })
                .sort({ date: -1 }).lean()
            res.status(200).json(transactionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = TransactionController
