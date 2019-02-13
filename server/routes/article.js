const express = require('express')
const multer = require('multer')
const router = express.Router()
const ArticleController = require('../controllers/article')
const { authentication, } = require('../middlewares/auth')
const { articleAuthorization, } = require('../middlewares/articleAuth')

const upload = multer({ dest: '/tmp' })

router.use(authentication)
router.get('/', ArticleController.find)
router.post('/', ArticleController.create)
router.get('/:articleId', articleAuthorization, ArticleController.findOne)
router.put('/:articleId', articleAuthorization, ArticleController.update)
router.delete('/:articleId', articleAuthorization, ArticleController.delete)

router.post('/file/:articleId', articleAuthorization, upload.single('articleFile'), ArticleController.fileUpload)

module.exports = router
