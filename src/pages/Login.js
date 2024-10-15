// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../firebase/firebase'; // Assuming you have this login function

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      await login(email, password); // Log in the user

      // Update authentication state
      setIsAuthenticated(true);
      // Optionally store this in localStorage to persist across reloads
      localStorage.setItem('isAuthenticated', 'true');

      setSuccessMessage('Successfully logged in!');
      setTimeout(() => {
        navigate('/home'); // Redirect to Home after 1 second
      }, 1000);
    } catch (err) {
      setError('Invalid email or password.');
    }
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label>Email Address</label>
            <input
              id="emailAddress"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              id="passWord"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          {/* Display Error Message */}
          {error && <p style={styles.error}>{error}</p>}

          {/* Display Success Message */}
          {successMessage && <p style={styles.successMessage}>{successMessage}</p>}

          <button id="logIn" type="submit" style={styles.loginButton} disabled={!email || !password}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

// Inline styles for simplicity
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full viewport height
    backgroundColor: '#f0f4f8', // Optional background color
  },
  loginBox: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '300px', // Set a width for the login box
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    padding: '10px',
    width: '100%', // Full width of the parent container
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  loginButton: {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  successMessage: {
    color: 'green',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default Login;
