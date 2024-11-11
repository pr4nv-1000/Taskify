import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const ModifyTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'Pending',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://taskify-qhip.onrender.com/api/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(response.data);
      } catch (err) {
        toast.error('Error fetching task: ' + err.response?.data?.message || err.message);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.title && !task.description && !task.status) {
      toast.error('Please fill in at least one field');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');

      const updatedTask = {
        ...(task.title && { title: task.title }),
        ...(task.description && { description: task.description }),
        ...(task.status && { status: task.status }),
      };

      const response = await axios.put(`https://taskify-qhip.onrender.com/api/tasks/${taskId}`, updatedTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Task updated successfully');
      setIsLoading(false);
      navigate('/tasks');
    } catch (err) {
      setIsLoading(false);
      toast.error('Error updating task: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="task-form-container">
      <div className="task-form">
        <h2>Modify Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              placeholder="Enter task title"
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              placeholder="Enter task description"
            />
          </div>

          <div className="input-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={task.status}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Updating Task...' : 'Update Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModifyTask;
