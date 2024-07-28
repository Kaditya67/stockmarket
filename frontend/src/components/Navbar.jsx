import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-lg font-bold">
          MyApp
        </div>
        <ul className="flex space-x-4">
          <li>
            <a
              className="hover:text-gray-300 transition duration-200"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="hover:text-gray-300 transition duration-200"
            >
              About
            </a>
          </li>
          <li>
            <a
              className="hover:text-gray-300 transition duration-200"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              className="hover:text-gray-300 transition duration-200"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
