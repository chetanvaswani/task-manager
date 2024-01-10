const Task = require('../models/Task')

const getAllTasks = (req, res, next) => {
    res.status(200).send('Get request succesful!')
}

const getTask = (req, res) => {
    res.send('Hello world')
}

const createTask = async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
}

const updateTask = (req, res) => {
    res.send('Hello world')
}

const deleteTask = (req, res) => {
    res.send('Hello world')
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}