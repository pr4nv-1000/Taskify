import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TaskDetails = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://taskify-qhip.onrender.com/api/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTask(response.data);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setStatus(response.data.status);
        toast.info('Task details loaded.');
      } catch (error) {
        toast.error('Failed to fetch task details.');
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://taskify-qhip.onrender.com/api/tasks/${taskId}`,
        { title, description, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Task updated successfully!');
      navigate('/tasks');
    } catch (error) {
      toast.error('Failed to update task.');
    }
  };

  if (!task) return <div>Loading...</div>;

  return (
    <div>
      <h2>Task Details</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={handleUpdate}>Update Task</button>
    </div>
  );
};

export default TaskDetails;
