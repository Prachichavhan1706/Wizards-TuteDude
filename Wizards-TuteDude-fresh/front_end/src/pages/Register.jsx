import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Register() {
  const [role, setRole] = useState("vendor"); // or 'supplier'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Create user with Firebase Auth
      await createUserWithEmailAndPassword(auth, email, password);
      // Optionally, save user profile info (name, role) in Firestore here

      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert(err.message);
      console.error("Registration error:", err);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Left "Home-like" Section */}
      <div style={leftSectionStyle}>
        <h1 style={{ fontSize: "2.8rem", marginBottom: "24px", fontWeight: "700" }}>
          Join Street Sourcing Portal
        </h1>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.6", maxWidth: "400px" }}>
          Create an account to connect with trusted suppliers, place group orders for better prices, 
          and book instant quality checks — designed exclusively for street food vendors and suppliers.
        </p>
        <ul
          style={{
            marginTop: "36px",
            fontSize: "1rem",
            color: "#2c6628",
            maxWidth: "400px",
            listStyleType: "disc",
            paddingLeft: "20px",
          }}
        >
          <li>Trusted suppliers & transparent pricing</li>
          <li>Community ratings & verified reviews</li>
          <li>Easy order tracking and management</li>
          <li>On-demand quality assurance test booking</li>
          <li>Multilingual support and vendor guidance</li>
        </ul>
        <p style={{ marginTop: "32px", fontSize: "1rem", color: "#444" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#219150", textDecoration: "underline" }}>
            Login here
          </Link>
        </p>
      </div>

      {/* Right Registration Form Section */}
      <div style={rightSectionStyle}>
        <h2 style={{ color: "#219150", marginBottom: "24px" }}>Register</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          {/* Role */}
          <label style={{ marginBottom: "12px", fontWeight: "600", color: "#444" }}>
            I am a:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ ...inputStyle, marginTop: "8px" }}
            >
              <option value="vendor">Vendor</option>
              <option value="supplier">Supplier</option>
            </select>
          </label>

          {/* Full Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
          />

          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            style={inputStyle}
          />

          {/* Submit Button */}
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}


// Style objects (keep outside component)
const containerStyle = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  background: "linear-gradient(120deg, #f9fafc 0%, #d1f1e1 60%, #fdffe7 100%)",
};

const leftSectionStyle = {
  flex: 1,
  padding: "60px 40px",
  color: "#219150",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRight: "2px solid #d1f1e1",
};

const rightSectionStyle = {
  flex: 1,
  padding: "60px 40px",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: "0 0 16px rgb(33 97 72 / 0.15)",
};

const inputStyle = {
  padding: "12px",
  fontSize: "1rem",
  borderRadius: "6px",
  border: "1px solid #ccc",
  marginBottom: "16px",
};

const buttonStyle = {
  padding: "14px",
  fontSize: "1.1rem",
  fontWeight: "bold",
  cursor: "pointer",
  backgroundColor: "#219150",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  transition: "background-color 0.3s ease",
};

const buttonHoverStyle = {
  backgroundColor: "#1a7539",
};
