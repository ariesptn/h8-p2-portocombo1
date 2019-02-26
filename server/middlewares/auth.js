const jwt = require('jsonwebtoken')
const models = require('../models')
const cron = require('node-cron')

let userTokens = {}

async function authentication(req, res, next) {
    try {
        let userCachedData = userTokens[req.headers.token]
        if (userCachedData) {
            req.auth = userCachedData
            return next()
        }
        let decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET || 'notsosecret')
        if (decoded) {
            let userData = await models.User.findOne({ email: decoded.email }).lean()
            if (userData) {
                req.auth = decoded
                userTokens[req.headers.token] = req.auth
                userTokens[req.headers.token].accessedAt = new Date().getTime()
                tokenTimeout(req.headers.token)
                return next()
            } else {
                throw { message: 'unauthorized user' }
            }
        } else {
            throw { message: 'authentication error' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

function cleanCache() {
    for (const token in userTokens) {
        if (new Date().getTime() - userTokens[token].accessedAt > 60 * 60 * 1000) {
            delete userTokens[token]
        }
    }
}

cron.schedule('19 * * * *', function () {
    cleanCache()
})

/*
const kue = require('kue')

function tokenTimeout(token) {
    const queue = kue.createQueue()
    queue.create('token-timeout', { token }).save()
    queue.process('token-timeout', (job, done) => {
        setTimeout(() => {
            delete userTokens[job.data.token]
            done()
        }, 60 * 60 * 1000)
    })
}
*/
//kue.app.listen(3001)

module.exports = { authentication, }
