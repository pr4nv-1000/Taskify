const express = require('express');
const { createTask, getTasks, updateTask, deleteTask} = require('../controllers/taskController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.route('/:taskId')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
