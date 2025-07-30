import React from "react";
import { Link } from "react-router-dom";

const AnalyticsPage = () => {
  // Dummy stats for demonstration — replace with real data from backend or context/store
  const stats = {
    averageSleep: "6.8 hours",
    averageMood: "Happy",
    averageBMI: "22.5",
    mostActiveDay: "Wednesday",
    bloodPressure: "120/80 mmHg",
    heartRate: "72 bpm",
    bloodSugar: "90 mg/dL",
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>📊 Health Analytics Overview</h1>

      <div style={styles.cardGrid}>
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} style={styles.card}>
            <h3 style={styles.cardTitle}>
              {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
            </h3>
            <p style={styles.cardValue}>{value}</p>
          </div>
        ))}
      </div>

      <Link to="/dashboard" style={styles.backButton}>← Back to Dashboard</Link>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f5f8ff",
    minHeight: "100vh",
  },
  heading: {
    textAlign: "center",
    color: "#2c3e50",
    fontSize: "2.5rem",
    marginBottom: "30px",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: "1.2rem",
    color: "#34495e",
    marginBottom: "10px",
  },
  cardValue: {
    fontSize: "1.5rem",
    color: "#27ae60",
    fontWeight: "bold",
  },
  backButton: {
    display: "inline-block",
    marginTop: "40px",
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
  },
};

export default AnalyticsPage;
