import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (API call, authentication, etc.)
    console.log('Username:', username);
    console.log('Password:', password);

    // Assuming the login is successful
    setLoginSuccess(true);  // Set login success state to true
    setTimeout(() => {
      setLoginSuccess(false);  // Hide success message after 3 seconds
      navigate('/dashboard');  // Redirect to the dashboard page
    }, 3000);
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url('/static/images/stock-market.png')` }}
    >
      <div className="container max-w-sm bg-white bg-opacity-80 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
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
            <Link to="/forgotpassword" className="text-sm text-indigo-600 hover:underline">Forgot Password?</Link>
          </div>

          <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300">
            Login
          </button>
        </form>

        {loginSuccess && (
          <div className="mt-4 text-green-600 text-center">
            User logged in successfully!
          </div>
        )}

        <p className="mt-6 text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-indigo-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
