// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBCRW5fCZ-bzC_07PcxNyKAag6B3SCVpPs",
  authDomain: "rpm-health.firebaseapp.com",
  projectId: "rpm-health",
  storageBucket: "rpm-health.appspot.com",
  messagingSenderId: "1092272128256",
  appId: "1:1092272128256:web:4565abe1c2f2a6829473e5",
  measurementId: "G-G339LJHD09",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };



