import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./pages/MainPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { UserPage } from "./pages/UserPage.jsx";
import { BloodPressurePage } from "./pages/recordType/BloodPressurePage.jsx";
import { BloodTestPage } from "./pages/recordType/BloodTestPage.jsx";
import { VisitsPage } from "./pages/recordType/VisitsPage.jsx";
import { AdminPage } from "./pages/AdminPage.jsx";
import { ContextWrapper } from './context/GlobalContext.jsx';

function App() {
  return (
    <ContextWrapper>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="user" element={<UserPage />} />
        <Route path="blood-pressure" element={<BloodPressurePage />} />
        <Route path="blood-test" element={<BloodTestPage />} />
        <Route path="visits" element={<VisitsPage />} />
        <Route path="users" element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
  </ContextWrapper>
  )
}

export default App
