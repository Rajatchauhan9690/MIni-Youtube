import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailOrUsername || !password) {
      setErrorMessage("Please provide both email/username and password.");
      return;
    }

    try {
      const res = await axios.post(
        "/api/v1/login",
        {
          email: emailOrUsername,
          username: emailOrUsername,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("welcome", res.data);
      if (res.data.success) {
        setSuccessMessage("🎉 Login successful!");
        navigate("/dashboard");
      } else {
        setErrorMessage(res.data.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <input
          type="text"
          placeholder="Email or Username"
          value={emailOrUsername}
          onChange={(e) => setEmailOrUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default login;
