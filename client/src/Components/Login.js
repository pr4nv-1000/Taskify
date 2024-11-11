// src/Components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure axios is installed
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      toast.error('Please fill in both fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    setIsLoading(true);

    try {
      // Send login request to the backend API
      const response = await axios.post('https://taskify-beaz.onrender.com/api/users/login', {
        email,
        password,
      });

      // Check if login is successful
      if (response.data.token) {
        // Save the token in localStorage
        localStorage.setItem('token', response.data.token);

        // Display success message
        toast.success('Login successful');

        // Redirect to the tasks page
        navigate('/tasks');
      } else {
        toast.error('Invalid credentials');
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
