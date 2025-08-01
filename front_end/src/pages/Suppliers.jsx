import React, { useState, useMemo, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import RecommendedSuppliers from "../components/RecommendedSuppliers";

// Example placeholder mappings (replace with your actual encoding maps)
const categoryEncodingMap = {
  "Fruits": 0,
  "Vegetables": 1,
  "Electronics": 2,
  // add all your category mappings here...
};

const locationEncodingMap = {
  "New York": 0,
  "Los Angeles": 1,
  "Chicago": 2,
  // add all your location mappings here...
};

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function fetchSuppliers() {
      try {
        const snap = await getDocs(collection(db, "suppliers"));
        const supList = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSuppliers(supList);
      } catch (error) {
        console.error("Error fetching suppliers: ", error);
      }
    }
    fetchSuppliers();
  }, []);

  // Extract categories and locations dynamically (your existing code)
  const categories = useMemo(() => {
    const cats = new Set();
    suppliers.forEach(sup => {
      if (Array.isArray(sup.categories)) {
        sup.categories.forEach(cat => cats.add(cat));
      } else if (typeof sup.category === "string" && sup.category.trim() !== "") {
        cats.add(sup.category);
      }
    });
    return Array.from(cats);
  }, [suppliers]);

  const locations = useMemo(() => {
    const locs = new Set();
    suppliers.forEach(sup => {
      if (sup.location && sup.location.trim() !== "") locs.add(sup.location);
    });
    return Array.from(locs);
  }, [suppliers]);

  const filteredSuppliers = suppliers.filter(sup => {
    const matchName = sup.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "" ||
      (Array.isArray(sup.categories) ? sup.categories.includes(category) : sup.category === category);
    const matchLocation = location === "" || sup.location === location;
    return matchName && matchCategory && matchLocation;
  });

  // Get the label-encoded category and location values for recommended suppliers component
  const encodedCategory = categoryEncodingMap[category] ?? null; // null if no match or empty string
  const encodedLocation = locationEncodingMap[location] ?? null;

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
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
        {/* ... your existing search/filter inputs ... */}
        {/* (keep unchanged) */}

        {/* Category filter select, same as your code */}
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

        {/* Location filter select, same as your code */}
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

      {/* Render the recommended suppliers */}
      <RecommendedSuppliers categoryCode={encodedCategory} locationCode={encodedLocation} />

      {/* Supplier Cards */}
      {filteredSuppliers.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777", fontStyle: "italic" }}>
          No suppliers match your search/filter criteria.
        </p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            paddingLeft: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
            gap: 24,
          }}
        >
          {/* your existing mapping of suppliers to list */}
          {filteredSuppliers.map(({ id, name, qualityRating, categories, category, location }) => (
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
              aria-label={`${name}, rating ${qualityRating ? qualityRating.toFixed(1) : "N/A"} stars, categories ${
                Array.isArray(categories) ? categories.join(", ") : category || "N/A"
              }, located in ${location || "N/A"}`}
            >
              <div>
                <h3 style={{ margin: "0 0 8px", color: "#217f4e" }}>{name}</h3>
                <p style={{ margin: "0 0 6px", fontWeight: "600" }}>
                  ⭐ {qualityRating ? qualityRating.toFixed(1) : "N/A"}
                </p>
                <p style={{ margin: "0 0 6px", fontSize: "0.9rem", color: "#555" }}>
                  Category: {Array.isArray(categories) ? categories.join(", ") : category || "N/A"}
                </p>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>Location: {location || "N/A"}</p>
              </div>
              {/* your existing buttons for reviews and order */}
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
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a7d32")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#219150")}
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
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#216a8c")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
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
