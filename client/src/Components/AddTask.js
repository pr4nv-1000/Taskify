import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {
  const [taskId, setTaskId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [assignedTo, setAssignedTo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskId || !title || !description || !assignedTo) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(assignedTo)) {
      toast.error('Please enter a valid email for Assigned To');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');


      const response = await axios.post('https://taskify-qhip.onrender.com/api/tasks', {
        taskId, title, description, status, assignedTo
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('Task added successfully');
      setIsLoading(false);
      navigate('/tasks');
    } catch (err) {
      setIsLoading(false);
      toast.error('Error adding task: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="task-form-container">
      <div className="task-form">
        <h2>Add New Task</h2>
        <form onSubmit={handleSubmit}>
          {/* Task ID Input */}
          <div className="input-group">
            <label htmlFor="taskId">Task ID</label>
            <input
              type="text"
              id="taskId"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
              placeholder="Enter task ID"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Assigned To Email Input */}
          <div className="input-group">
            <label htmlFor="assignedTo">Assigned To (Email)</label>
            <input
              type="email"
              id="assignedTo"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Enter email of person assigned"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Adding Task...' : 'Add Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
