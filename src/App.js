import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./pages/Register";
import DownloadID from "./pages/DownloadID";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import DistrictSecretaries from "./components/DistrictSecretaries";
import Footer from "./components/Footer";

function App() {
  // ✅ Admin token state
  const [adminToken, setAdminToken] = useState(null);

  // ✅ Restore admin session on refresh (IMPORTANT)
  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setAdminToken(savedToken);
    }
  }, []);

  // ✅ Logout handler
  const logoutAdmin = () => {
    localStorage.removeItem("admin_token");
    setAdminToken(null);
  };

  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/download-id" element={<DownloadID />} />
        <Route
          path="/district-secretaries"
          element={<DistrictSecretaries />}
        />

        {/* 🔐 Admin Route */}
        <Route
          path="/admin"
          element={
            adminToken ? (
              <AdminDashboard token={adminToken} onLogout={logoutAdmin} />
            ) : (
              <AdminLogin setToken={setAdminToken} />
            )
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
