// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth"; // Import Auth functions

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0-ZgvpH69qW9ZRhvvoHcu5Q1MGrh6TnU",
  authDomain: "savannah-a7ba4.firebaseapp.com",
  projectId: "savannah-a7ba4",
  storageBucket: "savannah-a7ba4.appspot.com",
  messagingSenderId: "818706445623",
  appId: "1:818706445623:web:f7286afaf75b5527f416b2",
  measurementId: "G-T4G22BMHHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Auth

// Function to log in a user
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Return the logged-in user
  } catch (error) {
    throw new Error(error.message); // Throw the error for handling in the component
  }
};

// Function to log out a user
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export { auth }; // Export the auth object if you need it elsewhere
