import React, { useEffect, useState } from "react";
import "./DistrictSecretaries.css";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const DistrictSecretaries = () => {
  const [secretaries, setSecretaries] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/district-secretaries`)
      .then(res => res.json())
      .then(data => setSecretaries(data))
      .catch(err => {
        console.error("API ERROR", err);
        setSecretaries([]);
      });
  }, []);

  return (
    <div className="party-page">
      <div className="party-header">
        <h1>பசுமை பாரத மக்கள் கட்சி</h1>
        <p>மாவட்ட செயலாளர்கள்</p>
      </div>

      <div className="party-grid">
        {secretaries.map((sec, i) => (
          <div className="party-card" key={i}>
            <img src={sec.photo} alt={sec.name} className="party-photo" />
            <h3>{sec.name}</h3>
            <span>{sec.district} மாவட்டம்</span>
            <p>{sec.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DistrictSecretaries;
