// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./LoginPage";
import Welcome from "./Welcome";
import Dashboard from "./Dashboard";
import UserDetailsForm from "./UserDetailsForm";
import BMICalculator from "./BMICalculator";
import MoodTracker from "./MoodTracker";
import SleepTracker from "./SleepTracker";
import ExerciseTracker from "./ExerciseTracker";
import BPTracker from "./BPTracker";
import BloodSugarTracker from "./BloodSugarTracker";
import CholesterolTracker from "./CholesterolTracker";
import HeartRateTracker from "./HeartRateTracker";
import CalorieCounter from "./components/CalorieCounter";
import ActivityLevelSelector from "./components/ActivityLevelSelector";
import HaemoglobinTracker from "./components/HaemoglobinTracker";
import AnxietyTracker from "./components/AnxietyTracker";
import AIHealthAssistant from "./components/AIHealthAssistant";

import AnalyticsPage from "./pages/Analytics";
import Home from "./pages/Home"; // Make sure Home.js exists in pages/

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<Home />} /> {/* Home page route */}
        <Route path="/analytics" element={<AnalyticsPage />} /> {/* Analytics page */}
        <Route path="/profile" element={<UserDetailsForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bmi" element={<BMICalculator />} />
        <Route path="/mood" element={<MoodTracker />} />
        <Route path="/sleep" element={<SleepTracker />} />
        <Route path="/exercise" element={<ExerciseTracker />} />
        <Route path="/bp" element={<BPTracker />} />
        <Route path="/bloodsugar" element={<BloodSugarTracker />} />
        <Route path="/cholesterol" element={<CholesterolTracker />} />
        <Route path="/heartrate" element={<HeartRateTracker />} />
        <Route path="/calories" element={<CalorieCounter />} />
        <Route path="/activity" element={<ActivityLevelSelector />} />
        <Route path="/haemoglobin" element={<HaemoglobinTracker />} />
        <Route path="/anxiety" element={<AnxietyTracker />} />
        <Route path="/chatbot" element={<AIHealthAssistant />} />

        {/* Fallback 404 route */}
        <Route path="*" element={<div style={{ padding: 20 }}>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
