// src/CholesterolTracker.js
import React, { useState } from "react";

const CholesterolTracker = () => {
  const [cholesterolData, setCholesterolData] = useState({
    total: "",
    ldl: "",
    hdl: "",
    triglycerides: "",
    fasting: "",
    medication: "",
    diet: "",
    notes: "",
    date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCholesterolData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    alert("Cholesterol data submitted!\n\n" + JSON.stringify(cholesterolData, null, 2));
    // You can add database saving logic here
    setCholesterolData({
      total: "",
      ldl: "",
      hdl: "",
      triglycerides: "",
      fasting: "",
      medication: "",
      diet: "",
      notes: "",
      date: new Date().toISOString().slice(0, 10),
    });
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.mainHeading}>Cholesterol Tracker</h2>

      {/* Box 1: Track Your Cholesterol */}
      <div style={styles.infoBox}>
        <h3 style={styles.heading}>Track Your Cholesterol</h3>
        <p>
          Regular cholesterol tracking helps in early detection of heart risks,
          supports healthy lifestyle adjustments, and keeps you on track with medical goals.
        </p>
      </div>

      {/* Box 2: Entry Form */}
      <div style={styles.formBox}>
        <h3 style={styles.heading}>Enter Your Latest Readings</h3>

        <label>Total Cholesterol (mg/dL)</label>
        <input type="number" name="total" value={cholesterolData.total} onChange={handleChange} style={styles.input} />

        <label>LDL (Bad) (mg/dL)</label>
        <input type="number" name="ldl" value={cholesterolData.ldl} onChange={handleChange} style={styles.input} />

        <label>HDL (Good) (mg/dL)</label>
        <input type="number" name="hdl" value={cholesterolData.hdl} onChange={handleChange} style={styles.input} />

        <label>Triglycerides (mg/dL)</label>
        <input type="number" name="triglycerides" value={cholesterolData.triglycerides} onChange={handleChange} style={styles.input} />

        <label>Date of Test</label>
        <input type="date" name="date" value={cholesterolData.date} onChange={handleChange} style={styles.input} />

        <label>Fasting Status</label>
        <select name="fasting" value={cholesterolData.fasting} onChange={handleChange} style={styles.input}>
          <option value="">Select</option>
          <option value="Fasting">Fasting</option>
          <option value="Non-fasting">Non-fasting</option>
        </select>

        <label>Medication Taken?</label>
        <select name="medication" value={cholesterolData.medication} onChange={handleChange} style={styles.input}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label>Diet Before Test</label>
        <select name="diet" value={cholesterolData.diet} onChange={handleChange} style={styles.input}>
          <option value="">Select</option>
          <option value="Normal">Normal</option>
          <option value="High-fat">High-fat</option>
          <option value="Low-fat">Low-fat</option>
        </select>

        <label>Notes / Symptoms</label>
        <textarea name="notes" value={cholesterolData.notes} onChange={handleChange} style={styles.textarea} />

        <button onClick={handleSubmit} style={styles.submitButton}>Submit</button>
      </div>

      {/* Box 3: What is Cholesterol */}
      <div style={styles.infoBox}>
        <h3 style={styles.heading}>What is Cholesterol?</h3>
        <p>
          Cholesterol is a waxy substance in your blood that's needed to build healthy cells.
          But high levels can increase the risk of heart disease. Tracking LDL, HDL, and triglycerides
          helps maintain heart health and prevent complications.
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    maxWidth: 700,
    margin: "20px auto",
    padding: 20,
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  mainHeading: {
    color: "#006400",
    textAlign: "center",
    marginBottom: 30,
  },
  heading: {
    color: "#006400",
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: "#E6F2E6",
    padding: 20,
    borderRadius: 10,
    marginBottom: 25,
  },
  formBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 0 5px rgba(0,0,0,0.05)",
    marginBottom: 25,
  },
  input: {
    width: "100%",
    padding: 8,
    margin: "10px 0 20px 0",
    fontSize: 16,
    border: "1px solid #ccc",
    borderRadius: 6,
  },
  textarea: {
    width: "100%",
    minHeight: 80,
    padding: 8,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#006400",
    color: "#fff",
    padding: "10px 20px",
    fontSize: 16,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
    width: "100%",
  },
};

export default CholesterolTracker;
