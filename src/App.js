// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase/firebase'; // Import Firebase authentication
import Navbar from './components/Navbar'; // Import the Navbar
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import User from './pages/User';
import HomePage from './pages/HomePage';
import AlbumPage from './pages/AlbumPage';
import PhotoPage from './pages/PhotoPage';
import ProtectedRoute from './components/protectedRoute';

const App = () => {
  const [user, setUser] = useState(null); // State to hold the logged-in user
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false); // Update state
    localStorage.removeItem('isAuthenticated'); // Clear local storage
    // Call Firebase logout function if applicable
    auth.signOut();
  };

  // Check localStorage to persist the login state across page reloads
  useEffect(() => {
    const storedAuthState = localStorage.getItem('isAuthenticated');
    if (storedAuthState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // If user is logged in, set the user in state
        setIsAuthenticated(true); // Set isAuthenticated to true
        localStorage.setItem('isAuthenticated', 'true'); // Optionally, store in local storage
      } else {
        setUser(null); // If not logged in, set user to null
        setIsAuthenticated(false); // Set isAuthenticated to false
        localStorage.removeItem('isAuthenticated'); // Clear local storage
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {/* Conditionally render Navbar only if the user is logged in */}
      {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}

      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

        {/* Protect routes with the authenticated user */}
        <Route
          path="/users"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <User />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
          //  <ProtectedRoute isAuthenticated={isAuthenticated}>
              <HomePage isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          //  </ProtectedRoute>
          }
        />
        <Route
          path="/albums"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AlbumPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/photos"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <PhotoPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
