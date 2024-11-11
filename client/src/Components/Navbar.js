import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-item">Home</Link>
        </li>
        <li>
          <Link to="/login" className="nav-item">Login</Link>
        </li>
        <li>
          <Link to="/register" className="nav-item">Register</Link>
        </li>
        <li>
          <Link to="/tasks" className="nav-item">Tasks</Link>
        </li>
        <li>
          <Link to="/tasks/new" className="nav-item">Create Task</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
