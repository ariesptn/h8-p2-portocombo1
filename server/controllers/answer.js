const models = require('../models')

class AnswerController {
    static async find(req, res) {
        try {
            let answerData = await models.Answer.find({ user: req.auth._id })
                .sort({ createdAt: -1 }).populate('user').lean()
            res.status(200).json(answerData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findAll(req, res) {
        try {
            let answerData = await models.Answer.find()
                .sort({ createdAt: -1 }).populate('user').limit(100).lean()
            answerData = answerData.map(e => {
                e.user.email = ''
                e.user.password = ''
                e.vote = e.upvoters.length - e.downvoters.length
                e.upvoters = null
                e.downvoters = null
                return e
            })
            res.status(200).json(answerData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findByQuestionId(req, res) {
        try {
            let answerData = await models.Answer.find({ question: req.params.questionId })
                .sort({ createdAt: -1 }).populate('user').limit(100).lean()
            answerData = answerData.map(e => {
                e.user.email = ''
                e.user.password = ''
                e.vote = e.upvoters.length - e.downvoters.length
                e.upvoters = null
                e.downvoters = null
                return e
            })
            res.status(200).json(answerData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findOne(req, res) {
        try {
            let answerData = await models.Answer.findOne({ _id: req.params.answerId })
                .populate('user').lean()
            let e = answerData
            if (answerData) {
                e.user.email = ''
                e.user.password = ''
                e.vote = e.upvoters.length - e.downvoters.length
                e.upvoters = null
                e.downvoters = null
            }
            res.status(200).json(answerData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        try {
            let answerData = await models.Answer.create({
                title: req.body.title,
                description: req.body.description,
                question: req.body.questionId,
                upvoters: [req.auth._id],
                downvoters: [],
                createdAt: new Date(),
                updatedAt: new Date(),
                user: req.auth._id,
            })
            res.status(201).json(answerData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            let answerData = await models.Answer.findOneAndUpdate(
                { _id: req.params.answerId },
                {
                    $set: {
                        title: req.body.title,
                        description: req.body.description,
                        updatedAt: new Date(),
                    }
                })
            res.status(201).json(answerData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            let answerData = await models.Answer.findOneAndDelete({ _id: req.params.answerId })
            res.status(200).json(answerData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = AnswerController
