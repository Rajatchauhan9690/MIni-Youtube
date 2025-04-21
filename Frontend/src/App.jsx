import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Dashboard from "./pages/Dashboard";
import Register from "./components/Register";
import Home from "./components/Home";
import UpdateAccountDetails from "./components/UpdateAccountDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/edit" element={<UpdateAccountDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
