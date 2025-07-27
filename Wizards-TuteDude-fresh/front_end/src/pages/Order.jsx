import React, { useState } from "react";

export default function Order() {
  const [qty, setQty] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = () => {
    if (qty < 1) return; // Prevent ordering invalid quantity

    // TODO: Replace this with real backend call
    setOrderPlaced(true);

    // Optionally reset qty after order is placed
    setQty(1);

    // Clear confirmation message after 3 seconds
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "40px auto",
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgb(0 0 0 / 0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ marginBottom: "24px", color: "#219150", textAlign: "center" }}>
        Place Order
      </h2>

      <label
        htmlFor="qty-input"
        style={{ display: "block", marginBottom: "12px", fontWeight: "600", fontSize: "1.1rem" }}
      >
        Quantity:
      </label>
      <input
        id="qty-input"
        type="number"
        min={1}
        value={qty}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val >= 1) {
            setQty(val);
          } else {
            setQty("");
          }
        }}
        style={{
          width: "100%",
          padding: "10px 14px",
          fontSize: "1.1rem",
          borderRadius: "8px",
          border: "2px solid #219150",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
        placeholder="Enter quantity"
      />

      <button
        onClick={handleOrder}
        disabled={!qty || qty < 1}
        style={{
          width: "100%",
          padding: "14px 0",
          fontSize: "1.2rem",
          backgroundColor: qty >= 1 ? "#219150" : "#94d3a2",
          color: "white",
          fontWeight: "bold",
          border: "none",
          borderRadius: "10px",
          cursor: qty >= 1 ? "pointer" : "not-allowed",
          transition: "background-color 0.3s ease",
          boxShadow: qty >= 1 ? "0 4px 12px rgba(33, 145, 80, 0.4)" : "none",
        }}
      >
        Place Order
      </button>

      {orderPlaced && (
        <div
          role="alert"
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#d4edda",
            color: "#155724",
            borderRadius: "6px",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          🎉 Your order for {qty} unit{qty > 1 ? "s" : ""} has been placed successfully!
        </div>
      )}
    </div>
  );
}
