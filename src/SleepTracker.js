// src/SleepTracker.js
import React, { useState, useEffect } from "react";

const sleepQualities = [
  { label: "Good", emoji: "😴", color: "#0f9d58" },
  { label: "Fair", emoji: "😐", color: "#f4b400" },
  { label: "Poor", emoji: "😣", color: "#db4437" },
];

const preSleepActivities = [
  "Used phone",
  "Drank caffeine",
  "Exercised",
  "Meditated",
  "Ate heavy meal",
];

const moodOptions = [
  { label: "Happy", emoji: "😊" },
  { label: "Sad", emoji: "😞" },
  { label: "Calm", emoji: "😌" },
  { label: "Anxious", emoji: "😟" },
  { label: "Tired", emoji: "😴" },
];

function SleepTracker() {
  const [bedTime, setBedTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [napDuration, setNapDuration] = useState(""); // in minutes
  const [totalSleep, setTotalSleep] = useState(null); // in hours
  const [sleepQuality, setSleepQuality] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [moodBeforeSleep, setMoodBeforeSleep] = useState(null);
  const [interruptions, setInterruptions] = useState(0);
  const [notes, setNotes] = useState("");

  // Calculate total sleep duration whenever bed/wake/nap change
  useEffect(() => {
    if (!bedTime || !wakeTime) {
      setTotalSleep(null);
      return;
    }
    const bed = new Date(`1970-01-01T${bedTime}:00`);
    let wake = new Date(`1970-01-01T${wakeTime}:00`);
    // If wake time is before bed time (sleep past midnight)
    if (wake <= bed) wake.setDate(wake.getDate() + 1);

    let diffMs = wake - bed; // milliseconds
    let diffHours = diffMs / (1000 * 60 * 60);

    // subtract nap duration (convert min to hours)
    const napHours = parseFloat(napDuration) / 60 || 0;

    const total = Math.max(0, diffHours - napHours);
    setTotalSleep(total.toFixed(2));
  }, [bedTime, wakeTime, napDuration]);

  // Toggle pre-sleep activities
  const toggleActivity = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  // Submit handler
  const handleSubmit = () => {
    alert(`Sleep Log:
Bedtime: ${bedTime}
Wake time: ${wakeTime}
Nap duration: ${napDuration || "0"} minutes
Total sleep (excluding nap): ${totalSleep || "N/A"} hours
Sleep quality: ${sleepQuality ? sleepQuality.label : "Not selected"}
Pre-sleep activities: ${
      selectedActivities.length > 0 ? selectedActivities.join(", ") : "None"
    }
Mood before sleep: ${moodBeforeSleep ? moodBeforeSleep.label : "Not selected"}
Sleep interruptions: ${interruptions}
Notes: ${notes || "None"}
`);
    // Reset all fields
    setBedTime("");
    setWakeTime("");
    setNapDuration("");
    setTotalSleep(null);
    setSleepQuality(null);
    setSelectedActivities([]);
    setMoodBeforeSleep(null);
    setInterruptions(0);
    setNotes("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sleep Tracker</h2>

      {/* Bedtime */}
      <div style={styles.section}>
        <label style={styles.label}>Time Went to Bed</label>
        <input
          type="time"
          value={bedTime}
          onChange={(e) => setBedTime(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Wake time */}
      <div style={styles.section}>
        <label style={styles.label}>Time Woke Up</label>
        <input
          type="time"
          value={wakeTime}
          onChange={(e) => setWakeTime(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Nap duration */}
      <div style={styles.section}>
        <label style={styles.label}>Nap Duration (minutes)</label>
        <input
          type="number"
          min="0"
          max="720"
          placeholder="0"
          value={napDuration}
          onChange={(e) => setNapDuration(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Total sleep duration display */}
      <div style={styles.section}>
        <label style={styles.label}>Total Sleep Duration</label>
        <div style={styles.totalSleep}>
          {totalSleep !== null ? `${totalSleep} hours` : "Please enter times"}
        </div>
      </div>

      {/* Sleep quality */}
      <div style={styles.section}>
        <label style={styles.label}>Sleep Quality</label>
        <div style={styles.qualityGrid}>
          {sleepQualities.map(({ label, emoji, color }) => (
            <div
              key={label}
              onClick={() => setSleepQuality({ label, emoji, color })}
              style={{
                ...styles.qualityCard,
                ...(sleepQuality?.label === label
                  ? { borderColor: color, boxShadow: `0 0 8px ${color}` }
                  : {}),
              }}
              title={label}
            >
              <span style={{ fontSize: 28 }}>{emoji}</span>
              <div style={{ color, fontWeight: "600", marginTop: 6 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-sleep activities */}
      <div style={styles.section}>
        <label style={styles.label}>Pre-Sleep Activities</label>
        <div style={styles.activitiesGrid}>
          {preSleepActivities.map((activity) => {
            const selected = selectedActivities.includes(activity);
            return (
              <div
                key={activity}
                onClick={() => toggleActivity(activity)}
                style={{
                  ...styles.activityCard,
                  ...(selected ? styles.selectedActivityCard : {}),
                }}
                title={activity}
              >
                {activity}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mood before sleep */}
      <div style={styles.section}>
        <label style={styles.label}>Mood Before Sleep</label>
        <div style={styles.moodGrid}>
          {moodOptions.map(({ label, emoji }) => (
            <div
              key={label}
              onClick={() => setMoodBeforeSleep({ label, emoji })}
              style={{
                ...styles.moodCard,
                ...(moodBeforeSleep?.label === label ? styles.selectedMoodCard : {}),
              }}
              title={label}
            >
              <span style={styles.emoji}>{emoji}</span>
              <span style={styles.moodLabel}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sleep interruptions */}
      <div style={styles.section}>
        <label style={styles.label}>Sleep Interruptions (times)</label>
        <input
          type="number"
          min="0"
          max="20"
          value={interruptions}
          onChange={(e) => setInterruptions(Number(e.target.value))}
          style={styles.input}
        />
      </div>

      {/* Notes */}
      <div style={styles.section}>
        <label style={styles.label}>Notes about last night’s sleep</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Anything to note about last night’s sleep?"
          style={styles.textarea}
        />
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} style={styles.submitButton}>
        Save Sleep Log
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 700,
    margin: "30px auto",
    padding: 20,
    backgroundColor: "#F9F9F9", // muted off-white
    borderRadius: 12,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  heading: {
    color: "#006400", // dark green
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  label: {
    display: "block",
    marginBottom: 8,
    fontWeight: "600",
    color: "#2B2B2B",
    fontSize: 16,
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    color: "#2B2B2B",
    boxSizing: "border-box",
  },
  totalSleep: {
    fontSize: 18,
    fontWeight: "600",
    color: "#006400",
  },
  qualityGrid: {
    display: "flex",
    gap: 15,
  },
  qualityCard: {
    cursor: "pointer",
    borderRadius: 12,
    padding: 15,
    width: 100,
    textAlign: "center",
    backgroundColor: "#F0F0F0",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    userSelect: "none",
    transition: "all 0.3s ease",
  },
  activitiesGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  activityCard: {
    padding: "8px 16px",
    backgroundColor: "#F0F0F0",
    borderRadius: 20,
    cursor: "pointer",
    color: "#2B2B2B",
    fontWeight: "600",
    boxShadow: "0 0 3px rgba(0,0,0,0.1)",
    userSelect: "none",
    transition: "all 0.3s ease",
  },
  selectedActivityCard: {
    backgroundColor: "#E6F2E6",
    border: "2px solid #006400",
    color: "#006400",
    boxShadow: "0 0 6px rgba(0, 100, 0, 0.4)",
  },
  moodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 15,
    justifyItems: "center",
  },
  moodCard: {
    cursor: "pointer",
    borderRadius: 12,
    padding: "12px 10px",
    width: 90,
    textAlign: "center",
    backgroundColor: "#F0F0F0",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    userSelect: "none",
    transition: "all 0.3s ease",
  },
  selectedMoodCard: {
    backgroundColor: "#E6F2E6", // Pale Mint
    border: "3px solid #006400", // Dark Green border
    boxShadow: "0 4px 10px rgba(0, 100, 0, 0.3)",
  },
  emoji: {
    fontSize: 32,
    display: "block",
    marginBottom: 6,
    color: "#2B2B2B", // Charcoal
  },
  moodLabel: {
    fontWeight: "600",
    fontSize: 16,
    color: "#2B2B2B", // Charcoal
    display: "block",
  },
  textarea: {
    width: "100%",
    minHeight: 80,
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    color: "#2B2B2B",
    resize: "vertical",
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

export default SleepTracker;
