import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { UserPage } from "./pages/UserPage.jsx";
import { BloodPressurePage } from "./pages/recordType/BloodPressurePage.jsx";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="blood-pressure" element={<BloodPressurePage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
