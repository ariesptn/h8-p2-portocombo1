const models = require('../models')

class QuestionController {
    static async find(req, res) {
        try {
            let questionData = await models.Question.find({ user: req.auth._id })
                .sort({ createdAt: -1 }).populate('user').lean()
            res.status(200).json(questionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findAll(req, res) {
        try {
            let questionData = await models.Question.find()
                .sort({ createdAt: -1 }).populate('user').limit(100).lean()
            questionData = questionData.map(e => {
                e.user.email = ''
                e.user.password = ''
                e.vote = e.upvoters.length - e.downvoters.length
                e.upvoters = null
                e.downvoters = null
                return e
            })
            res.status(200).json(questionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findOne(req, res) {
        try {
            let questionData = await models.Question.findOne({ _id: req.params.questionId })
                .populate('user').lean()
            let e = questionData
            if (questionData) {
                e.user.email = ''
                e.user.password = ''
                e.vote = e.upvoters.length - e.downvoters.length
                e.upvoters = null
                e.downvoters = null
            }
            res.status(200).json(questionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        try {
            let questionData = await models.Question.create({
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags.split(',').map(e => e.trim().toLowerCase()),
                upvoters: [req.auth._id],
                downvoters: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                user: req.auth._id,
            })
            res.status(201).json(questionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            let questionData = await models.Question.findOneAndUpdate(
                { _id: req.params.questionId },
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                        tags: req.body.tags.split(',').map(e => e.trim().toLowerCase()),
                        updatedAt: new Date(),
                    }
                })
            res.status(201).json(questionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            let answerData = await models.Answer.deleteMany({ question: req.params.questionId })
            let questionData = await models.Question.findOneAndDelete({ _id: req.params.questionId })
            res.status(200).json(questionData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = QuestionController
