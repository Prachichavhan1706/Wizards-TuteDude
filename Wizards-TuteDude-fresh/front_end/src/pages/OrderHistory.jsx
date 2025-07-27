import React from "react";

// Example static order data; replace with dynamic data from your backend
const orders = [
  { id: 1, product: "Tomato", status: "Delivered", date: "2025-07-25" },
  { id: 2, product: "Onion", status: "Pending", date: "2025-07-28" },
  { id: 3, product: "Potato", status: "Cancelled", date: "2025-07-20" },
];

// Helper to format date nicely
function formatDate(isoString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoString).toLocaleDateString(undefined, options);
}

// Badge color depending on order status
const statusColors = {
  Delivered: "#28a745", // green
  Pending: "#ffc107",   // yellow
  Cancelled: "#dc3545", // red
  Processing: "#17a2b8", // teal/blue
};

export default function OrderHistory() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#219150", marginBottom: "20px", textAlign: "center" }}>
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          You have no orders yet.
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {orders.map(({ id, product, status, date }) => (
            <li
              key={id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                borderRadius: "10px",
                backgroundColor: "#f9faf9",
                marginBottom: "12px",
                boxShadow: "inset 0 0 8px #d4efdb",
                transition: "background-color 0.3s",
                cursor: "default",
              }}
              title={`Order status: ${status}`}
            >
              <div style={{ fontWeight: "600", fontSize: "1.05rem", color: "#2c6b2f" }}>
                {product}
              </div>
              <div style={{ textAlign: "right", minWidth: "140px" }}>
                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: "18px",
                    backgroundColor: statusColors[status] || "#6c757d",
                    color: "#fff",
                    fontWeight: "600",
                    fontSize: "0.85rem",
                    userSelect: "none",
                  }}
                >
                  {status}
                </span>
                <div style={{ color: "#4a4a4a", marginTop: "6px", fontSize: "0.9rem" }}>
                  {formatDate(date)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
