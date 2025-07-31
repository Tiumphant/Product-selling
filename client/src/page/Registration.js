import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './reg.css';
export default function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const Api = "http://localhost:8000/api/registration";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password || !contact || !role) {
      setError("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(Api, {
        firstName,
        lastName,
        email,
        password,
        contact,
        role
      });

      if (response.data?.result === "done") {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/login");
      } else {
        setError("Registration failed!");
      }
    } catch (err) {
      console.error("Registration error", err.message);
      setError("Registration failed");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center text-secondary">Registration Form</h1>
      {error && <p className="text-danger">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name: <input type="text"  placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:<input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />

        <label>
          Password:<input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contact Number:<input type="tel" placeholder="Enter your contact number"  value={contact} onChange={(e) => setContact(e.target.value)}
          />
        </label>
        <br />
        Select Role: <select name="" id="" value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="">Select role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <br />

        <button type="submit">Submit</button>
        <br />
        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
}
