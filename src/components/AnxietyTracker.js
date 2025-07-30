// src/components/AnxietyTracker.js
import React, { useState, useEffect } from "react";

const STORAGE_KEY = "anxietyEntries";

const AnxietyTracker = () => {
  const [anxietyLevel, setAnxietyLevel] = useState(5);
  const [entries, setEntries] = useState([]);

  // Load saved entries from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setEntries(JSON.parse(saved));
  }, []);

  // Save entries to localStorage whenever entries update
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }, [entries]);

  const getEmojiLabel = (level) => {
    if (level <= 2) return "😌 Calm";
    else if (level <= 4) return "🙂 Mild";
    else if (level <= 6) return "😐 Moderate";
    else if (level <= 8) return "😟 High";
    else return "😱 Severe";
  };

  const handleSubmit = () => {
    const newEntry = {
      id: Date.now(),
      level: anxietyLevel,
      label: getEmojiLabel(anxietyLevel),
      timestamp: new Date().toLocaleString(),
    };
    setEntries([newEntry, ...entries]);
    alert("Anxiety level saved!");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Anxiety Level Tracker</h2>

      {/* Input Box */}
      <div style={styles.box}>
        <h3 style={styles.subHeading}>How anxious do you feel today?</h3>
        <input
          type="range"
          min="0"
          max="10"
          value={anxietyLevel}
          onChange={(e) => setAnxietyLevel(parseInt(e.target.value))}
          style={styles.slider}
        />
        <div style={styles.emojiLabel}>{getEmojiLabel(anxietyLevel)}</div>
        <div style={styles.levelText}>Level: {anxietyLevel} / 10</div>

        <button style={styles.submitBtn} onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {/* Past Entries List */}
      <div style={styles.entriesBox}>
        <h3 style={styles.subHeading}>Past Entries</h3>
        {entries.length === 0 ? (
          <p style={styles.noEntries}>No entries yet.</p>
        ) : (
          <ul style={styles.entriesList}>
            {entries.map(({ id, level, label, timestamp }) => (
              <li key={id} style={styles.entry}>
                <span style={styles.entryEmoji}>{label}</span>
                <span style={styles.entryLevel}>Level: {level}/10</span>
                <span style={styles.entryTime}>{timestamp}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Info Box */}
      <div style={styles.infoBox}>
        <h3 style={styles.subHeading}>What is anxiety?</h3>
        <p style={styles.paragraph}>
          Anxiety is a feeling of worry, nervousness, or unease — often about an event or something with an uncertain outcome. It becomes a concern when it interferes with daily life or feels overwhelming. Tracking anxiety can help you recognize patterns, manage triggers, and seek help when needed.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FAF9F6",
    padding: "20px",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    color: "#006400",
    fontSize: "28px",
    marginBottom: "30px",
  },
  box: {
    backgroundColor: "#E6F2E6",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "25px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  subHeading: {
    color: "#006400",
    fontSize: "20px",
    marginBottom: "15px",
  },
  slider: {
    width: "80%",
    margin: "20px auto",
    display: "block",
  },
  emojiLabel: {
    fontSize: "24px",
    marginTop: "10px",
  },
  levelText: {
    fontSize: "16px",
    color: "#444",
    marginTop: "5px",
    marginBottom: "15px",
  },
  submitBtn: {
    padding: "10px 25px",
    backgroundColor: "#006400",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
  entriesBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "25px",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
  },
  noEntries: {
    color: "#666",
    fontStyle: "italic",
  },
  entriesList: {
    listStyleType: "none",
    paddingLeft: 0,
  },
  entry: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #ddd",
    padding: "8px 0",
    fontSize: "16px",
  },
  entryEmoji: {
    flexBasis: "25%",
  },
  entryLevel: {
    flexBasis: "25%",
    textAlign: "center",
  },
  entryTime: {
    flexBasis: "50%",
    textAlign: "right",
    color: "#888",
    fontSize: "14px",
  },
  infoBox: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
  },
  paragraph: {
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.6",
  },
};

export default AnxietyTracker;

