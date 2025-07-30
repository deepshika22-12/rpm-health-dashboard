// src/BPTracker.js
import React, { useState } from "react";

function BPTracker() {
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [notes, setNotes] = useState("");

  const calculateCategory = () => {
    const sys = Number(systolic), dia = Number(diastolic);
    if (!sys || !dia) return "";
    if (sys < 120 && dia < 80) return "Normal";
    if ((sys < 130 && dia < 80)) return "Elevated";
    if ((sys < 140) || (dia < 90)) return "Hypertension Stage 1";
    if ((sys < 180) || (dia < 120)) return "Hypertension Stage 2";
    return "Hypertensive Crisis";
  };

  const handleSubmit = () => {
    const category = calculateCategory();
    alert(`BP Recorded:
Systolic: ${systolic} mmHg
Diastolic: ${diastolic} mmHg
Category: ${category}
Notes: ${notes || "None"}`);
    setSystolic(""); setDiastolic(""); setNotes("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Blood Pressure Tracker</h2>

      <div style={styles.section}>
        <label style={styles.label}>Systolic (mmHg)</label>
        <input type="number" value={systolic} onChange={(e) => setSystolic(e.target.value)} style={styles.input} />
      </div>
      <div style={styles.section}>
        <label style={styles.label}>Diastolic (mmHg)</label>
        <input type="number" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} style={styles.input} />
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Category</label>
        <div style={styles.category}>{calculateCategory() || "Enter values to see category"}</div>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Notes (optional)</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={styles.textarea} placeholder="Any context? (e.g., after exercise, stress)"/>
      </div>

      <button onClick={handleSubmit} style={styles.submitButton}>Save BP Log</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500, margin: "30px auto", padding: 20,
    backgroundColor: "#F9F9F9", borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)", fontFamily: "sans-serif"
  },
  heading: { color: "#006400", textAlign: "center", marginBottom: 20 },
  section: { marginBottom: 18 },
  label: { display: "block", marginBottom: 6, fontWeight: 600, color: "#2B2B2B" },
  input: { width: "100%", padding: 10, fontSize: 16, borderRadius: 6 },
  textarea: { width: "100%", minHeight: 80, padding: 10, borderRadius: 6 },
  category: { padding: 10, borderRadius: 6, backgroundColor: "#E6F2E6", color: "#006400", fontWeight: 600 },
  submitButton: { width: "100%", padding: 14, backgroundColor: "#006400", color: "#fff", fontWeight: "bold", fontSize: 18, border: "none", borderRadius: 8, cursor: "pointer" }
};

export default BPTracker;
