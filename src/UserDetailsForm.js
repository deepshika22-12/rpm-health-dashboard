// src/UserDetailsForm.js
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const UserDetailsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
        setEditMode(false);
      } else {
        setEditMode(true); // First-time profile
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return alert("User not logged in");

    try {
      await setDoc(doc(db, "users", user.uid), {
        ...formData,
        email: user.email,
        updatedAt: new Date(),
      });
      alert("Profile saved!");
      setEditMode(false);
      navigate("/dashboard");
    } catch (err) {
      alert("Failed to save profile: " + err.message);
    }
  };

  if (isLoading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading profile...</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Profile</h2>

      {!editMode ? (
        <div style={styles.card}>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>DOB:</strong> {formData.dob}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Height:</strong> {formData.height} cm</p>
          <p><strong>Weight:</strong> {formData.weight} kg</p>
          <button style={styles.button} onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>
          <input
            name="height"
            type="number"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            name="weight"
            type="number"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Save Profile</button>
        </form>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FAF9F6",
    minHeight: "100vh",
    padding: "40px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "sans-serif",
  },
  title: {
    color: "#006400",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#E6F2E6",
    padding: "20px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "left",
    boxShadow: "0 0 8px rgba(0,0,0,0.1)",
    color: "#2B2B2B",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#006400",
    color: "#fff",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default UserDetailsForm;




