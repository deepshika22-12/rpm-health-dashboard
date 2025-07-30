// src/HaemoglobinTracker.js
import React, { useState } from "react";

const HaemoglobinTracker = () => {
  const [hbValue, setHbValue] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const getStatus = (value, gender) => {
    const val = parseFloat(value);
    if (isNaN(val) || !gender) return "";

    if (gender === "male") {
      if (val < 13.5) return "Low";
      else if (val <= 17.5) return "Normal";
      else return "High";
    } else if (gender === "female") {
      if (val < 12.0) return "Low";
      else if (val <= 15.5) return "Normal";
      else return "High";
    }
  };

  const getSuggestion = (status) => {
    switch (status) {
      case "Low":
        return "Your haemoglobin level is low. Consider eating iron-rich foods or consulting a doctor.";
      case "High":
        return "Your haemoglobin level is high. Please consult your healthcare provider.";
      case "Normal":
        return "Your haemoglobin level is within the normal range. Keep up the healthy lifestyle!";
      default:
        return "";
    }
  };

  const handleCheck = () => {
    const result = getStatus(hbValue, gender);
    setStatus(result);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Haemoglobin Tracker</h2>

      {/* Box 1: Info */}
      <div style={styles.card}>
        <h3>Track Your Haemoglobin</h3>
        <p>Tracking your haemoglobin regularly helps detect anemia, fatigue, or other health issues early.</p>
      </div>

      {/* Box 2: Input */}
      <div style={styles.card}>
        <h3>Enter Your Haemoglobin (g/dL)</h3>
        <input
          type="number"
          value={hbValue}
          onChange={(e) => setHbValue(e.target.value)}
          placeholder="e.g., 13.2"
          style={styles.input}
        />
        <div style={styles.genderButtons}>
          <button
            onClick={() => setGender("male")}
            style={{
              ...styles.genderBtn,
              backgroundColor: gender === "male" ? "#006400" : "#e0e0e0",
              color: gender === "male" ? "white" : "black",
            }}
          >
            Male
          </button>
          <button
            onClick={() => setGender("female")}
            style={{
              ...styles.genderBtn,
              backgroundColor: gender === "female" ? "#006400" : "#e0e0e0",
              color: gender === "female" ? "white" : "black",
            }}
          >
            Female
          </button>
        </div>
        <button onClick={handleCheck} style={styles.checkBtn}>
          Check Status
        </button>
      </div>

      {/* Box 3: Status */}
      {status && (
        <div style={styles.card}>
          <h3>Status: {status}</h3>
          <p>{getSuggestion(status)}</p>
        </div>
      )}

      {/* Box 4: Info */}
      <div style={styles.card}>
        <h3>What is Haemoglobin?</h3>
        <p>
          Haemoglobin is a protein in red blood cells that carries oxygen throughout your body.
          Maintaining normal haemoglobin levels is crucial for energy, focus, and overall health.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "#FAF9F6",
    borderRadius: "12px",
  },
  heading: {
    fontSize: "28px",
    color: "#006400",
    marginBottom: "20px",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "100%",
    marginTop: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  genderButtons: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  genderBtn: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "none",
    fontWeight: "bold",
  },
  checkBtn: {
    backgroundColor: "#006400",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default HaemoglobinTracker;
