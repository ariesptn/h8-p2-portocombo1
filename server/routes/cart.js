const express = require('express')
const router = express.Router()
const CartController = require('../controllers/cart')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.get('/', CartController.find)
router.post('/', CartController.create)
router.get('/:cartId', CartController.findOne)
router.put('/:cartId', CartController.update)
router.delete('/:cartId', CartController.delete)

module.exports = router
