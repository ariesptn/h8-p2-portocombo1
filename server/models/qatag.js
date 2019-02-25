const mongoose = require('mongoose')

const qaTagSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    tags: [String],
})

const QaTag = mongoose.model('qatags', qaTagSchema)

module.exports = QaTag
