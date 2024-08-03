

import React from 'react';

const Login = () => {
  return (
    <div className="flex min-h-screen bg-pink-200">
      <div className="flex flex-1 justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Sign In
              </button>
              <a
                href="#"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account? <a href="#" className="text-blue-500 hover:text-blue-800">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
