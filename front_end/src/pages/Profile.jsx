import React, { useState } from "react";

export default function Profile() {
  // Initial user data - in real app, fetch from backend or context
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Vendor",
    contact: "+91 9876543210",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    if (editMode) {
      // On cancel, revert to original user data
      setFormData(user);
    }
    setEditMode(!editMode);
  };

  const handleSave = () => {
    // Here add form validation as needed

    // TODO: Implement API call to update user profile on the backend
    setUser(formData);
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "24px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgb(0 0 0 / 0.1)",
      }}
    >
      <h2 style={{ color: "#219150", marginBottom: "24px", textAlign: "center" }}>
        Your Profile
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        style={{ display: "flex", flexDirection: "column", gap: "18px" }}
      >
        {/* Name */}
        <label style={{ fontWeight: "600" }}>
          Full Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editMode}
            required
            style={inputStyle(editMode)}
            placeholder="Your full name"
          />
        </label>

        {/* Email */}
        <label style={{ fontWeight: "600" }}>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
            required
            style={inputStyle(editMode)}
            placeholder="Your email address"
          />
        </label>

        {/* Role */}
        <label style={{ fontWeight: "600" }}>
          Role
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={!editMode}
            style={inputStyle(editMode)}
          >
            <option value="Vendor">Vendor</option>
            <option value="Supplier">Supplier</option>
          </select>
        </label>

        {/* Contact Number */}
        <label style={{ fontWeight: "600" }}>
          Contact Number
          <input
            type="tel"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            disabled={!editMode}
            pattern="\+?\d{10,15}"
            title="Please enter a valid contact number including country code."
            style={inputStyle(editMode)}
            placeholder="+91 9876543210"
          />
        </label>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
          {editMode ? (
            <>
              <button
                type="submit"
                style={buttonStyle(true)}
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleEditToggle}
                style={buttonStyle(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleEditToggle}
              style={buttonStyle(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// Helper styles
const inputStyle = (editable) => ({
  marginTop: "6px",
  padding: "10px 14px",
  fontSize: "1rem",
  borderRadius: "8px",
  border: editable ? "1.5px solid #219150" : "1px solid #ddd",
  backgroundColor: editable ? "white" : "#f3f3f3",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
});

const buttonStyle = (primary) => ({
  padding: "12px 28px",
  fontSize: "1.1rem",
  fontWeight: "600",
  cursor: "pointer",
  borderRadius: "6px",
  border: "none",
  color: "white",
  backgroundColor: primary ? "#219150" : "#aaa",
  transition: "background-color 0.25s ease",
  flex: "1 1 auto",
  minWidth: "100px",
  userSelect: "none",
});

