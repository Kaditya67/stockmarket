// src/dashboard/layout/DashboardLayout.jsx
import React from 'react';
import Sidebar from './Sidebar'; // Import your Sidebar component
import { Outlet } from 'react-router-dom'; // Import Outlet to render nested routes

const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar /> {/* Render the Sidebar */}
      <main className="flex-1 p-4">
        <Outlet /> {/* Render nested routes here */}
      </main>
    </div>
  );
};

export default DashboardLayout;
