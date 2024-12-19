// src/pages/Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user data from backend
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/current', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        // If the user is not logged in, redirect to login page
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>; // Show loading while fetching user data
  }

  return (
    <div>
      <h1>Welcome to Your Dashboard, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <p>Here you can view your personal details and manage your settings.</p>
    </div>
  );
};

export default Dashboard;
