// src/pages/HomePage.js
import React from "react";
import Navbar from "../components/Navbar";
import LandingPage from "./LandingPage";

const HomePage = ({ isAuthenticated, handleLogout }) => {
  return (
    <div>
      {/* Check if the user is authenticated */}
      {isAuthenticated ? (
        <>
          {/* <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} /> */}
          <h2>Welcome to the Savannah Informatics!</h2>
          {/* You can add more content for authenticated users here */}
        </>
      ) : (
        <>
          <LandingPage />
        </>
      )}
    </div>
  );
};

export default HomePage;
