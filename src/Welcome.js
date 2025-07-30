// src/Welcome.js

import React from "react";
import logo from "./logo.png"; // Make sure logo.png is inside /src
import { useNavigate } from "react-router-dom";

const features = [
  "BMI Calculator",
  "Mood Tracker",
  "Sleep Tracker",
  "Exercise",
  "Blood Pressure",
  "Blood Sugar",
  "Cholesterol",
  "Heart Rate",
  "Calorie Counter",
  "Activity Level",
  "Yoga & Meditation",
  "AI Assistant",
  "Risk Score",
  "Anxiety Tracker",
  "Haemoglobin"
];

// Map features to their routes (add more routes as you implement)
const featureRoutes = {
  "Haemoglobin": "/haemoglobin",
  // add others here, example:
  // "BMI Calculator": "/bmi-calculator",
  // "Mood Tracker": "/mood-tracker",
};

const Welcome = () => {
  const navigate = useNavigate();

  const handleCardClick = (feature) => {
    if (featureRoutes[feature]) {
      navigate(featureRoutes[feature]);
    } else {
      alert(`${feature} clicked! (Navigation not set up yet)`);
    }
  };

  return (
    <div style={styles.container}>
      <img src={logo} alt="MyEasyPharma Logo" style={styles.logo} />
      <h1 style={styles.title}>MyEasyPharma Dashboard</h1>
      <p style={styles.subtitle}>Select a feature to begin monitoring your health</p>

      <div style={styles.grid}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => handleCardClick(feature)}
          >
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  logo: {
    width: "80px",
    height: "80px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "2rem",
    margin: "10px 0",
    color: "#1976d2",
  },
  subtitle: {
    color: "#555",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "20px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  card: {
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
};

export default Welcome;




