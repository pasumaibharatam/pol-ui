import {Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

import Register from "./pages/Register"
import DownloadID from "./pages/DownloadID";

import Footer from "./components/Footer";

import AdminDashboard from "./pages/AdminDashboard";
import DistrictSecretaries from "./components/DistrictSecretaries";

function App() {
  return (
    <>
      <Navbar />
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
         <Route path="/download-id" element={<DownloadID />} />
         <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/district-secretaries" element={<DistrictSecretaries />}
        />
      </Routes>
   
      <Footer />
    </>
  );
}

export default App;
