import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Index from "./components/pages/landingpage/index";
import Charts from "./components/pages/landingpage/Charts";
import Graph from "./components/pages/landingpage/Graph";
import Features from "./components/pages/landingpage/Features";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/loginpage/Login";
import SignUp from './components/pages/signuppage/SignUp';

function LandingPage() {
  return (
    <>
      <Index />
      <Charts />
      <Graph />
      <Features />
      <Footer />
    </>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false); // Close Sign Up if it's open
  };

  const handleSignupClick = () => {
    setShowSignUp(true);
    setShowLogin(false); // Close Login if it's open
  };

  return (
    <Router>
      <Navbar onLoginClick={handleLoginClick} onSignupClick={handleSignupClick} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
