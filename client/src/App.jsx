import React from "react";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import ProductsPage from "./pages/ProductsPage";
import FooterComponent from "./components/FooterComponent";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import AuthPage from "./pages/Authpage";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import OrderScreen from "./pages/OrderScreen";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<ProductsPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproducts/:id" element={<ProductPage />} />
          <Route path="/order/:id" element={<OrderScreen />} />
        </Routes>
        <FooterComponent />
      </Router>
    </>
  );
};

export default App;
