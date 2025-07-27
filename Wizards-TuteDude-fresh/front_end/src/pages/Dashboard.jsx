// src/pages/Dashboard.jsx
import React from "react";

// Sample data for demonstration
const recentOrders = [
  { id: 101, product: "Tomato", status: "Delivered", date: "2025-07-25" },
  { id: 102, product: "Onion", status: "Processing", date: "2025-07-28" },
  { id: 103, product: "Potato", status: "Pending", date: "2025-07-30" },
];

const notifications = [
  { id: 1, message: "Your order #102 is being processed.", date: "2025-07-27" },
  { id: 2, message: "New supplier 'Spice World' added in your area.", date: "2025-07-26" },
];

// Badge colors for order status
const statusColors = {
  Delivered: "#28a745",
  Processing: "#17a2b8",
  Pending: "#ffc107",
  Cancelled: "#dc3545",
};

export default function Dashboard() {
  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "900px",
        margin: "40px auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <h2 style={{ color: "#219150", marginBottom: "24px" }}>Dashboard</h2>

      {/* Stats Overview */}
      <section
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "36px",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flex: "1 1 200px",
            backgroundColor: "#eaf8ea",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(32, 128, 32, 0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0, color: "#2c7a2c" }}>Total Orders</h3>
          <p style={{ fontSize: "2.2rem", fontWeight: "700", margin: "8px 0 0" }}>15</p>
        </div>
        <div
          style={{
            flex: "1 1 200px",
            backgroundColor: "#e1f0fb",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(23, 133, 196, 0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0, color: "#165d99" }}>Pending Deliveries</h3>
          <p style={{ fontSize: "2.2rem", fontWeight: "700", margin: "8px 0 0" }}>3</p>
        </div>
        <div
          style={{
            flex: "1 1 200px",
            backgroundColor: "#f9e6ef",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(181, 64, 90, 0.1)",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: 0, color: "#a42a48" }}>New Notifications</h3>
          <p style={{ fontSize: "2.2rem", fontWeight: "700", margin: "8px 0 0" }}>
            {notifications.length}
          </p>
        </div>
      </section>

      {/* Recent Orders */}
      <section style={{ marginBottom: "40px" }}>
        <h3 style={{ borderBottom: "2px solid #219150", paddingBottom: "8px", marginBottom: "16px" }}>
          Recent Orders
        </h3>

        {recentOrders.length === 0 ? (
          <p>No recent orders found.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }} aria-label="Recent orders">
            <thead>
              <tr style={{ backgroundColor: "#219150", color: "white" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>Product</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(({ id, product, status, date }) => (
                <tr
                  key={id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "white",
                  }}
                >
                  <td style={{ padding: "12px" }}>{product}</td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        backgroundColor: statusColors[status] || "#6c757d",
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        userSelect: "none",
                      }}
                      aria-label={`Order status: ${status}`}
                    >
                      {status}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>{new Date(date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Notifications */}
      <section>
        <h3 style={{ borderBottom: "2px solid #219150", paddingBottom: "8px", marginBottom: "16px" }}>
          Notifications
        </h3>

        {notifications.length === 0 ? (
          <p>No new notifications.</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              paddingLeft: 0,
              maxHeight: "240px",
              overflowY: "auto",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f9fdf9",
              boxShadow: "inset 0 0 6px #c8e6c9",
            }}
          >
            {notifications.map(({ id, message, date }) => (
              <li
                key={id}
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid #e7efd8",
                  fontSize: "0.95rem",
                  color: "#2d662a",
                  fontWeight: "500",
                }}
                tabIndex={0}
                aria-label={`${message} on ${new Date(date).toLocaleDateString()}`}
              >
                {message}
                <span style={{ display: "block", fontSize: "0.85rem", color: "#4a6b3f" }}>
                  {new Date(date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
