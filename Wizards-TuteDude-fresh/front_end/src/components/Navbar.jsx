import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import your Auth hook

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/suppliers?search=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Styles
  const navContainer = {
    backgroundColor: "#219150",
    color: "white",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const navLinksRow = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "12px 24px",
    fontWeight: "600",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    transition: "background-color 0.25s ease",
  };

  const activeStyle = {
    backgroundColor: "#1a7d32",
  };

  const searchRow = {
    padding: "12px 24px",
    borderTop: "1px solid #1a7d32",
    display: "flex",
    justifyContent: "center", // center horizontally
    backgroundColor: "#237a3e",
  };

  const inputStyle = {
    padding: "8px 12px",
    borderRadius: "6px 0 0 6px",
    border: "none",
    fontSize: "1rem",
    width: "300px",
    outline: "none",
  };

  const buttonStyle = {
    padding: "8px 20px",
    borderRadius: "0 6px 6px 0",
    backgroundColor: "#1a7d32",
    color: "white",
    border: "none",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "1rem",
  };

  const spacerFlex = { flexGrow: 1 }; // to push logout button right

  return (
    <nav style={navContainer}>
      {/* Navigation Links Row */}
      <div style={navLinksRow}>
        <NavLink to="/" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)} end>
          Home
        </NavLink>

        {!user && (
          <>
            <NavLink to="/login" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
              Login
            </NavLink>
            <NavLink to="/register" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
              Register
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to="/dashboard" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
              Dashboard
            </NavLink>
            <NavLink to="/suppliers" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
              Suppliers
            </NavLink>
            <NavLink to="/orders" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
              Orders
            </NavLink>
            <NavLink to="/quality-check" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
              Quality Check
            </NavLink>
            <NavLink to="/profile" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
              Profile
            </NavLink>

            <div style={spacerFlex} />
            <span style={{ padding: "8px 16px" }}>
              {user.email || user.displayName || "User"}
            </span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#1a7d32",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 16px",
                cursor: "pointer",
                fontWeight: "600",
                marginLeft: "8px",
              }}
            >
              Logout
            </button>
          </>
        )}

        {/* If no user and you want to show /search too: */}
        {!user && (
          <NavLink to="/search" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
            Search
          </NavLink>
        )}

        {/* Optional: Show Search for all */}
        {user && (
          <NavLink to="/search" style={({ isActive }) => (isActive ? { ...linkStyle, ...activeStyle } : linkStyle)}>
            Search
          </NavLink>
        )}
      </div>

      {/* Search Bar Row */}
      <div style={searchRow}>
        <form onSubmit={handleSearch} role="search" aria-label="Search Vendors or Suppliers" style={{ display: "flex" }}>
          <input
            type="search"
            aria-label="Search vendors or suppliers"
            placeholder="Search vendors or suppliers…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle} aria-label="Submit search">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}
