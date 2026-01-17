import { useState } from "react";

export default function AdminLogin({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const res = await fetch("https://your-backend.onrender.com/admin/login", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.detail);
      return;
    }

    setToken(data.access_token); // stored ONLY in memory
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <p style={{color:"red"}}>{error}</p>
    </div>
  );
}
