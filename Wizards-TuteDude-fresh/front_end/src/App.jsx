import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Suppliers from "./pages/Suppliers";
import ProductCompare from "./pages/ProductCompare";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";
import RatingsReviews from "./pages/RatingsReviews";
import QualityCheck from "./pages/QualityCheck";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar /> {/* Navbar visible on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/compare/:productId" element={<ProductCompare />} />
          <Route path="/order/:supplierId/:productId" element={<Order />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/reviews/:supplierId" element={<RatingsReviews />} />
          <Route path="/quality-check" element={<QualityCheck />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
