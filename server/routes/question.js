const express = require('express')
const router = express.Router()
const { authentication, } = require('../middlewares/auth')
const QuestionController = require('../controllers/question')
const { questionAuthorization, } = require('../middlewares/questionAnswerAuth')

router.get('/all', QuestionController.findAll)
router.get('/:questionId', QuestionController.findOne)

router.use(authentication)
router.get('/', QuestionController.find)
router.post('/', QuestionController.create)
router.put('/:questionId', questionAuthorization, QuestionController.update)
router.delete('/:questionId', questionAuthorization, QuestionController.delete)

module.exports = router
