// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Index from "./components/pages/landingpage/index";
import Login from "./components/pages/loginpage/Login";
import SignUp from './components/pages/signuppage/SignUp';
import StockDataPage from './components/pages/StockDataPage';
import StockChart from './components/pages/StockChart';
import DashboardPage from './dashboard/pages/DashboardPage'; // Ensure correct import path

// Import dashboard pages
import HomePage from './dashboard/pages/HomePage';
import StocksPage from './dashboard/pages/StocksPage';
import ChartPage from './dashboard/pages/ChartPage';
import AnalysisPage from './dashboard/pages/AnalysisPage';
import PortfolioPage from './dashboard/pages/PortfolioPage';
import HelpPage from './dashboard/pages/HelpPage';
import AboutPage from './dashboard/pages/AboutPage';
import LogoutPage from './dashboard/pages/LogoutPage';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false); // Close Sign Up if it's open
  };

  const handleSignupClick = () => {
    setShowSignUp(true);
    setShowLogin(false); 
  };

  return (
    <Router>
      {/* Show Navbar on the main pages only */}
      {!window.location.pathname.startsWith('/dashboard') && (
        <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      )}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/stock-data" element={<StockDataPage />} />
        <Route path="/stock-chart" element={<StockChart />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          {/* Nested routes for the dashboard pages */}
          <Route path="home" element={<HomePage />} />
          <Route path="stocks" element={<StocksPage />} />
          <Route path="charts" element={<ChartPage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="logout" element={<LogoutPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
