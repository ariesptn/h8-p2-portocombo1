const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
    upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    downvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
})

const Question = mongoose.model('questions', questionSchema)

module.exports = Question
