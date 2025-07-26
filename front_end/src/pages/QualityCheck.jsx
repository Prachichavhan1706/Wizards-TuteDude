import React, { useState } from "react";

const certificates = [
  { id: 1, result: "Passed", supplier: "FreshMart", date: "2025-07-25", url: "#" },
  // Add more certificates here
];

export default function QualityCheck() {
  const [booked, setBooked] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();
    if (!supplierName.trim()) {
      alert("Please enter a supplier name");
      return;
    }
    setBooked(true);
    // TODO: Call backend API to create quality check booking with supplierName
    console.log("Booked quality check for:", supplierName);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(false);
  };

  const handleClearFile = () => {
    setFile(null);
    setUploadSuccess(false);
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);

    // TODO: Implement actual file upload logic here (e.g., to backend or cloud storage)
    console.log("Uploading file:", file);

    // Simulate upload delay
    setTimeout(() => {
      setUploading(false);
      setUploadSuccess(true);
      setFile(null);
      alert("Certificate uploaded successfully!");
    }, 2000);
  };

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
      }}
      aria-label="Quality Check Section"
    >
      <h2 style={{ color: "#219150", marginBottom: "24px", textAlign: "center" }}>
        Quality Check
      </h2>

      {/* Booking Section */}
      {!booked ? (
        <form
          onSubmit={handleBooking}
          style={{ marginBottom: "40px" }}
          aria-describedby="booking-instructions"
          aria-live="polite"
        >
          <label
            htmlFor="supplierName"
            style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}
          >
            Supplier Name
          </label>
          <input
            id="supplierName"
            name="supplierName"
            type="text"
            placeholder="Enter supplier name"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            required
            aria-required="true"
            style={{
              width: "100%",
              padding: "10px 14px",
              fontSize: "1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "16px",
              boxSizing: "border-box",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#219150")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#219150",
              color: "white",
              padding: "12px 24px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "1.1rem",
              width: "100%",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a7b32")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#219150")}
          >
            Request QA Check
          </button>
        </form>
      ) : (
        <p
          style={{ color: "#2d662a", fontWeight: "600", textAlign: "center", marginBottom: "40px" }}
          role="alert"
        >
          Quality check requested! You'll be notified when the results are ready.
        </p>
      )}

      {/* Certificates Section */}
      <section
        aria-label="Certificates List"
        style={{ marginBottom: "40px" }}
      >
        <h3
          style={{
            borderBottom: "2px solid #219150",
            paddingBottom: "8px",
            marginBottom: "16px",
          }}
        >
          Certificates
        </h3>
        {certificates.length === 0 ? (
          <p style={{ color: "#777", fontStyle: "italic" }}>No certificates found.</p>
        ) : (
          <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
            {certificates.map((cert) => (
              <li
                key={cert.id}
                style={{
                  marginBottom: "12px",
                  padding: "12px 16px",
                  backgroundColor: "#f4faf4",
                  borderRadius: "8px",
                  boxShadow: "inset 0 0 8px #c8e6c9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "1rem",
                  color: "#2d662a",
                }}
              >
                <span>
                  <strong>{cert.supplier}</strong> — {cert.result} ({cert.date})
                </span>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#219150",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                  aria-label={`View certificate for ${cert.supplier}`}
                >
                  View Certificate
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Upload Section */}
      <section aria-label="Upload Certificate">
        <h3
          style={{
            borderBottom: "2px solid #219150",
            paddingBottom: "8px",
            marginBottom: "16px",
          }}
        >
          Upload Certificate
        </h3>
        <label
          htmlFor="certificateUpload"
          style={{
            display: "block",
            marginBottom: "12px",
            fontWeight: "600",
            color: "#2d662a",
          }}
        >
          Select certificate file:
        </label>
        <input
          id="certificateUpload"
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
          style={{
            marginBottom: "16px",
            cursor: "pointer",
          }}
          aria-describedby="upload-info"
        />
        {file && (
          <div
            style={{
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <strong>Selected file:</strong> {file.name}
            <button
              type="button"
              onClick={handleClearFile}
              aria-label="Clear selected file"
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#d32f2f",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "1rem",
                padding: "0 4px",
              }}
            >
              ×
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || uploading}
          style={{
            backgroundColor: file && !uploading ? "#219150" : "#a5d6a7",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: file && !uploading ? "pointer" : "not-allowed",
            fontSize: "1rem",
            width: "100%",
            transition: "background-color 0.3s",
          }}
          aria-disabled={!file || uploading}
          aria-busy={uploading}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        {uploadSuccess && (
          <p
            id="upload-info"
            style={{ marginTop: "12px", color: "#2d662a", fontWeight: "600" }}
            role="status"
          >
            Certificate uploaded successfully!
          </p>
        )}
      </section>
    </main>
  );
}
