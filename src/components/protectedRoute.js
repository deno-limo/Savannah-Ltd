// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// This component takes two props: 
// - `children`: the component to render if the user is authenticated
// - `isAuthenticated`: a boolean to determine if the user is logged in
const ProtectedRoute = ({ isAuthenticated, children }) => {
    console.log(isAuthenticated, 'this isProtectedPage')
  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace/>;
  }

  // If the user is authenticated, render the children (protected component)
  return children;
};

export default ProtectedRoute;
