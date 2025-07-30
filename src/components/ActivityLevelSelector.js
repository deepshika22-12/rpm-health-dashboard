import React, { useState } from "react";

const ActivityLevelSelector = () => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [recommendedCalories, setRecommendedCalories] = useState(null);

  const activityLevels = [
    {
      level: "Sedentary",
      description: "Little or no physical activity (e.g., desk job, mostly sitting)",
      calories: 1800,
    },
    {
      level: "Moderately Active",
      description: "Light daily activity or light exercise 1–3 days/week",
      calories: 2200,
    },
    {
      level: "Active",
      description: "Physically demanding lifestyle or daily exercise",
      calories: 2500,
    },
  ];

  const handleSelect = (level) => {
    setSelectedLevel(level.level);
    setRecommendedCalories(level.calories);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.mainBox}>
        <h2 style={styles.heading}>🏃‍♀️ Activity Level</h2>

        <div style={styles.boxContainer}>
          {activityLevels.map((level) => (
            <div
              key={level.level}
              onClick={() => handleSelect(level)}
              style={{
                ...styles.levelBox,
                border:
                  selectedLevel === level.level ? "3px solid #006400" : "1px solid #ccc",
              }}
            >
              <h3>{level.level}</h3>
              <p>{level.description}</p>
            </div>
          ))}
        </div>

        <div style={styles.resultBox}>
          {selectedLevel ? (
            <>
              <p><strong>You selected:</strong> {selectedLevel}</p>
              <p><strong>Recommended calorie intake:</strong> {recommendedCalories} kcal/day</p>
            </>
          ) : (
            <p>Click a box to select your activity level</p>
          )}
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
    borderRadius: "12px",
    padding: "25px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    maxWidth: "800px",
    margin: "auto",
  },
  heading: {
    textAlign: "center",
    color: "#006400",
    marginBottom: "20px",
  },
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  levelBox: {
    backgroundColor: "#E6F2E6",
    borderRadius: "10px",
    padding: "15px",
    cursor: "pointer",
    transition: "0.2s",
  },
  resultBox: {
    marginTop: "20px",
    backgroundColor: "#fffbe6",
    borderLeft: "5px solid #ffd700",
    padding: "15px",
    borderRadius: "8px",
    color: "#333",
  },
};

export default ActivityLevelSelector;
