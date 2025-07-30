import React, { useState } from "react";

const BloodSugarTracker = () => {
  const [sugarData, setSugarData] = useState({
    glucose: "",
    time: "",
    meal: "",
    medication: "",
    exercise: "",
    illness: "",
    symptoms: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSugarData({ ...sugarData, [name]: value });
  };

  const handleSubmit = () => {
    alert("Blood Sugar Data Submitted!");
    // You can add saving logic here later
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Track Your Blood Sugar</h2>

      <div style={styles.infoBox}>
        <h3 style={styles.infoHeading}>Why Track Blood Sugar?</h3>
        <p style={styles.infoText}>
          Regular monitoring helps you manage diabetes effectively, avoid dangerous sugar spikes, and maintain overall health.
        </p>
      </div>

      <div style={styles.infoBox}>
        <h3 style={styles.infoHeading}>What is Blood Sugar?</h3>
        <p style={styles.infoText}>
          Blood sugar (glucose) is the main sugar found in your blood. It provides energy for your body's cells. Monitoring helps keep it within a healthy range.
        </p>
      </div>

      <div style={styles.card}>
        <input
          type="number"
          name="glucose"
          placeholder="Blood Glucose (mg/dL)"
          value={sugarData.glucose}
          onChange={handleChange}
          style={styles.input}
          min="0"
        />

        <select name="time" value={sugarData.time} onChange={handleChange} style={styles.input}>
          <option value="">Measurement Time</option>
          <option value="Fasting">Fasting</option>
          <option value="Before Meal">Before Meal</option>
          <option value="After Meal">After Meal</option>
          <option value="Bedtime">Bedtime</option>
          <option value="Random">Random</option>
        </select>

        <select name="meal" value={sugarData.meal} onChange={handleChange} style={styles.input}>
          <option value="">Meal Type</option>
          <option value="Light">Light</option>
          <option value="Moderate">Moderate</option>
          <option value="Heavy">Heavy</option>
        </select>

        <select name="medication" value={sugarData.medication} onChange={handleChange} style={styles.input}>
          <option value="">Medication Taken?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select name="exercise" value={sugarData.exercise} onChange={handleChange} style={styles.input}>
          <option value="">Exercise Around Measurement?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <select name="illness" value={sugarData.illness} onChange={handleChange} style={styles.input}>
          <option value="">Feeling Sick?</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <input
          type="text"
          name="symptoms"
          placeholder="Symptoms (e.g., Shakiness)"
          value={sugarData.symptoms}
          onChange={handleChange}
          style={styles.input}
        />

        <textarea
          name="notes"
          placeholder="Additional notes..."
          value={sugarData.notes}
          onChange={handleChange}
          style={styles.textarea}
        />

        <button onClick={handleSubmit} style={styles.button}>
          Submit
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: "20px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
  },
  heading: {
    color: "#006400",
    fontSize: 26,
    marginBottom: 20,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "#e6f2e6",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  infoHeading: {
    fontSize: 18,
    color: "#004d00",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#2b2b2b",
    lineHeight: 1.4,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    height: 80,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    boxSizing: "border-box",
    resize: "vertical",
  },
  button: {
    width: "100%",
    padding: 12,
    backgroundColor: "#006400",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 18,
    cursor: "pointer",
  },
};

export default BloodSugarTracker;
