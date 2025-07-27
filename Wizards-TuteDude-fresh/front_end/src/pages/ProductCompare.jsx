import React, { useState } from "react";

// Dummy data; replace with real data and product name dynamically
const dummyData = [
  { supplier: "FreshMart", price: 40, qty: "1kg", rating: 4.5 },
  { supplier: "Masala Co", price: 38, qty: "1kg", rating: 4.2 },
  { supplier: "SpiceHub", price: 42, qty: "1kg", rating: 4.7 },
  { supplier: "GreenLeaf", price: 37, qty: "1kg", rating: 4.0 },
  { supplier: "OrganicPlus", price: 44, qty: "1kg", rating: 4.9 },
  { supplier: "FreshFarm", price: 39, qty: "1kg", rating: 4.1 },
  // More items if necessary...
];

// Pagination config
const PAGE_SIZE = 5;

export default function ProductCompare() {
  const [currentPage, setCurrentPage] = useState(1);

  // Find lowest price(s) for highlight
  const lowestPrice = Math.min(...dummyData.map((item) => item.price));

  // Pagination logic
  const totalPages = Math.ceil(dummyData.length / PAGE_SIZE);
  const currentItems = dummyData.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
    }
  };

  // Handler for Order button: you can extend to open order modal or route
  const handleOrderClick = (supplier) => {
    alert(`Order placed with ${supplier}! (Extend this to real workflow)`);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#217f4e" }}>
        Compare Prices: <span style={{ fontWeight: "normal" }}>Product Name</span>
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          boxShadow: "0 4px 15px rgb(0 0 0 / 0.08)",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "#fff",
        }}
        aria-label="Price comparison table"
      >
        <thead style={{ backgroundColor: "#219150", color: "#fff" }}>
          <tr>
            {["Supplier", "Price", "Qty", "Rating", "Order"].map((header) => (
              <th
                key={header}
                style={{
                  padding: "14px 18px",
                  fontWeight: "600",
                  fontSize: "1.1rem",
                  userSelect: "none",
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row, idx) => {
            const isLowest = row.price === lowestPrice;
            return (
              <tr
                key={idx}
                style={{
                  backgroundColor: idx % 2 === 0 ? "#f9fdf8" : "white",
                  fontWeight: isLowest ? "700" : "400",
                  color: isLowest ? "#1f6a39" : "#333",
                  borderLeft: isLowest ? "4px solid #34a853" : "4px solid transparent",
                  transition: "background-color 0.2s",
                }}
                tabIndex={0} // make row focusable
                aria-label={`${row.supplier} offers price ₹${row.price} for quantity ${row.qty} with rating ${row.rating}`}
              >
                <td style={{ padding: "14px 18px" }}>{row.supplier}</td>
                <td style={{ padding: "14px 18px" }}>
                  ₹{row.price}
                  {isLowest && (
                    <span
                      style={{
                        marginLeft: "8px",
                        padding: "2px 8px",
                        backgroundColor: "#34a853",
                        color: "white",
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                      }}
                      aria-label="Best price"
                      title="Best price"
                    >
                      Best
                    </span>
                  )}
                </td>
                <td style={{ padding: "14px 18px" }}>{row.qty}</td>
                <td style={{ padding: "14px 18px" }}>
                  {"⭐".repeat(Math.floor(row.rating))}{" "}
                  <span style={{ color: "#666", fontSize: "0.85rem" }}>
                    ({row.rating.toFixed(1)})
                  </span>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <button
                    onClick={() => handleOrderClick(row.supplier)}
                    style={{
                      backgroundColor: "#219150",
                      color: "white",
                      border: "none",
                      borderRadius: "20px",
                      padding: "8px 20px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.95rem",
                      transition: "background-color 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a7d32")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#219150")}
                    aria-label={`Order from ${row.supplier}`}
                  >
                    Order
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div
          style={{
            marginTop: "24px",
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            userSelect: "none",
          }}
          role="navigation"
          aria-label="Table pagination"
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            style={paginationButtonStyle(currentPage === 1)}
          >
            &laquo; Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToPage(idx + 1)}
              aria-current={currentPage === idx + 1 ? "page" : undefined}
              style={paginationButtonStyle(currentPage === idx + 1)}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            style={paginationButtonStyle(currentPage === totalPages)}
          >
            Next &raquo;
          </button>
        </div>
      )}
    </div>
  );
}

// Helper for pagination button style
function paginationButtonStyle(disabledOrActive) {
  return {
    padding: "6px 14px",
    borderRadius: "6px",
    backgroundColor: disabledOrActive ? "#1a7d32" : "#219150",
    color: "white",
    border: "none",
    cursor: disabledOrActive ? "default" : "pointer",
    fontWeight: disabledOrActive ? "700" : "600",
    fontSize: "1rem",
    transition: "background-color 0.25s",
    userSelect: "none",
  };
}
