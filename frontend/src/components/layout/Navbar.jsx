import React from 'react';

const Navbar = ({ onLoginClick, onSignupClick }) => {
  return (
    <nav className="text-black py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-8">
          <div className="text-lg font-bold">
            MyApp
          </div>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#features"
                className="hover:text-gray-600 transition duration-200"
              >
                Feature
              </a>
            </li>
            <li>
              <a
                href="#strategy"
                className="hover:text-gray-600 transition duration-200"
              >
                Strategy
              </a>
            </li>
          </ul>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={onLoginClick}
            className="hover:text-gray-600 transition duration-200 text-black-800 text-lg"
          >
            Login/
          </button>
          <button
            onClick={onSignupClick}
            className="hover:text-gray-600 transition duration-200 text-black-800 text-lg"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
