const express = require('express')
const router = express.Router()
const GoogleController = require('../controllers/google')
const userRoutes = require('./user')
const questionRoutes = require('./question')
const answerRoutes = require('./answer')
const cartRoutes = require('./cart')
const productRoutes = require('./product')
const transactionRoutes = require('./transaction')
const todoRoutes = require('./todo')
const projectRoutes = require('./project')
const articleRoutes = require('./article')

router.use('/api/todos', todoRoutes)
router.use('/api/projects', projectRoutes)
router.use('/api/articles', articleRoutes)
router.use('/api/products', productRoutes)
router.use('/api/transactions', transactionRoutes)
router.use('/api/carts', cartRoutes)
router.use('/api/questions', questionRoutes)
router.use('/api/answers', answerRoutes)
router.use('/api/users', userRoutes)
router.get('/api/googleloginverify', GoogleController.loginVerify)

router.get('/*', (req, res) => {
    res.status(404).json({ msg: 'page not found' })
})

module.exports = router
