import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url('/static/images/stock-market.png')` }}>
      <div className="container max-w-sm bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="csrfmiddlewaretoken" value="8crl7aU2n9gecSFn2CWosUYUwGgdRZKnuV6KxEewh3NgiPA7PPvCf5yizmsVERZv" />
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">User ID</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              placeholder="Password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="mb-4 text-right">
            <a href="/forgotpassword/" className="text-sm text-indigo-600 hover:underline">Forgot Password?</a>
          </div>
          
          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Don't have an account? <a href="/SignUp/" className="text-indigo-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
