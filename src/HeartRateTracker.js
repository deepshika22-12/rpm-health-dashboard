// src/HeartRateTracker.js
import React, { useState } from "react";

const HeartRateTracker = () => {
  const [heartRate, setHeartRate] = useState("");
  const [measurementTime, setMeasurementTime] = useState(new Date().toISOString().slice(0, 16));
  const [condition, setCondition] = useState("");
  const [activity, setActivity] = useState("");
  const [position, setPosition] = useState("");
  const [mood, setMood] = useState("");
  const [medication, setMedication] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [notes, setNotes] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Heart Rate Logged! (You can connect this to Firebase later.)");
  };

  const handleAnalyze = () => {
    const rate = parseInt(heartRate);
    if (!rate) {
      setAnalysisResult("Please enter a valid heart rate.");
      return;
    }
    if (rate < 60) {
      setAnalysisResult("⬇️ Your heart rate is low [Bradycardia]. Please consult a doctor.");
    } else if (rate > 100) {
      setAnalysisResult("⬆️ Your heart rate is high [Tachycardia]. Monitor and seek advice.");
    } else {
      setAnalysisResult("➡️ Your heart rate is normal.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.mainBox}>
        {/* Header Box */}
        <div style={styles.headerBox}>
          <span style={{ fontSize: "28px" }}>❤️</span>
          <h2 style={styles.heading}>Heart Rate Monitor</h2>
          <p style={styles.subtext}>
            Tracking your heart rate regularly helps you monitor your cardiovascular health and manage stress.
          </p>
        </div>

        {/* Form Box */}
        <div style={styles.formBox}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label>Heart Rate (bpm):</label>
            <input
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              required
              placeholder="e.g., 72"
              style={styles.input}
            />
            <button type="button" onClick={handleAnalyze} style={styles.analyzeBtn}>
              Analyze
            </button>
            {analysisResult && (
              <div style={styles.resultBox}>
                <strong>{analysisResult}</strong>
              </div>
            )}

            <label>Date & Time of Measurement:</label>
            <input
              type="datetime-local"
              value={measurementTime}
              onChange={(e) => setMeasurementTime(e.target.value)}
              style={styles.input}
            />

            <label>Measurement Condition:</label>
            <select value={condition} onChange={(e) => setCondition(e.target.value)} style={styles.input}>
              <option value="">Select</option>
              <option>At rest</option>
              <option>After exercise</option>
              <option>While walking</option>
              <option>After waking up</option>
              <option>Before sleep</option>
            </select>

            <label>Pre-measurement Activity:</label>
            <select value={activity} onChange={(e) => setActivity(e.target.value)} style={styles.input}>
              <option value="">Select</option>
              <option>Resting</option>
              <option>Walking</option>
              <option>Exercise</option>
              <option>Stressful Event</option>
              <option>Caffeine Intake</option>
            </select>

            <label>Body Position:</label>
            <select value={position} onChange={(e) => setPosition(e.target.value)} style={styles.input}>
              <option value="">Select</option>
              <option>Sitting</option>
              <option>Lying down</option>
              <option>Standing</option>
            </select>

            <label>Mood / Stress Level:</label>
            <select value={mood} onChange={(e) => setMood(e.target.value)} style={styles.input}>
              <option value="">Select</option>
              <option>Calm 😌</option>
              <option>Normal 🙂</option>
              <option>Stressed 😣</option>
            </select>

            <label>Medication Taken:</label>
            <input
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
              placeholder="e.g., Beta blockers"
              style={styles.input}
            />

            <label>Symptoms:</label>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g., Dizziness, chest pain"
              style={styles.input}
            />

            <label>Notes:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes..."
              style={{ ...styles.input, height: "60px" }}
            />

            <button type="submit" style={styles.submitBtn}>Log Heart Rate</button>
          </form>
        </div>

        {/* Reference Box */}
        <div style={styles.infoBox}>
          <h3>📈 Heart Rate Reference</h3>
          <ul>
            <li><strong>Normal:</strong> 60–100 bpm <span style={{ color: "green" }}>➡️ normal</span></li>
            <li><strong>Below 60 bpm:</strong> low <span style={{ color: "red" }}>⬇️ [Bradycardia]</span></li>
            <li><strong>Above 100 bpm:</strong> high <span style={{ color: "red" }}>⬆️ [Tachycardia]</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: "#FAF9F6",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  mainBox: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    maxWidth: "700px",
    margin: "auto",
  },
  headerBox: {
    textAlign: "center",
    marginBottom: "20px",
  },
  heading: {
    color: "#006400",
    margin: "10px 0 5px 0",
  },
  subtext: {
    fontSize: "14px",
    color: "#555",
  },
  formBox: {
    backgroundColor: "#E6F2E6",
    borderRadius: "8px",
    padding: "20px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  submitBtn: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#006400",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
  },
  analyzeBtn: {
    padding: "8px 12px",
    backgroundColor: "#ffcc00",
    color: "#333",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    alignSelf: "start",
  },
  resultBox: {
    backgroundColor: "#fff3cd",
    padding: "10px",
    borderRadius: "5px",
    color: "#856404",
  },
  infoBox: {
    backgroundColor: "#fffbe6",
    borderLeft: "5px solid #ffd700",
    padding: "15px",
    borderRadius: "6px",
    marginTop: "20px",
  },
};

export default HeartRateTracker;




