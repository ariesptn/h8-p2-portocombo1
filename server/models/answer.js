const mongoose = require('mongoose')

const answerSchema = mongoose.Schema({
    title: String,
    description: String,
    tags: [String],
    createdAt: Date,
    updatedAt: Date,
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'questions' },
    upvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    downvoters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
})

const Answer = mongoose.model('answers', answerSchema)

module.exports = Answer
