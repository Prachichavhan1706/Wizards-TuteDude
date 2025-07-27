import React, { useState } from "react";

const initialReviews = [
  { id: 1, user: "VendorA", rating: 5, text: "Very fresh and on time!" },
];

function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;
  return (
    <>
      {"★".repeat(fullStars)}
      {"☆".repeat(emptyStars)}
    </>
  );
}

export default function RatingsReviews() {
  const [reviews, setReviews] = useState(initialReviews);
  const [myRating, setMyRating] = useState("");
  const [myReview, setMyReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "N/A";

  const handleSubmit = (e) => {
    e.preventDefault();
    const numericRating = Number(myRating);

    if (!numericRating || numericRating < 1 || numericRating > 5) return;
    if (myReview.trim() === "") return;

    setReviews([
      ...reviews,
      { id: Date.now(), user: "Me", rating: numericRating, text: myReview.trim() },
    ]);
    setMyRating("");
    setMyReview("");
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: "24px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ color: "#219150", marginBottom: "16px" }}>Supplier Reviews</h2>

      <p style={{ fontWeight: "600" }}>
        Average Rating:{" "}
        <span style={{ color: "#f5a623", fontSize: "1.3rem" }}>
          {renderStars(Math.round(averageRating))}
        </span>{" "}
        ({averageRating}) from {reviews.length} review{reviews.length !== 1 ? "s" : ""}
      </p>

      <form onSubmit={handleSubmit} style={{ marginTop: "24px", marginBottom: "24px" }}>
        <label htmlFor="rating" style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>
          Your Rating:
        </label>
        <select
          id="rating"
          value={myRating}
          onChange={(e) => setMyRating(e.target.value)}
          required
          style={{
            padding: "8px 12px",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginBottom: "16px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <option value="" disabled>
            Select rating
          </option>
          {[5, 4, 3, 2, 1].map((val) => (
            <option key={val} value={val}>
              {"★".repeat(val)}{"☆".repeat(5 - val)} ({val})
            </option>
          ))}
        </select>

        <label htmlFor="review" style={{ display: "block", marginBottom: 6, fontWeight: "600" }}>
          Your Review:
        </label>
        <textarea
          id="review"
          value={myReview}
          onChange={(e) => setMyReview(e.target.value)}
          placeholder="Write your review here..."
          required
          rows={4}
          style={{
            resize: "vertical",
            width: "100%",
            padding: "10px 14px",
            fontSize: "1rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            boxSizing: "border-box",
            marginBottom: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px 24px",
            fontSize: "1.1rem",
            fontWeight: "600",
            color: "white",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#219150",
            cursor: "pointer",
            width: "100%",
            transition: "background-color 0.25s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a7d32")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#219150")}
        >
          Submit
        </button>
      </form>

      {submitted && (
        <p
          style={{
            color: "#2d662a",
            fontWeight: "600",
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Thank you for your review!
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0, maxHeight: 340, overflowY: "auto" }}>
        {reviews
          .slice()
          .reverse()
          .map(({ id, user, rating, text }) => (
            <li
              key={id}
              style={{
                padding: "12px 16px",
                borderBottom: "1px solid #ddd",
                marginBottom: 8,
                borderRadius: 6,
                backgroundColor: "#f9fef9",
              }}
            >
              <div style={{ fontWeight: "700", marginBottom: 4 }}>{user}</div>
              <div style={{ color: "#f5a623", marginBottom: 6 }}>{renderStars(rating)}</div>
              <div style={{ fontStyle: "italic", color: "#555" }}>"{text}"</div>
            </li>
          ))}
      </ul>
    </div>
  );
}
