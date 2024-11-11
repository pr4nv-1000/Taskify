// src/Components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>Welcome to Taskify</h1>
        <p>Effortlessly manage your tasks, collaborate with your team, and stay organized.</p>
        <Link to="/tasks" className="btn-primary">Get Started</Link>
      </section>

      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Create Tasks</h3>
            <p>Quickly create and assign tasks to team members.</p>
          </div>
          <div className="feature-item">
            <h3>Track Progress</h3>
            <p>Monitor the status of tasks in real-time.</p>
          </div>
          <div className="feature-item">
            <h3>Real-time Collaboration</h3>
            <p>Stay updated with live task updates and changes.</p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h2>Ready to organize your tasks?</h2>
        <Link to="/register" className="btn-secondary">Sign Up</Link>
        <Link to="/login" className="btn-secondary">Log In</Link>
      </section>
    </div>
  );
};

export default Home;
