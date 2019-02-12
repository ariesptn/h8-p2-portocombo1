const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/article')
const { authentication, } = require('../middlewares/auth')
const { articleAuthorization, } = require('../middlewares/articleAuth')

router.use(authentication)
router.get('/', ArticleController.find)
router.post('/', ArticleController.create)
router.get('/:todoId', articleAuthorization, ArticleController.findOne)
router.put('/:todoId', articleAuthorization, ArticleController.update)
router.delete('/:todoId', articleAuthorization, ArticleController.delete)

module.exports = router
