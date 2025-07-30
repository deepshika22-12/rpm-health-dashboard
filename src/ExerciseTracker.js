// src/ExerciseTracker.js
import React, { useState } from "react";

const defaultTypes = [
  "Walking 🚶‍♀️",
  "Running 🏃‍♂️",
  "Yoga 🧘",
  "Strength training 🏋️",
  "Cycling 🚴‍♀️",
  "Swimming 🏊",
];

const intensityLevels = [
  { label: "Low", emoji: "😌" },
  { label: "Moderate", emoji: "😅" },
  { label: "High", emoji: "🥵" },
];

const moodsAfter = ["Energized", "Tired", "Relaxed", "Happy"];

function ExerciseTracker() {
  const [type, setType] = useState("");
  const [customType, setCustomType] = useState("");
  const [duration, setDuration] = useState("");
  const [intensity, setIntensity] = useState("");
  const [calories, setCalories] = useState("");
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");

  const addCustomType = () => {
    if (customType.trim()) {
      setType(customType.trim());
      setCustomType("");
    }
  };

  const handleSubmit = () => {
    alert(`Exercise Log:
Type: ${type}
Duration: ${duration} min
Intensity: ${intensity}
Calories: ${calories}
Mood After: ${mood}
Notes: ${notes || "None"}`);
    // reset
    setType("");
    setCustomType("");
    setDuration("");
    setIntensity("");
    setCalories("");
    setMood("");
    setNotes("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Exercise Tracker</h2>

      <div style={styles.section}>
        <label style={styles.label}>Select or Add Exercise Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Pick one --</option>
          {defaultTypes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <div style={styles.inline}>
          <input
            placeholder="Custom type..."
            value={customType}
            onChange={(e) => setCustomType(e.target.value)}
            style={styles.input}
          />
          <button onClick={addCustomType} style={styles.smallButton}>
            Add
          </button>
        </div>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Duration (minutes)</label>
        <input
          type="number"
          placeholder="e.g. 30"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Intensity Level</label>
        <div style={styles.inline}>
          {intensityLevels.map((lvl) => (
            <button
              key={lvl.label}
              onClick={() => setIntensity(lvl.label)}
              style={{
                ...styles.smallButton,
                ...(intensity === lvl.label ? styles.selectedSmallButton : {}),
              }}
            >
              {lvl.emoji} {lvl.label}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Calories Burned (optional)</label>
        <input
          type="number"
          placeholder="e.g. 200"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Mood After Exercise</label>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={styles.select}
        >
          <option value="">-- Select Mood --</option>
          {moodsAfter.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>

      <div style={styles.section}>
        <label style={styles.label}>Notes</label>
        <textarea
          placeholder="How did it feel?"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={styles.textarea}
        />
      </div>

      <button onClick={handleSubmit} style={styles.submitButton}>
        Save Exercise Log
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "30px auto",
    padding: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 12,
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    color: "#006400",
    textAlign: "center",
    marginBottom: 20,
  },
  section: { marginBottom: 20 },
  label: { display: "block", marginBottom: 6, color: "#2B2B2B", fontWeight: 600 },
  inline: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 },
  select: { width: "100%", padding: 10, borderRadius: 6, fontSize: 16 },
  input: { width: "100%", padding: 10, borderRadius: 6, fontSize: 16 },
  textarea: { width: "100%", minHeight: 80, padding: 10, borderRadius: 6 },
  smallButton: {
    padding: "8px 12px",
    backgroundColor: "#E6F2E6",
    border: "1px solid #006400",
    borderRadius: 6,
    cursor: "pointer",
  },
  selectedSmallButton: {
    backgroundColor: "#006400",
    color: "#fff",
    borderColor: "#004d00",
  },
  submitButton: {
    width: "100%",
    padding: 14,
    backgroundColor: "#006400",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};

export default ExerciseTracker;
