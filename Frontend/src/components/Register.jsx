import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    if (!fullName || !username || !email || !password || !avatar) {
      setErrorMessage("All fields and avatar are required.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("avatar", avatar); // Required
    if (coverImage) {
      formData.append("coverImage", coverImage); // Optional
    }

    // Debugging: log all entries in formData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const res = await axios.post("/api/v1/register", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setSuccessMessage("🎉 Registration successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

        // Optional: clear form
        setFullName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        setCoverImage(null);
      } else {
        setErrorMessage(res.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setErrorMessage(
        error?.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleRegister} encType="multipart/form-data">
        <h2>Register</h2>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label style={{ color: "black" }}>Avatar (required)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          required
        />

        <label style={{ color: "black" }}>Cover Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
