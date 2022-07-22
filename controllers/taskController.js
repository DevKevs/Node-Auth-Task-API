const Task = require("../models/task")

const createTask = async (req, res) => {
    try {
        const {taskName} = req.body 

        const id = req.uid;

        const newTask = new Task({
            taskName,
            owner: id
        })


        await newTask.save()
    
        res.status(200).json({
            ok: true,
            msg: 'Task Sucesfully created',
            newTask
        })
    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'Task cant be created'
        })
    }

};

const readTask = async (req, res) => {
    try {
        const id = req.uid;

        const tasks = await Task.find({owner: id}).sort({createdAt: -1})

        return res.json({
            ok: true,
            tasks
        })
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'No task for list...'
        })
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;

    const { taskName } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { taskName }, { new: true})

        return res.json({
            ok: true,
            msg: 'Task Succesfully updated', 
            task
        })
       
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'task cant be updated...'
        })
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await Task.findByIdAndRemove(id)

        return res.json({
            ok: true,
            msg: 'Task Succesfully deleted', 
            task
        })
       
    } catch (error) {
        res.status(404).json({
            ok: false,
            msg: 'task cant be deleted...'
        })
    }
}

module.exports = { createTask, readTask, updateTask, deleteTask }