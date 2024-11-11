import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../App.css';

const socket = io('http://localhost:5000');

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const toastRef = useRef(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log("Fetching tasks...");
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/tasks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);

        if (!toastRef.current) {
          toast.info('Tasks loaded successfully!');
          toastRef.current = true;
        }
      } catch (error) {
        toast.error('Failed to fetch tasks.');
      }
    };

    fetchTasks();

    socket.on('taskUpdated', (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.taskId === updatedTask.taskId ? updatedTask : task))
      );
      toast.info('Task updated in real-time.');
    });

    return () => {
      socket.off('taskUpdated');
    };
  }, []);

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  const handleDelete = async (taskId, e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.taskId !== taskId));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Task ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Assigned To</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.taskId}
              onClick={() => handleTaskClick(task.taskId)}
              style={{ cursor: 'pointer' }}
            >
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.taskId}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.assignedTo}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{task.status}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/tasks/${task.taskId}/edit`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(task.taskId, e)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
