import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //create a navigation fn variable
  const navigation = useNavigate();

  const handleLogin = async (e) => {
    // in e we get forms property
    e.preventDefault();
    setError("");
    console.log("username:::", username);
    console.log("password:::", password);
    try {
      const response = await api.post("login/", { username, password });
      console.log("response from server", response.data);
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      navigation("/dashboard");
    } catch (err) {
      console.log("ERROR::::", err);
      console.log("Status:", err.response?.status);
      console.log("Message:", err.response?.data?.message);
      setError(err.response?.data?.message || "Login failed");
      // setError("Invalid username or password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card">
        <div className="card-header">
          <h3>Please Login</h3>
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-3 ">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              ></input>
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
            </div>
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;