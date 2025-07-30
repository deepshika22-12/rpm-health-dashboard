// src/LoginPage.js
import React, { useState } from "react";
import { auth, provider } from "./firebaseConfig";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/user-details");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        alert("Account created!");
        navigate("/user-details");
      } else {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        localStorage.setItem("user", JSON.stringify(userCredential.user));
        alert("Logged in!");
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{isSignup ? "Sign Up" : "Login"}</h2>

      <form onSubmit={handleFormSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={styles.button}>
          {isSignup ? "Create Account" : "Login"}
        </button>
      </form>

      <button onClick={handleGoogleLogin} style={styles.googleButton}>
        Sign in with Google
      </button>

      <p onClick={() => setIsSignup(!isSignup)} style={styles.toggle}>
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Sign up"}
      </p>

      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FAF9F6",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    fontFamily: "sans-serif",
  },
  title: {
    color: "#006400",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "350px",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#006400",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  googleButton: {
    marginTop: "10px",
    backgroundColor: "#db4437",
    padding: "10px",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  toggle: {
    marginTop: "15px",
    color: "#006400",
    cursor: "pointer",
    textDecoration: "underline",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default LoginPage;






