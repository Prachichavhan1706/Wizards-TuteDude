import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [role, setRole] = useState("vendor"); // or 'supplier'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Only this async handler is needed to perform real Firebase login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  // Styles
  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(120deg, #f9fafc 0%, #d1f1e1 60%, #fdffe7 100%)",
  };

  const homeSectionStyle = {
    flex: 1,
    padding: "60px 40px",
    color: "#219150",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderRight: "2px solid #d1f1e1",
  };

  const loginSectionStyle = {
    flex: 1,
    padding: "60px 40px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 0 16px rgb(33 97 72 / 0.15)",
  };

  const buttonStyle = {
    padding: "12px 28px",
    marginTop: "20px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#219150",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    transition: "background-color 0.25s ease",
  };

  const linkContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "16px",
    fontSize: "0.9rem",
    color: "#555",
  };

  const linkStyle = {
    color: "#219150",
    textDecoration: "none",
    fontWeight: "600",
  };

  return (
    <div style={containerStyle}>
      {/* Home Section */}
      <div style={homeSectionStyle}>
        <h1 style={{ fontSize: "2.8rem", marginBottom: "16px", fontWeight: 700 }}>
          Welcome to Street Sourcing Portal
        </h1>
        <p style={{ fontSize: "1.15rem", lineHeight: "1.6", maxWidth: "380px" }}>
          Empowering Indian street food vendors and suppliers with a trusted, efficient, and transparent raw material marketplace.
        </p>

        {/* Feature Highlights */}
        <ul style={{ marginTop: "36px", fontSize: "1rem", color: "#2c6628", maxWidth: "400px" }}>
          <li>🔍 Find and compare trusted raw material suppliers</li>
          <li>🤝 Group order for best prices</li>
          <li>⭐ Real vendor reviews & ratings</li>
          <li>🔬 Book quality checks and view certificates</li>
          <li>📦 Track your orders easily</li>
        </ul>
      </div>

      {/* Login Section */}
      <div style={loginSectionStyle}>
        <h2 style={{ color: "#219150", marginBottom: "24px" }}>Login</h2>

        {/* Role selection */}
        <label style={{ marginBottom: "12px", fontWeight: "600", color: "#333" }}>
          I am a:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              marginLeft: "10px",
              padding: "6px 10px",
              fontSize: "1rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="vendor">Vendor</option>
            <option value="supplier">Supplier</option>
          </select>
        </label>

        {/* Login form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              marginBottom: "15px",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{
              marginBottom: "15px",
              padding: "10px",
              fontSize: "1rem",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>

        {/* Extra links */}
        <div style={linkContainerStyle}>
          <Link to="/register" style={linkStyle}>
            Don't have an account? Register
          </Link>
          <Link to="/forgot-password" style={linkStyle}>
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
