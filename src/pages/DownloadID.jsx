import React, { useState } from "react";
import "./DownloadID.css";

const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

const DownloadID = () => {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setError("");

    if (!mobile || mobile.length !== 10) {
      setError("சரியான மொபைல் எண்ணை உள்ளிடவும்");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${BACKEND_URL}/admin/idcard/${mobile}`,
        {
          method: "GET",
          headers: {
            Accept: "application/pdf",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        setError(data?.detail || "ID card கிடைக்கவில்லை");
        setLoading(false);
        return;
      }

      const blob = await response.blob();

      // Safety check
      if (blob.type !== "application/pdf") {
        setError("Invalid PDF response");
        setLoading(false);
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `${mobile}_ID_CARD.pdf`;
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setLoading(false);
    } catch (err) {
      setError("Server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="download-container">
      <h2>அடையாள அட்டை பதிவிறக்கம்</h2>

      <div className="download-box">
        <input
          type="text"
          placeholder="மொபைல் எண்ணை உள்ளிடவும்"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          maxLength="10"
        />

        <br />
        <br />

        <button onClick={handleDownload} disabled={loading}>
          {loading ? "பதிவிறக்கம் நடைபெறுகிறது..." : "அடையாள அட்டை பதிவிறக்கம்"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default DownloadID;
