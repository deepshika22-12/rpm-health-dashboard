// src/BMIPage.js
import React, { useState } from "react";

const BMIPage = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [bmi, setBMI] = useState(null);
  const [category, setCategory] = useState("");

  const calculateBMI = () => {
    let h = parseFloat(height);
    let w = parseFloat(weight);

    if (heightUnit === "inches") h = h * 2.54;
    if (weightUnit === "lbs") w = w * 0.453592;

    const heightInMeters = h / 100;
    const bmiValue = w / (heightInMeters * heightInMeters);
    setBMI(bmiValue.toFixed(1));
    setCategory(getBMICategory(bmiValue));
  };

  const getBMICategory = (value) => {
    if (value < 18.5) return "Underweight";
    else if (value >= 18.5 && value <= 24.9) return "Normal";
    else if (value >= 25 && value <= 29.9) return "Overweight";
    else return "Obese";
  };

  const categoryMessage = {
    Underweight: "Your BMI is below normal. It's recommended to consult a doctor.",
    Normal: "Great! Your BMI is within the optimal range.",
    Overweight: "You are in the overweight range. Consider consulting a healthcare provider.",
    Obese: "Your BMI is in the obese range. It's advised to seek medical guidance.",
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.pageTitle}>BMI Overview</h2>
      <div style={styles.bigCard}>
        {/* 1. BMI Display */}
        <div style={styles.innerCard}>
          <h3 style={styles.cardHeading}>Track Your BMI</h3>
          <p style={styles.description}>
            Your BMI reflects your overall body weight relative to your height.
            Maintaining a healthy BMI (18.5–24.9) can help reduce health risks.
          </p>
          {bmi && (
            <div>
              <p style={styles.bmiLabel}>Current BMI:</p>
              <p style={styles.bmiValue}>{bmi}</p>
              <p style={styles.bmiCategory}>Category: {category}</p>
              <p style={styles.bmiAdvice}>{categoryMessage[category]}</p>
            </div>
          )}
        </div>

        {/* 2. BMI Calculator */}
        <div style={styles.innerCard}>
          <h3 style={styles.cardHeading}>BMI Calculator</h3>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Height</label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              style={styles.input}
              placeholder="Enter height"
            />
            <div style={styles.unitButtons}>
              <button
                onClick={() => setHeightUnit("cm")}
                style={heightUnit === "cm" ? styles.unitActive : styles.unit}
              >
                cm
              </button>
              <button
                onClick={() => setHeightUnit("inches")}
                style={heightUnit === "inches" ? styles.unitActive : styles.unit}
              >
                inches
              </button>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Weight</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              style={styles.input}
              placeholder="Enter weight"
            />
            <div style={styles.unitButtons}>
              <button
                onClick={() => setWeightUnit("kg")}
                style={weightUnit === "kg" ? styles.unitActive : styles.unit}
              >
                kg
              </button>
              <button
                onClick={() => setWeightUnit("lbs")}
                style={weightUnit === "lbs" ? styles.unitActive : styles.unit}
              >
                lbs
              </button>
            </div>
          </div>

          <button style={styles.calculateButton} onClick={calculateBMI}>
            Calculate BMI
          </button>
        </div>

        {/* 3. What is BMI */}
        <div style={styles.innerCard}>
          <h3 style={styles.cardHeading}>What is BMI?</h3>
          <p style={styles.description}>
            Body Mass Index (BMI) is a simple calculation using a person's
            height and weight. It's used to screen for weight categories that
            may lead to health problems.
          </p>
          <ul style={styles.bmiTable}>
            <li>&lt; 18.5: Underweight</li>
            <li>18.5 – 24.9: Normal</li>
            <li>25 – 29.9: Overweight</li>
            <li>30 and above: Obese</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#FAF9F6",
    minHeight: "100vh",
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
  },
  pageTitle: {
    color: "#006400",
    textAlign: "center",
    fontSize: "28px",
    marginBottom: "30px",
  },
  bigCard: {
    backgroundColor: "#E6F2E6",
    borderRadius: "12px",
    padding: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  innerCard: {
    backgroundColor: "#F9F9F9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.05)",
  },
  cardHeading: {
    color: "#006400",
    fontSize: "20px",
    marginBottom: "10px",
  },
  description: {
    color: "#2B2B2B",
    fontSize: "14px",
    marginBottom: "15px",
  },
  bmiLabel: {
    color: "#2B2B2B",
    fontSize: "16px",
  },
  bmiValue: {
    color: "#006400",
    fontSize: "26px",
    fontWeight: "bold",
  },
  bmiCategory: {
    color: "#006400",
    fontWeight: "bold",
    fontSize: "18px",
  },
  bmiAdvice: {
    color: "#2B2B2B",
    fontStyle: "italic",
    marginTop: "8px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    color: "#2B2B2B",
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "8px",
  },
  unitButtons: {
    display: "flex",
    gap: "10px",
  },
  unit: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#e0e0e0",
    color: "#2B2B2B",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  unitActive: {
    flex: 1,
    padding: "8px",
    backgroundColor: "#006400",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  calculateButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#006400",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  bmiTable: {
    listStyleType: "none",
    padding: 0,
    color: "#2B2B2B",
    fontSize: "14px",
    marginTop: "10px",
  },
};

export default BMIPage;

