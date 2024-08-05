import React, { useState } from 'react';
import Navbar from "./components/layout/Navbar";
import Index from "./components/pages/landingpage/index";
import Charts from "./components/pages/landingpage/Charts";
import Graph from "./components/pages/landingpage/Graph";
import Features from "./components/pages/landingpage/Features";
import Footer from "./components/layout/Footer";
import Login from "./components/pages/loginpage/Login";
// import SignUp from './components/pages/signuppage/SignUp';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <>
      <Navbar onLoginClick={handleLoginClick} />
      {showLogin ? (
        <Login />
      ) : (
        <>
          <Index />
          <Charts />
          <Graph />
          <Features />
          <Footer />
          {/* <SignUp /> */}
        </>
      )}
    </>
  );
}

export default App;
