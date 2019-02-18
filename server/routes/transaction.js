const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/transaction')
const { authentication } = require('../middlewares/auth')
const { cartAuthorization, adminAuthorization, } = require('../middlewares/shopAuth')

router.use(authentication)
router.post('/checkout', TransactionController.checkout)
router.get('/', TransactionController.find)

module.exports = router
