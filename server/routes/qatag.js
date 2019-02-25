const express = require('express')
const router = express.Router()
const { authentication, } = require('../middlewares/auth')
const QaTagController = require('../controllers/qatag')

router.use(authentication)
router.get('/', QaTagController.get)
router.post('/:tag', QaTagController.addTag)
router.delete('/:tag', QaTagController.removeTag)

module.exports = router
