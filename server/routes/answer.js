const express = require('express')
const router = express.Router()
const { authentication, } = require('../middlewares/auth')
const AnswerController = require('../controllers/answer')
const { questionAuthorization, answerAuthorization, } = require('../middlewares/questionAnswerAuth')

router.get('/all', AnswerController.findAll)
router.get('/:answerId', AnswerController.findOne)
router.get('/byQuestionId/:questionId', AnswerController.findByQuestionId)

router.use(authentication)
router.get('/', AnswerController.find)
router.post('/', AnswerController.create)
router.put('/:answerId', answerAuthorization, AnswerController.update)
router.delete('/:answerId', answerAuthorization, AnswerController.delete)

router.post('/:answerId/upvote', AnswerController.upvote)
router.post('/:answerId/downvote', AnswerController.downvote)

module.exports = router
