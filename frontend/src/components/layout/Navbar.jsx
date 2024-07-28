import React from "react";

const Navbar = () => {
  return (
    <nav className="text-black py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-8">
          <div className="text-lg font-bold">
            MyApp
          </div>
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="hover:text-gray-600 transition duration-200"
              >
                Feature
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-600 transition duration-200"
              >
                Strategy
              </a>
            </li>
          </ul>
        </div>
        <ul className="flex space-x-4">
          <li>
            <a
              href="#"
              className="hover:text-gray-600 transition duration-200"
            >
              Login/SignUp
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
