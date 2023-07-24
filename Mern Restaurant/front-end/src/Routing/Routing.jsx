import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import ProductsHome from "../Pages/ProductsHome";
import Cart from "../Pages/Cart";
import PaymentSuccess from "../Pages/PaymentSuccess";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/home/:id/cart" element={<Cart />} />
        <Route path="/home/:id/product" element={<ProductsHome />} />
        <Route path="/home/:id/cart/paymentSuccess" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
};

export default Routing;
