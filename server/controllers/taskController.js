const Task = require('../models/task');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  const { taskId, title, description, status, assignedTo } = req.body;
  const username = req.user ? req.user.username : 'Unknown User';
  try {
    const task = new Task({ taskId, title, description, status, assignedTo });
    await task.save();
    console.log(`User: ${username} has added the task with ID: ${task.taskId}`);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  const username = req.user ? req.user.username : 'Unknown User';
  try {
    const task = await Task.findOneAndUpdate({ taskId: req.params.taskId }, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    console.log(`User: ${username} has edited the task with ID: ${task.taskId}`);
    
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  const username = req.user ? req.user.username : 'Unknown User';
  try {
    const task = await Task.findOneAndDelete({ taskId: req.params.taskId });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    console.log(`User: ${username} has removed the task with ID: ${task.taskId}`);
    
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { getTasks, createTask, updateTask, deleteTask};
