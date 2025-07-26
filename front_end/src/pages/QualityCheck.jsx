import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
// Removed Firebase Storage import since not used now

export default function QualityCheck() {
  const currentUser = auth.currentUser;

  // Local states
  const [booked, setBooked] = useState(false);
  const [supplierName, setSupplierName] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [qualityChecks, setQualityChecks] = useState([]); // fetched from Firestore
  const [selectedCheckId, setSelectedCheckId] = useState(null); // which qualityCheck are we uploading for?

  // Fetch all quality checks for the current vendor, real-time updates
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "qualityChecks"),
      where("vendorId", "==", currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const checks = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQualityChecks(checks);
    });

    return () => unsubscribe();
  }, [currentUser]);

  // Handle booking a new quality check request
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!supplierName.trim()) {
      alert("Please enter a supplier name");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "qualityChecks"), {
        vendorId: currentUser.uid,
        supplierName,
        status: "requested",
        createdAt: serverTimestamp(),
      });
      setBooked(true);
      setSupplierName("");
      setSelectedCheckId(docRef.id); // Select this for potential upload
      alert("Quality check requested!");
    } catch (error) {
      alert("Failed to request quality check: " + error.message);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(false);
  };

  // Clear selected file before upload
  const handleClearFile = () => {
    setFile(null);
    setUploadSuccess(false);
  };

  // Upload certificate file to Cloudinary and update Firestore doc
  const handleUpload = async () => {
    if (!file) return;
    if (!selectedCheckId) {
      alert("No related quality check selected for upload.");
      return;
    }

    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "certificate_uploads");  // your preset name exactly
    
    try {
      // Upload to Cloudinary unsigned endpoint
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcguxvuzb/upload",  // <-- Replace this!
        {
          method: "POST",
          body: data,
        }
      );
      const uploadResult = await res.json();

      if (!uploadResult.secure_url) {
        throw new Error("Upload failed");
      }

      // Update Firestore document with Cloudinary URL and status
      await updateDoc(doc(db, "qualityChecks", selectedCheckId), {
        certificateUrl: uploadResult.secure_url,
        status: "complete",
      });

      setUploadSuccess(true);
      setFile(null);
      alert("Certificate uploaded successfully!");
    } catch (error) {
      alert("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
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
      <section aria-label="Certificates List" style={{ marginBottom: "40px" }}>
        <h3
          style={{
            borderBottom: "2px solid #219150",
            paddingBottom: "8px",
            marginBottom: "16px",
          }}
        >
          Certificates
        </h3>
        {qualityChecks.length === 0 ? (
          <p style={{ color: "#777", fontStyle: "italic" }}>No certificates found.</p>
        ) : (
          <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
            {qualityChecks.map((cert) => (
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
                  <strong>{cert.supplierName || "Unknown Supplier"}</strong> —{" "}
                  {cert.status.charAt(0).toUpperCase() + cert.status.slice(1)}{" "}
                  {cert.createdAt?.toDate ? `(${cert.createdAt.toDate().toLocaleDateString()})` : ""}
                </span>
                {cert.certificateUrl ? (
                  <a
                    href={cert.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#219150",
                      textDecoration: "none",
                      fontWeight: "600",
                    }}
                    aria-label={`View certificate for ${cert.supplierName || "supplier"}`}
                  >
                    View Certificate
                  </a>
                ) : (
                  <span style={{ fontStyle: "italic", color: "#777" }}>
                    No certificate uploaded
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Upload Section */}
      {selectedCheckId && (
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
      )}
    </main>
  );
}
