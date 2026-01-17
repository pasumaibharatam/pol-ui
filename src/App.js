import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./pages/Register";
import DownloadID from "./pages/DownloadID";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import DistrictSecretaries from "./components/DistrictSecretaries";
import Footer from "./components/Footer";

function App() {
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("admin_token")
  );

  const handleLogin = (token) => {
    setAdminToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setAdminToken(null);
  };

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/download-id" element={<DownloadID />} />

        <Route
          path="/admin"
          element={
            adminToken ? (
              <AdminDashboard
                token={adminToken}
                onLogout={handleLogout}
              />
            ) : (
              <AdminLogin onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/district-secretaries"
          element={<DistrictSecretaries />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
