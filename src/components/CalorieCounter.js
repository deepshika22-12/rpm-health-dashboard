// src/CalorieCounter.js
import React, { useState } from "react";

const foodDatabase = {
  // Breakfast / South Indian
  "idli": 39,
  "dosa": 168,
  "sambar": 50,
  "pongal": 206,
  "upma": 190,
  "poha": 180,
  "vada": 135,
  "uttapam": 180,
  "paratha": 260,
  "chapati": 104,
  "bread": 66,

  // North Indian Meals
  "dal": 120,
  "rajma": 130,
  "chole": 140,
  "paneer butter masala": 320,
  "palak paneer": 280,
  "butter chicken": 430,
  "chicken curry": 250,
  "fish curry": 200,
  "mutton curry": 350,
  "veg biryani": 250,
  "chicken biryani": 300,
  "fried rice": 220,
  "curd rice": 190,
  "lemon rice": 200,
  "jeera rice": 210,
  "plain rice": 130,
  "khichdi": 170,

  // Snacks
  "samosa": 262,
  "pakora": 315,
  "bhel puri": 120,
  "pani puri": 300,
  "sev puri": 150,
  "vada pav": 295,
  "maggi": 205,
  "pav bhaji": 400,
  "cutlet": 180,

  // Fruits
  "banana": 105,
  "apple": 95,
  "orange": 62,
  "mango": 200,
  "grapes": 67,
  "watermelon": 30,
  "papaya": 59,
  "pineapple": 42,
  "pomegranate": 83,
  "guava": 68,

  // Salads / Light foods
  "cucumber": 16,
  "carrot": 25,
  "tomato": 22,
  "lettuce": 15,
  "sprouts": 100,
  "green salad": 80,
  "fruit salad": 120,

  // Beverages
  "milk": 103,
  "buttermilk": 35,
  "lassi": 150,
  "tea": 40,
  "coffee": 60,
  "coconut water": 46,
  "lemon juice": 20,

  // Desserts
  "gulab jamun": 300,
  "jalebi": 150,
  "rasgulla": 186,
  "kheer": 215,
  "ice cream": 207,
  "halwa": 250,

  // Misc
  "egg": 78,
  "boiled egg": 68,
  "omelette": 154,
  "bhindi": 100,
  "aloo curry": 180,
  "brinjal curry": 150,
  "mixed veg": 140,
};

const CalorieCounter = () => {
  const [foodInput, setFoodInput] = useState("");
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

  const handleAddFood = () => {
    const food = foodInput.trim().toLowerCase();

    if (!food) {
      setError("Please enter a food item.");
      return;
    }

    if (!foodDatabase[food]) {
      setError(`"${food}" not found in database. Please try another.`);
      return;
    }

    const calories = foodDatabase[food];
    setEntries([...entries, { food, calories }]);
    setFoodInput("");
    setError("");
  };

  const totalCalories = entries.reduce((acc, item) => acc + item.calories, 0);

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>🍽️ Daily Calorie Tracker</h2>
        <p style={styles.subtext}>
          Enter Indian foods you've eaten today. We'll calculate the total calories.
        </p>

        <div style={styles.inputSection}>
          <input
            type="text"
            placeholder="e.g., dosa, paneer butter masala"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAddFood} style={styles.addBtn}>Add</button>
        </div>
        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.entriesBox}>
          {entries.map((entry, index) => (
            <div key={index} style={styles.entry}>
              <span>{entry.food} 🍴</span>
              <span>{entry.calories} kcal</span>
            </div>
          ))}
        </div>

        <hr />
        <h3 style={styles.total}>🔥 Total Calories: {totalCalories} kcal</h3>
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
  container: {
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    color: "#006400",
    textAlign: "center",
    marginBottom: "10px",
  },
  subtext: {
    textAlign: "center",
    fontSize: "14px",
    marginBottom: "20px",
    color: "#444",
  },
  inputSection: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "15px",
  },
  addBtn: {
    padding: "10px 15px",
    backgroundColor: "#006400",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "5px",
  },
  entriesBox: {
    marginTop: "20px",
    marginBottom: "10px",
  },
  entry: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#E6F2E6",
    padding: "8px 12px",
    borderRadius: "6px",
    marginBottom: "6px",
  },
  total: {
    textAlign: "center",
    color: "#006400",
    marginTop: "20px",
  },
};

export default CalorieCounter;
