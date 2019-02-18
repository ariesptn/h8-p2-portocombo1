const express = require('express')
const router = express.Router()
const TransactionController = require('../controllers/transaction')
const { authentication } = require('../middlewares/auth')
const { cartAuthorization, adminAuthorization, } = require('../middlewares/shopAuth')

router.use(authentication)
router.post('/', cartAuthorization, TransactionController.checkout)

module.exports = router
