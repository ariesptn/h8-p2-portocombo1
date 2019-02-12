const models = require('../models')

async function todoAuthorization(req, res, next) {
    try {
        let todoData = await models.Todo.findById(req.params.todoId).lean()
        if (!todoData) {
            throw { message: 'todo is not found' }
        } else if (todoData.type == 'personal') {
            if (req.auth._id == todoData.user) {
                next()
            } else {
                throw { message: 'not your todo' }
            }
        } else if (todoData.type == 'project') {
            let projectData = await models.Project.findById(todoData.project).lean()
            if (!projectData) {
                throw { message: 'project is not found' }
            } else if (projectData.members.map(e => e.toString()).includes(req.auth._id)) {
                next()
            } else {
                throw { message: 'not a project member' }
            }
        } else {
            throw { message: 'unknown type' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

async function ownerAuthorization(req, res, next) {
    try {
        let projectData = await models.Project.findById(req.params.projectId).lean()
        if (!projectData) {
            throw { message: 'project is not found' }
        } else if (projectData.owner == req.auth._id) {
            next()
        } else {
            throw { message: 'not a project owner' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

async function memberAuthorization(req, res, next) {
    try {
        let projectData = await models.Project.findById(req.params.projectId).lean()
        if (!projectData) {
            throw { message: 'project is not found' }
        } else if (projectData.members.map(e => e.toString()).includes(req.auth._id)) {
            next()
        } else {
            throw { message: 'not a project member' }
        }
    } catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

module.exports = { todoAuthorization, ownerAuthorization, memberAuthorization }
