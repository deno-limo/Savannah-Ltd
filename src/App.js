// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebase";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import User from "./pages/User";
import HomePage from "./pages/HomePage";
import AlbumPage from "./pages/AlbumPage";
import PhotoPage from "./pages/PhotoPage";
import ProtectedRoute from "./components/protectedRoute";

const App = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");

    auth.signOut();
  };

  useEffect(() => {
    const storedAuthState = localStorage.getItem("isAuthenticated");
    if (storedAuthState === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
      } else {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {/* Conditionally render Navbar only if the user is logged in */}
      {isAuthenticated && (
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      )}

      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

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
            <HomePage
              isAuthenticated={isAuthenticated}
              handleLogout={handleLogout}
            />
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
