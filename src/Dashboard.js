// src/Dashboard.js
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

const features = [
  "BMI Calculator",
  "Mood Tracker",
  "Sleep Tracker",
  "Exercise",
  "Blood Pressure",
  "Blood Sugar",
  "Cholesterol",
  "Heart Rate",
  "Calorie Counter",
  "Activity Level",
  "AI Assistant",
  "Anxiety Tracker",
  "Haemoglobin",
  "Analytics",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/");
        return;
      }
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUsername(userData.name || user.email || "User");
        } else {
          setUsername(user.email || "User");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUsername(user.email || "User");
      }
    };

    fetchUserName();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const handleFeatureClick = (feature) => {
    switch (feature) {
      case "BMI Calculator":
        navigate("/bmi");
        break;
      case "Mood Tracker":
        navigate("/mood");
        break;
      case "Sleep Tracker":
        navigate("/sleep");
        break;
      case "Exercise":
        navigate("/exercise");
        break;
      case "Blood Pressure":
        navigate("/bp");
        break;
      case "Blood Sugar":
        navigate("/bloodsugar");
        break;
      case "Cholesterol":
        navigate("/cholesterol");
        break;
      case "Heart Rate":
        navigate("/heartrate");
        break;
      case "Calorie Counter":
        navigate("/calories");
        break;
      case "Activity Level":
        navigate("/activity");
        break;
      case "AI Assistant":
        navigate("/chatbot");
        break;
      case "Anxiety Tracker":
        navigate("/anxiety");
        break;
      case "Haemoglobin":
        navigate("/haemoglobin");
        break;
      case "Analytics":
        navigate("/analytics");
        break;
      default:
        alert(`${feature} is coming soon!`);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logoSection}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h1 style={styles.appTitle}>MyEasyPharma</h1>
        </div>
        <div
          style={styles.profile}
          onClick={handleProfileClick}
          title="View Profile"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            style={styles.profilePic}
          />
        </div>
      </header>

      {/* Welcome message */}
      <h2 style={{ color: "#006400", marginLeft: 20, marginBottom: 20 }}>
        Welcome back, {username}!
      </h2>

      {/* Feature Grid */}
      <div style={styles.grid}>
        {features.map((feature) => (
          <div
            key={feature}
            style={styles.card}
            onClick={() => handleFeatureClick(feature)}
          >
            <span style={styles.cardText}>{feature}</span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div style={styles.logoutWrapper}>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FAF9F6",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "sans-serif",
  },
  header: {
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    borderBottom: "2px solid #ccc",
    marginBottom: "30px",
    borderRadius: "8px",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },
  appTitle: {
    color: "#006400",
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  profile: {
    cursor: "pointer",
  },
  profilePic: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: "2px solid #006400",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "20px",
    padding: "0 10px",
  },
  card: {
    backgroundColor: "#E6F2E6",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  cardText: {
    color: "#006400",
    fontWeight: "600",
    fontSize: "16px",
  },
  logoutWrapper: {
    textAlign: "center",
    marginTop: "40px",
  },
  logoutButton: {
    padding: "10px 20px",
    backgroundColor: "#db4437",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Dashboard;
