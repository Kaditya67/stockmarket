import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { email, password });
      if (res.data.success) {
        navigate('/dashboard'); // Redirect to dashboard after login
      }
    } catch (err) {
      setError(err.response.data.message); // Display error if user doesn't exist
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full p-2 font-bold text-white bg-blue-500 rounded">
            Login
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <p className="text-center">Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
