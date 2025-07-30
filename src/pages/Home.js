import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // Simulating logged-in user info — replace with actual auth/context later
  const userName = "Deepshika";

  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>👋 Welcome, {userName}!</h1>
      <p style={styles.subText}>Your AI Health Assistant is ready to support your well-being.</p>

      <div style={styles.navButtons}>
        <Link to="/dashboard" style={styles.button}>🩺 Go to Health Dashboard</Link>
        <Link to="/analytics" style={styles.button}>📊 View Health Analytics</Link>
      </div>

      <div style={styles.quoteBox}>
        <p style={styles.quote}>
          “Take care of your body. It’s the only place you have to live.” <br />
          — Jim Rohn
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "50px",
    textAlign: "center",
    background: "linear-gradient(135deg, #e0f7fa, #e1bee7)",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },
  welcome: {
    fontSize: "3rem",
    color: "#2c3e50",
    marginBottom: "10px",
  },
  subText: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "40px",
  },
  navButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginBottom: "40px",
  },
  button: {
    backgroundColor: "#6a1b9a",
    color: "#fff",
    padding: "15px 25px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "1.1rem",
    transition: "0.3s ease",
  },
  quoteBox: {
    backgroundColor: "#fff3e0",
    padding: "20px",
    borderRadius: "12px",
    width: "80%",
    maxWidth: "600px",
    margin: "0 auto",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  quote: {
    fontStyle: "italic",
    fontSize: "1.2rem",
    color: "#6d4c41",
  },
};

export default Home;
