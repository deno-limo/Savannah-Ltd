//src/pages/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div style={styles.container}>
      <h1>Welcome Savannah Informatics!</h1>
      <p>Explore the savannah of albums and users.</p>
      <h2>Please log in to continue.</h2>{" "}
      {/* Optional message to prompt login */}
      <Button color="primary" onClick={() => navigate("/login")}>
        Login
      </Button>{" "}
      {/* Login button */}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f0f4f8",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default LandingPage;
