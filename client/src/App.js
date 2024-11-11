import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Components
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Register from './Components/Register';
import TaskList from './Components/TaskList';
import TaskDetails from './Components/TaskDetails';
import Home from './Components/Home';
import AddTask from './Components/AddTask'; 
import ModifyTask from './Components/ModifyTask'; 

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/tasks/new" element={<AddTask />} />
          <Route path="/tasks/:taskId/edit" element={<ModifyTask />} />
          <Route path="/tasks/:taskId" element={<TaskDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
