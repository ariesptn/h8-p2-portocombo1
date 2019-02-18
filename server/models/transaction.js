const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
})

const Transaction = mongoose.model('transactions', transactionSchema)

module.exports = Transaction
