import { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      alert("Passwords do not match");
      return;
    }

    
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/signup`, {
      email,
      username,
      phone,
      password1,
      password2,
    });

      console.log(response.data.message);
      alert("User registered successfully!");
    } catch (error) {
      console.error('Error registering user:', error.response.data);
      alert(`Registration failed: ${error.response.data.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-700">Email address:</label>
              <input
                type="email"
                id="signupEmail"
                name="email"
                placeholder="Enter email"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="signupUsername" className="block text-sm font-medium text-gray-700">Username:</label>
              <input
                type="text"
                id="signupUsername"
                name="username"
                placeholder="Choose a username"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="signupPhone" className="block text-sm font-medium text-gray-700">Phone:</label>
              <input
                type="text"
                id="signupPhone"
                name="phone"
                placeholder="Enter your phone number"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                id="signupPassword"
                name="password1"
                placeholder="Password"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="signupConfirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
              <input
                type="password"
                id="signupConfirmPassword"
                name="password2"
                placeholder="Confirm password"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            <button type="submit" className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account? <a href="/login/" className="text-indigo-600 font-medium hover:underline">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
