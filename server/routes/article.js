const express = require('express')
const router = express.Router()
const ArticleController = require('../controllers/article')
const { authentication, } = require('../middlewares/auth')
const { articleAuthorization, } = require('../middlewares/articleAuth')

router.use(authentication)
router.get('/', ArticleController.find)
router.post('/', ArticleController.create)
router.get('/:articleId', articleAuthorization, ArticleController.findOne)
router.put('/:articleId', articleAuthorization, ArticleController.update)
router.delete('/:articleId', articleAuthorization, ArticleController.delete)

module.exports = router
