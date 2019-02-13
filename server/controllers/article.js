const models = require('../models')

class ArticleController {
    static async find(req, res) {
        try {
            let articleData = await models.Article.find({ user: req.auth._id })
                .populate('user').lean()
            res.status(200).json(articleData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async findOne(req, res) {
        try {
            let articleData = await models.Article.findOne({ _id: req.params.articleId })
                .populate('user').lean()
            res.status(200).json(articleData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async create(req, res) {
        try {
            let articleData = await models.Article.create({
                title: req.body.title,
                content: req.body.content,
                tags: req.body.tags.split(',').map(e => e.trim().toLowerCase()),
                createdAt: new Date(),
                updatedAt: new Date(),
                user: req.auth._id,
            })
            res.status(201).json(articleData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async update(req, res) {
        try {
            let articleData = await models.Article.findOneAndUpdate(
                { _id: req.params.articleId },
                {
                    $set: {
                        title: req.body.title,
                        content: req.body.content,
                        tags: req.body.tags.split(',').map(e => e.trim().toLowerCase()),
                        updatedAt: new Date(),
                    }
                })
            res.status(201).json(articleData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async delete(req, res) {
        try {
            let articleData = await models.Article.findOneAndDelete({ _id: req.params.articleId })
            res.status(200).json(articleData)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    }

    static async fileUpload(req, res) {
        console.log(req.file)
        res.status(200).json(req.file)
    }
}

module.exports = ArticleController
