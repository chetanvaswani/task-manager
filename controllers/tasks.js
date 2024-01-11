const Task = require('../models/Task')

const getAllTasks = async (req, res, next) => {
    // res.status(200).send('Get request succesful!')
    try{
        const task = await Task.find({})
        res.status(200).json({task})
    } catch (err){
        res.status(500).send(err)
    }
}

const getTask = async (req, res) => {
    const taskID = req.params.id
    try{
        const task = await Task.findOne({ _id:taskID })
        if (!task){
            return res.status(404).send(`No Task found with id: ${taskID}`)
        }
        res.status(201).json({task})
    } catch (err){
        res.status(500).send(err)
    }
}

const createTask = async (req, res) => {
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    } catch (err){
        res.status(500).send(err)
    }
}

const updateTask = async (req, res) => {
    const taskID = req.params.id
    try{
        const task = await Task.findOneAndUpdate({ _id:taskID }, {
            name: req.body.name,
            completed: req.body.completed,
        }, {new:true, runValidators:true})
        if (!task){
            return res.status(404).send(`No Task found with id: ${taskID}`)
        }
        return res.status(201).json({task})
    } catch(err){
        res.status(500).send(err)
    }
}

const deleteTask = async (req, res) => {
    const taskID = req.params.id
    try{
        const task = await Task.deleteOne({ _id:taskID })
        if (!task){
            return res.status(404).send(`No Task found with id: ${taskID}`)
        }
        res.status(201).json({task})
    } catch (err){
        res.status(500).send(err)
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}