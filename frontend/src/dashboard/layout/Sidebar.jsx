// src/dashboard/layout/Sidebar.jsx
import React, { useState } from 'react';
import {
  FaHome, FaChartLine, FaFolder, FaChartPie,
  FaBriefcase, FaQuestionCircle, FaInfoCircle, FaSignOutAlt, FaChevronLeft, FaChevronRight,
  FaBell, FaIndustry, FaCog // Added FaCog for Settings
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State for controlling sidebar collapse

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle between collapsed and expanded states
  };

  return (
    <div className={`h-screen bg-gray-800 text-white ${isCollapsed ? 'w-20' : 'w-64'} transition-width duration-300 flex flex-col`}>
      
      {/* Toggle Button */}
      <div className="p-4 flex justify-between items-center">
        <h1 className={`${isCollapsed ? 'hidden' : 'block'} text-lg`}>Dashboard</h1>
        <button
          onClick={toggleSidebar}
          className="text-white focus:outline-none"
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="flex flex-col space-y-4 px-4 mt-6">
        <li>
          <Link to="/dashboard/home" className="flex items-center space-x-2">
            <FaHome size={20} />
            {!isCollapsed && <span className="text-base">Home</span>}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/stocks" className="flex items-center space-x-2">
            <FaFolder size={20} />
            {!isCollapsed && <span className="text-base">Stocks</span>}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/charts" className="flex items-center space-x-2">
            <FaChartLine size={20} />
            {!isCollapsed && <span className="text-base">Charts</span>}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/analysis" className="flex items-center space-x-2">
            <FaChartPie size={20} />
            {!isCollapsed && <span className="text-base">Analysis</span>}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/portfolio" className="flex items-center space-x-2">
            <FaBriefcase size={20} />
            {!isCollapsed && <span className="text-base">Portfolio</span>}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/sector" className="flex items-center space-x-2">
            <FaIndustry size={20} />
            {!isCollapsed && <span className="text-base">Sector</span>}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/alert" className="flex items-center space-x-2">
            <FaBell size={20} />
            {!isCollapsed && <span className="text-base">Alert</span>}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/help" className="flex items-center space-x-2">
            <FaQuestionCircle size={20} />
            {!isCollapsed && <span className="text-base">Help</span>}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/about" className="flex items-center space-x-2">
            <FaInfoCircle size={20} />
            {!isCollapsed && <span className="text-base">About Us</span>}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/settings" className="flex items-center space-x-2">
            <FaCog size={20} />
            {!isCollapsed && <span className="text-base">Settings</span>}
          </Link>
        </li>
        <li>
          <Link to="/dashboard/logout" className="flex items-center space-x-2">
            <FaSignOutAlt size={20} />
            {!isCollapsed && <span className="text-base">Logout</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
