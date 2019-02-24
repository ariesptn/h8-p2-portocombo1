const express = require('express')
const router = express.Router()
const { authentication, } = require('../middlewares/auth')
const AnswerController = require('../controllers/answer')
const { answerAuthorization, } = require('../middlewares/questionAnswerAuth')

router.get('/all', AnswerController.findAll)
router.get('/:answerId', AnswerController.findOne)

router.use(authentication)
router.get('/', AnswerController.find)
router.post('/', AnswerController.create)
router.put('/:answerId', answerAuthorization, AnswerController.update)
router.delete('/:answerId', answerAuthorization, AnswerController.delete)

module.exports = router
