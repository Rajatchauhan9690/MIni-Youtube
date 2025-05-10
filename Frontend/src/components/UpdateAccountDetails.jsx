import React, { useState } from "react";
import axios from "axios";

const UpdateAccountDetails = ({ currentUser }) => {
  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [username, setUsername] = useState(currentUser?.username || "");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!fullName || !email || !username) {
      setErrorMessage("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post(
        "/api/v1/updateAccountDetails",
        {
          fullName,
          email,
          username,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data.success) {
        setSuccessMessage("✅ User details updated successfully!");
      } else {
        setErrorMessage("Something went wrong.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      setErrorMessage(
        error?.response?.data?.message || "Failed to update account details"
      );
    }
  };

  return (
    <div className="login-container">
      <h2>Update Account Details</h2>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateAccountDetails;
