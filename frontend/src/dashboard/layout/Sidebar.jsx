import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChartLine, FaFolder, FaChartPie, FaBriefcase, FaQuestionCircle, FaInfoCircle, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <nav className="w-64 bg-gray-800 text-white h-screen">
      <div className="p-4">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <ul className="mt-4">
          <li>
            <Link to="/dashboard/home" className="flex items-center p-2 hover:bg-gray-700">
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/stocks" className="flex items-center p-2 hover:bg-gray-700">
              <FaFolder className="mr-2" /> Stocks
            </Link>
          </li>
          <li>
            <Link to="/dashboard/charts" className="flex items-center p-2 hover:bg-gray-700">
              <FaChartLine className="mr-2" /> Charts
            </Link>
          </li>
          <li>
            <Link to="/dashboard/analysis" className="flex items-center p-2 hover:bg-gray-700">
              <FaChartPie className="mr-2" /> Analysis
            </Link>
          </li>
          <li>
            <Link to="/dashboard/portfolio" className="flex items-center p-2 hover:bg-gray-700">
              <FaBriefcase className="mr-2" /> Portfolio
            </Link>
          </li>
          <li>
            <Link to="/dashboard/help" className="flex items-center p-2 hover:bg-gray-700">
              <FaQuestionCircle className="mr-2" /> Help
            </Link>
          </li>
          <li>
            <Link to="/dashboard/about" className="flex items-center p-2 hover:bg-gray-700">
              <FaInfoCircle className="mr-2" /> About
            </Link>
          </li>
          <li>
            <Link to="/dashboard/logout" className="flex items-center p-2 hover:bg-gray-700">
              <FaSignOutAlt className="mr-2" /> Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
