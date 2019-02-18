const models = require('../models')

class TransactionController {
    static async checkout(res, req) {
        try {
            let transactionData
            res.status(200).json(transactionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = TransactionController
