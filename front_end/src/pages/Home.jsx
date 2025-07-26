import React from "react";
import { Link } from "react-router-dom";

const heroImage =
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80";

export default function Home() {
  // Define an array of features with titles, texts, icons, background colors, and target URLs
  const features = [
    {
      title: "Compare Trusted Suppliers",
      text: "Transparent prices, verified reviews, and real vendor feedback empower every sourcing decision.",
      icon: "👥",
      bg: "#dfffea",
      link: "/suppliers", // Pointing to Suppliers listing page
    },
    {
      title: "Group Order for Savings",
      text: "Join hands with nearby vendors for unbeatable wholesale power and reduced costs.",
      icon: "🤝",
      bg: "#e4eaff",
      link: "/orders", // Could link to orders or group ordering page
    },
    {
      title: "Live Price Tracking",
      text: "Catch flash deals and low prices from verified suppliers in real time.",
      icon: "🛒",
      bg: "#fffbe8",
      link: "/compare/1", // Example compare product page (pass actual product ID)
    },
    {
      title: "Book Quality Checks",
      text: "Request rapid, on-site raw material tests and display digital certificates for trust and compliance.",
      icon: "🔬",
      bg: "#ffe7f7",
      link: "/quality-check", // Quality check booking page
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #d1f1e1 60%, #fdffe7 100%)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#1d3d29",
        padding: "0",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          padding: "0",
          background: "#fff",
          boxShadow: "0 4px 28px rgba(34,139,34,0.05)",
        }}
      >
        <img
          src={heroImage}
          alt="Street vendor"
          loading="lazy"
          style={{
            width: "50vw",
            minWidth: "320px",
            maxWidth: "520px",
            minHeight: "340px",
            objectFit: "cover",
            borderTopRightRadius: "36px",
            borderBottomRightRadius: "8px",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
            boxShadow: "0 6px 32px rgba(41,127,185,0.13)",
            background: "#e7fbe7",
            margin: 0,
          }}
        />
        <div
          style={{
            flex: 1,
            minWidth: "280px",
            maxWidth: "480px",
            padding: "60px 36px",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            background: "none",
          }}
        >
          <h1
            style={{
              color: "#219150",
              fontSize: "2.6rem",
              fontWeight: "bold",
              marginBottom: 12,
              textShadow: "0 1px 0 #e2ffeb",
            }}
          >
            Discover. Connect. Grow.
          </h1>
          <p
            style={{
              fontSize: "1.18rem",
              color: "#444",
              fontWeight: "500",
              lineHeight: "1.58",
              maxWidth: "360px",
              marginBottom: 28,
            }}
          >
            India's first modern platform for street food vendors and suppliers—trusted sourcing, real reviews, and instant price comparison all in one place.
          </p>
          <div style={{ display: "flex", gap: "20px", marginBottom: "14px" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "linear-gradient(94deg,#219150 80%,#21804f)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.07rem",
                  border: "none",
                  borderRadius: "22px",
                  padding: "12px 38px",
                  boxShadow: "0 2px 10px #0002",
                  cursor: "pointer",
                  letterSpacing: ".01em",
                  transition: "transform 120ms",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.97)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                aria-label="Login"
              >
                Login
              </button>
            </Link>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "linear-gradient(94deg,#2980b9 80%,#2759ac)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1.07rem",
                  border: "none",
                  borderRadius: "22px",
                  padding: "12px 38px",
                  boxShadow: "0 2px 10px #0002",
                  cursor: "pointer",
                  letterSpacing: ".01em",
                  transition: "transform 120ms",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.97)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                aria-label="Register"
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section
        style={{
          maxWidth: "1160px",
          margin: "44px auto 32px auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "38px",
        }}
      >
        {features.map(({ title, text, icon, bg, link }, idx) => (
          <Link
            key={idx}
            to={link}
            style={{
              textDecoration: "none",
              flex: "1 1 260px",
              minWidth: "220px",
              maxWidth: "320px",
              background: bg,
              borderRadius: "20px",
              padding: "28px 24px",
              boxShadow: "0 3px 16px rgba(88,130,97, 0.07)",
              margin: "0",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              alignItems: "center",
              transition: "transform 140ms cubic-bezier(0.33,1,0.68,1)",
              fontWeight: 500,
              color: "#1d3d29", // Make sure text in link is visible
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            aria-label={`Navigate to ${title}`}
          >
            <div style={{ fontSize: "2.5rem" }}>{icon}</div>
            <h3 style={{ margin: "6px 0", fontWeight: 700 }}>{title}</h3>
            <p style={{ fontSize: "1rem", color: "#2d3d16" }}>{text}</p>
          </Link>
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "22px 0",
          color: "#777",
          fontWeight: 500,
          fontSize: "1.05rem",
          borderTop: "1px solid #eee",
        }}
      >
        &copy; {new Date().getFullYear()} Street Sourcing Platform &mdash; Empowering Local Vendors
      </footer>
    </div>
  );
}
