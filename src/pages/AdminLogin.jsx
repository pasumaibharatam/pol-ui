const AdminLogin = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://pol-bk.onrender.com/admin/login", {
        method: "POST",
        body: new URLSearchParams({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.access_token); // ✅ sets the token in App.js state
      } else {
        alert(data.detail);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};
