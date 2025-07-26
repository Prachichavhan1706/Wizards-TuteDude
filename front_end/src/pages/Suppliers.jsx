import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const suppliers = [
  { id: 1, name: "FreshMart", rating: 4.5, categories: ["Vegetables"], location: "Delhi" },
  { id: 2, name: "Masala Supplies", rating: 4.7, categories: ["Spices"], location: "Mumbai" },
  { id: 3, name: "GreenFarm", rating: 4.3, categories: ["Vegetables"], location: "Bangalore" },
  { id: 4, name: "SpiceWorld", rating: 4.6, categories: ["Spices"], location: "Delhi" },
];

function Suppliers() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  // Extract unique categories dynamically
  const categories = useMemo(() => {
    const cats = new Set();
    suppliers.forEach(sup => sup.categories.forEach(c => cats.add(c)));
    return Array.from(cats);
  }, []);

  // Extract unique locations dynamically
  const locations = useMemo(() => {
    const locs = new Set(suppliers.map(sup => sup.location));
    return Array.from(locs);
  }, []);

  // Filter suppliers based on search, category, and location
  const filteredSuppliers = suppliers.filter(sup => {
    const matchName = sup.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "" || sup.categories.includes(category);
    const matchLocation = location === "" || sup.location === location;
    return matchName && matchCategory && matchLocation;
  });

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h2 style={{ color: "#219150", marginBottom: 24, textAlign: "center" }}>Suppliers</h2>

      {/* Search and Filters */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          marginBottom: 32,
          alignItems: "center",
        }}
      >
        <div style={{ flex: "1 1 260px", minWidth: 200 }}>
          <label htmlFor="searchSupplier" style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>
            Search Supplier
          </label>
          <input
            id="searchSupplier"
            type="search"
            placeholder="Enter supplier name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "1rem",
              borderRadius: 8,
              border: "1.5px solid #219150",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.3s",
            }}
            autoComplete="off"
          />
        </div>

        <div style={{ flex: "1 1 160px", minWidth: 140 }}>
          <label htmlFor="categoryFilter" style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>
            Category
          </label>
          <select
            id="categoryFilter"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "1rem",
              borderRadius: 8,
              border: "1.5px solid #219150",
              outline: "none",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div style={{ flex: "1 1 160px", minWidth: 140 }}>
          <label htmlFor="locationFilter" style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>
            Location
          </label>
          <select
            id="locationFilter"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "1rem",
              borderRadius: 8,
              border: "1.5px solid #219150",
              outline: "none",
              cursor: "pointer",
              boxSizing: "border-box",
            }}
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Suppliers List */}
      {filteredSuppliers.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777", fontStyle: "italic" }}>
          No suppliers match your search/filter criteria.
        </p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 24 }}>
          {filteredSuppliers.map(({ id, name, rating, categories, location }) => (
            <li
              key={id}
              style={{
                padding: 20,
                borderRadius: 12,
                boxShadow: "0 4px 16px rgb(0 0 0 / 0.08)",
                backgroundColor: "#f9faf9",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              tabIndex={0}
              aria-label={`${name}, rating ${rating} stars, categories ${categories.join(", ")}, located in ${location}`}
            >
              <div>
                <h3 style={{ margin: "0 0 8px", color: "#217f4e" }}>{name}</h3>
                <p style={{ margin: "0 0 6px", fontWeight: "600" }}>
                  ⭐ {rating.toFixed(1)}
                </p>
                <p style={{ margin: "0 0 6px", fontSize: "0.9rem", color: "#555" }}>
                  Category: {categories.join(", ")}
                </p>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>
                  Location: {location}
                </p>
              </div>

              <div style={{ marginTop: 16, display: "flex", gap: "16px" }}>
                <Link
                  to={`/reviews/${id}`}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px 0",
                    backgroundColor: "#219150",
                    color: "white",
                    fontWeight: "600",
                    borderRadius: 8,
                    textDecoration: "none",
                    transition: "background-color 0.25s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1a7d32")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#219150")}
                >
                  View Reviews
                </Link>
                <Link
                  to={`/order/${id}/1`}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "10px 0",
                    backgroundColor: "#2980b9",
                    color: "white",
                    fontWeight: "600",
                    borderRadius: 8,
                    textDecoration: "none",
                    transition: "background-color 0.25s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#216a8c")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#2980b9")}
                >
                  Order
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Suppliers;
