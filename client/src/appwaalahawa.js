import './App.css';
import Navbar from './components/navbar';
import React from "react";
import { styled } from "styled-components";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import AuthPage from "./pages/AuthPage";
import OrderScreen from "./pages/OrderScreen";
import Dashbaord from "./pages/adminPages/Dashbaord";
import AdminProductsPage from "./pages/adminPages/AdminProductsPage";
import AllUserPage from "./pages/adminPages/AllUserPage";
import AllOrderPage from "./pages/adminPages/AllOrdersPage";
import UserProfile from "./pages/UserProfile";
import FooterComponent from "./components/FooterComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/ForgotPassword";
import OrderHistoryPage from "./pages/OrderHistoryPage";
const Wrapper = styled.div`
  font-family: "Assistant", sans-serif;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <>
    <ToastContainer />
    <Wrapper>
      <Router>
        <Routes>
          <Route path="/admin" element={<Dashbaord />} />
          <Route path="/admin/products" element={<AdminProductsPage />} />
          <Route path="/admin/users" element={<AllUserPage />} />
          <Route path="/admin/orders" element={<AllOrderPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/allProducts" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/:id" element={<OrderScreen />} />
          <Route path="/orders/:id" element={<OrderHistoryPage />} />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/auth"
            element={user ? <Navigate to="/" /> : <AuthPage />}
          ></Route>
        </Routes>
      </Router>
      <FooterComponent />
    </Wrapper>
  </>
  );
}

export default App;
