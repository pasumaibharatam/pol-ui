import {Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

import Register from "./pages/Register"
import DownloadID from "./pages/DownloadID";

import Footer from "./components/Footer";

import AdminDashboard from "./pages/AdminDashboard";
import DistrictSecretaries from "./components/DistrictSecretaries";

function App() {
  useEffect(() => {
  const checkVersion = async () => {
    const res = await fetch("/version.json", { cache: "no-store" });
    const data = await res.json();

    const current = localStorage.getItem("app_version");
    if (current && current !== data.version) {
      localStorage.setItem("app_version", data.version);
      window.location.reload();
    }

    if (!current) {
      localStorage.setItem("app_version", data.version);
    }
  };

  checkVersion();
  const interval = setInterval(checkVersion, 30000);
  return () => clearInterval(interval);
}, []);

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
