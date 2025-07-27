import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";

// Example suppliers data (replace with API data)
const suppliersData = [
  { id: 1, name: "FreshMart", rating: 4.5, categories: ["Vegetables"], location: "Delhi" },
  { id: 2, name: "Masala Supplies", rating: 4.7, categories: ["Spices"], location: "Mumbai" },
  { id: 3, name: "GreenFarm", rating: 4.3, categories: ["Vegetables"], location: "Bangalore" },
  { id: 4, name: "SpiceWorld", rating: 4.6, categories: ["Spices"], location: "Delhi" },
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize filters from URL query params if present
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  // Dynamically compute unique categories and locations
  const categories = useMemo(() => {
    const cats = new Set();
    suppliersData.forEach(sup => sup.categories.forEach(c => cats.add(c)));
    return Array.from(cats);
  }, []);

  const locations = useMemo(() => {
    const locs = new Set(suppliersData.map(s => s.location));
    return Array.from(locs);
  }, []);

  // Filter suppliers based on current criteria
  const filteredSuppliers = suppliersData.filter(sup => {
    const matchesSearch = sup.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "" || sup.categories.includes(category);
    const matchesLocation = location === "" || sup.location === location;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Update URL parameters on filter/search change
  const updateParams = (key, value) => {
    const paramsObj = Object.fromEntries(searchParams.entries());
    if (value) {
      paramsObj[key] = value;
    } else {
      delete paramsObj[key];
    }
    setSearchParams(paramsObj);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    updateParams("search", e.target.value);
  };

  const onCategoryChange = (e) => {
    setCategory(e.target.value);
    updateParams("category", e.target.value);
  };

  const onLocationChange = (e) => {
    setLocation(e.target.value);
    updateParams("location", e.target.value);
  };

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
      aria-label="Search Vendors and Suppliers"
    >
      <h2 style={{ color: "#219150", marginBottom: "24px", textAlign: "center" }}>
        Search Vendors and Suppliers
      </h2>

      {/* Search and Filters */}
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "center",
          marginBottom: "32px",
        }}
        aria-labelledby="search-filters"
      >
        <div style={{ flex: "1 1 280px", minWidth: 220 }}>
          <label htmlFor="searchInput" id="search-filters" style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>
            Search by Name
          </label>
          <input
            id="searchInput"
            type="search"
            placeholder="Type supplier or vendor name"
            value={search}
            onChange={onSearchChange}
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "1rem",
              borderRadius: 8,
              border: "1.5px solid #219150",
              boxSizing: "border-box",
              outline: "none",
            }}
            autoComplete="off"
            aria-describedby="search-filters"
          />
        </div>

        <div style={{ flex: "1 1 160px", minWidth: 140 }}>
          <label htmlFor="categoryFilter" style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>
            Category
          </label>
          <select
            id="categoryFilter"
            value={category}
            onChange={onCategoryChange}
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
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
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
            onChange={onLocationChange}
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
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </form>

      {/* Suppliers List */}
      {filteredSuppliers.length === 0 ? (
        <p style={{ textAlign: "center", color: "#777", fontStyle: "italic" }}>
          No suppliers match your search and filter criteria.
        </p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            paddingLeft: 0,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
            gap: "24px",
          }}
        >
          {filteredSuppliers.map(({ id, name, rating, categories, location }) => (
            <li
              key={id}
              style={{
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
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
                <p style={{ margin: "0 0 6px", fontWeight: "600" }}>⭐ {rating.toFixed(1)}</p>
                <p style={{ margin: "0 0 6px", fontSize: "0.9rem", color: "#555" }}>
                  Categories: {categories.join(", ")}
                </p>
                <p style={{ margin: 0, fontSize: "0.9rem", color: "#555" }}>Location: {location}</p>
              </div>

              <div style={{ marginTop: "16px", display: "flex", gap: "16px" }}>
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
    </main>
  );
}
