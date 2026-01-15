import React, { useState } from "react";
import "./DownloadID.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

const DownloadID = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setError("");

    if (!mobile) {
      setError("மொபைல் எண்ணை உள்ளிடவும்");
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/admin/idcard/${mobile}`
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data.detail || "ID card not found");
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${mobile}_ID_Card.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="download-container">
      <h2>அடையாள அட்டை பதிவிறக்கம்</h2>

      <div className="download-box">
        <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          maxLength="10"
        />

        <br /><br />

        <button onClick={handleDownload}>
          அடையாள அட்டை பதிவிறக்கம்
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default DownloadID;
