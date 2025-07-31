import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./reg.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const Api = "http://localhost:8000/api/login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !role) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(Api, { email, password, role });
      const user = response.data?.data;

      if (!user || !user.role) {
        setError("Invalid user data.");
        return;
      }
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user.token); 
      if (user.role === "admin") {
        navigate("/Dashbord");
      } else if (user.role === "user") {
        navigate("/UserDashboard");
      } else {
        setError("Invalid role received. Please contact support.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please check credentials and try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center text-secondary">Login Form</h1>
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <br />

        <label>Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-control"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <br />

        <button
          type="submit"
          className="btn btn-primary mt-2"
          disabled={!email || !password || !role}
        >
          Login
        </button>
        <br />
        <Link to="/registration">Don't have an account? Register</Link>
      </form>
    </div>
  );
}

