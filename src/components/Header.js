// src/components/Header.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div style={styles.header}>
      <div style={styles.left}>
        <img src="/logo.png" alt="logo" style={styles.logo} />
        <h2 style={styles.title}>MyEasyPharma</h2>
      </div>
      <div style={styles.right}>
        <img
          src="https://i.ibb.co/1rmT9cY/default-avatar.png"
          alt="Avatar"
          style={styles.avatar}
          onClick={handleProfileClick}
          title="View Profile"
        />
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#006400",
    padding: "10px 20px",
    color: "#fff",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: "40px",
    height: "40px",
    marginRight: "10px",
  },
  title: {
    fontSize: "22px",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
    border: "2px solid white",
  },
  logout: {
    background: "#fff",
    color: "#006400",
    border: "none",
    padding: "6px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default Header;
