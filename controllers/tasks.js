const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomAPIError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req, res) => {
    // res.status(200).send('Get request succesful!')
    const tasks = await Task.find({})
    res.status(200).json({tasks})
})

const getTask = asyncWrapper( async (req, res, next) => {
    const taskID = req.params.id
    const task = await Task.findOne({ _id:taskID })
    if (!task){
        return next(createCustomAPIError(`No Task found with id: ${taskID}`, 404))
        // return res.status(404).send(`No Task found with id: ${taskID}`)
    }
    res.status(201).json({task})
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({task})
})

const updateTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.id
    const task = await Task.findOneAndUpdate({ _id:taskID }, {
        name: req.body.name,
        completed: req.body.completed,
    }, {new:true, runValidators:true})
    if (!task){
        return res.status(404).send(`No Task found with id: ${taskID}`)
    }
    return res.status(201).json({task})

})

const deleteTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.id
    const task = await Task.deleteOne({ _id:taskID })
    if (!task){
        return res.status(404).send(`No Task found with id: ${taskID}`)
    }
    res.status(201).json({task})
})

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}