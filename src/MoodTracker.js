// src/MoodTracker.js
import React, { useState } from "react";

const moodOptions = [
  { label: "Happy", emoji: "😊" },
  { label: "Sad", emoji: "😞" },
  { label: "Angry", emoji: "😠" },
  { label: "Calm", emoji: "😌" },
  { label: "Anxious", emoji: "😟" },
  { label: "Excited", emoji: "🤩" },
  { label: "Tired", emoji: "😴" },
  { label: "Stressed", emoji: "😰" },
];

const emojiScale = [
  { emoji: "😢", label: "Bad", color: "#db4437" },    // red
  { emoji: "😐", label: "Medium", color: "#f4b400" },    // yellow
  { emoji: "😄", label: "Good", color: "#0f9d58" },   // green
];

function MoodTracker() {
  // Mood rating (1-10)
  const [rating, setRating] = useState(5);

  // Multi-select mood types
  const [selectedMoods, setSelectedMoods] = useState([]);

  // Custom mood input
  const [customMood, setCustomMood] = useState("");

  // Journal entry with hashtags
  const [journal, setJournal] = useState("");

  // Gratitude prompt
  const [gratitude, setGratitude] = useState("");

  // Auto date/time
  const [dateTime, setDateTime] = useState(new Date());

  // Helper: Get emoji from rating
  const getEmojiByRating = () => {
    if (rating <= 3) return emojiScale[0];
    else if (rating <= 7) return emojiScale[1];
    else return emojiScale[2];
  };

  // Toggle moods for multi-select
  const toggleMood = (mood) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  // Add custom mood on Enter
  const handleCustomMoodKey = (e) => {
    if (e.key === "Enter" && customMood.trim() !== "") {
      if (!selectedMoods.includes(customMood.trim())) {
        setSelectedMoods([...selectedMoods, customMood.trim()]);
      }
      setCustomMood("");
    }
  };

  // Format datetime for display
  const formatDateTime = (dt) =>
    dt.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // Extract hashtags from journal text
  const extractHashtags = (text) => {
    const regex = /#(\w+)/g;
    let matches = [];
    let match;
    while ((match = regex.exec(text))) {
      matches.push(match[1]);
    }
    return matches;
  };

  // Submit handler
  const handleSubmit = () => {
    const hashtags = extractHashtags(journal);
    alert(`Mood Rating: ${rating} (${getEmojiByRating().label})
Selected Moods: ${selectedMoods.join(", ") || "None"}
Custom Journal: ${journal || "None"}
Hashtags: ${hashtags.join(", ") || "None"}
Gratitude: ${gratitude || "None"}
Logged at: ${formatDateTime(dateTime)}
`);
    // Reset all
    setRating(5);
    setSelectedMoods([]);
    setCustomMood("");
    setJournal("");
    setGratitude("");
    setDateTime(new Date());
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Moods and Swings Tracker</h2>
      <p style={styles.datetime}>{formatDateTime(dateTime)}</p>

      {/* Mood Rating Section */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>Mood Rating</h3>
        <div style={styles.emojiRating}>
          <span style={{ fontSize: 40 }}>{getEmojiByRating().emoji}</span>
          <input
            type="range"
            min="1"
            max="10"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={styles.slider}
          />
          <div
            style={{
              color: getEmojiByRating().color,
              fontWeight: "bold",
              minWidth: 60,
              textAlign: "center",
            }}
          >
            {getEmojiByRating().label} ({rating})
          </div>
        </div>
      </div>

      {/* Mood Type Selection */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>Select Your Mood(s)</h3>
        <div style={styles.moodGrid}>
          {moodOptions.map(({ label, emoji }) => {
            const isSelected = selectedMoods.includes(label);
            return (
              <div
                key={label}
                onClick={() => toggleMood(label)}
                style={{
                  ...styles.moodCard,
                  ...(isSelected ? styles.selectedMoodCard : {}),
                }}
                title={label}
              >
                <span style={styles.emoji}>{emoji}</span>
                <span style={styles.moodLabel}>{label}</span>
              </div>
            );
          })}
        </div>
        {/* Custom Mood Input */}
        <input
          type="text"
          placeholder="Add custom mood and press Enter"
          value={customMood}
          onChange={(e) => setCustomMood(e.target.value)}
          onKeyDown={handleCustomMoodKey}
          style={styles.customMoodInput}
        />
      </div>

      {/* Journal Entry */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>Journal Entry / Notes</h3>
        <textarea
          placeholder="Write what caused your mood... (Add #hashtags)"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          style={styles.textarea}
        />
      </div>

      {/* Gratitude Prompt */}
      <div style={styles.section}>
        <h3 style={styles.subheading}>Gratitude Prompt</h3>
        <input
          type="text"
          placeholder="One good thing today..."
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          style={styles.gratitudeInput}
        />
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit} style={styles.submitButton}>
        Submit
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
    marginBottom: 10,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  datetime: {
    color: "#2B2B2B",
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  section: {
    marginBottom: 25,
  },
  subheading: {
    color: "#006400",
    marginBottom: 8,
    fontSize: 20,
  },
  emojiRating: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
  slider: {
    flex: 1,
    cursor: "pointer",
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
  customMoodInput: {
    marginTop: 10,
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
    width: "100%",
    fontSize: 16,
  },
  textarea: {
    width: "100%",
    minHeight: 100,
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    color: "#2B2B2B",
  },
  gratitudeInput: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderRadius: 6,
    border: "1px solid #ccc",
    color: "#2B2B2B",
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

export default MoodTracker;



