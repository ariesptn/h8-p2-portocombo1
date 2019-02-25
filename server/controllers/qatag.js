const models = require('../models')

class QaTagController {
    static async get(req, res) {
        try {
            let qaTagData = await models.QaTag.findOne({ user: req.auth._id })
                .populate('user').lean()
            res.status(200).json(qaTagData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async addTag(req, res) {
        try {
            let qaTagData = await models.QaTag.findOne({ user: req.auth._id })
            if (!qaTagData) {
                qaTagData = await models.QaTag.create({
                    tags: [req.params.tag],
                    user: req.auth._id,
                })
            } else {
                qaTagData = await models.QaTag.findOneAndUpdate({ user: req.auth._id }, {
                    $addToSet: { tags: req.params.tag }
                })
            }
            res.status(201).json(qaTagData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async removeTag(req, res) {
        try {
            let qaTagData = await models.QaTag.findOneAndUpdate({ user: req.auth._id }, {
                $pull: { tags: req.params.tag }
            })
            res.status(200).json(qaTagData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

module.exports = QaTagController
