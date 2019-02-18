const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.get('/', ProductController.find)
router.post('/', ProductController.create)
router.get('/:productId', ProductController.findOne)
router.put('/:productId', ProductController.update)
router.delete('/:productId', ProductController.delete)

module.exports = router
