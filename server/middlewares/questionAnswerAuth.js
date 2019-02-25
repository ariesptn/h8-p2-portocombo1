const models = require('../models')

async function questionAuthorization(req, res, next) {
    try {
        let questionData = await models.Question.findById(req.params.questionId).lean()
        if (!questionData) {
            throw { message: 'question is not found' }
        } else if (req.auth._id == questionData.user) {
            next()
        }
        else {
            throw { message: 'not your question' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

async function answerAuthorization(req, res, next) {
    try {
        let answerData = await models.Answer.findById(req.params.answerId).lean()
        if (!answerData) {
            throw { message: 'answer is not found' }
        } else if (req.auth._id == answerData.user) {
            next()
        }
        else {
            throw { message: 'not your answer' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

module.exports = { questionAuthorization, answerAuthorization, }
