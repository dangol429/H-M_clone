import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import logo from "../Images/logo.png";
import styled from "styled-components";
import "./ComponentStyle.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "../redux/userRedux";
import { removeCart } from "../redux/cartRedux";

const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  padding: 5px;
  font-size: 14px;
  background-color: red;
  color: white;
  width: 20px;
  height: 20px;
  text-align: center;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Navbar = () => {
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    if (currentUser) {
      dispatch(logout());
      dispatch(removeCart());
      localStorage.clear();
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logout Successful",
      });
    }
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div
          className="collapse wakabu navbar-collapse"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav left">
            <Link className="nav-item nav-link " to="/">
              Home
            </Link>
            <a className="nav-item nav-link" href="/allproducts">
              Products
            </a>
            <Link className="nav-item nav-link" to="/profile">
              User Profile
            </Link>
          </div>
          <div className="logo">
            <Link to="/">
            <img
              id="navbarLogo"
              src={logo}
              style={{
                width: "4.3rem",
                left: "50%",
                position: "relative",
                transform: "translate(-50%)",
              }}
              alt="logo"
            ></img>
            </Link>
          </div>
          <div className="navbar-nav right">
            {currentUser ? (
              <Link
                className="nav-item nav-link"
                onClick={handleLogOut}
                to="/login"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </Link>
            ) : (
              <Link className="nav-item nav-link" to="/login">
                <FontAwesomeIcon icon={faHeart} />
                Sign in
              </Link>
            )}
            <Link className="nav-item nav-link" to="/cart">
              <FontAwesomeIcon icon={faShoppingBag} /> Shopping Bag
              <spam>({cartQuantity})</spam>
            </Link>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light" id="bottomnavbar">
        <div className="navbar-nav bottom">
          <a className="nav-item nav-link " href="/allproducts?Categories=t-shirt">
            Tshirt <span className="sr-only">(current)</span>
          </a>
          <a className="nav-item nav-link" href="/allproducts?Categories=shirt">
            Shirt
          </a>
          <a className="nav-item nav-link" href="/allproducts?Categories=pant">
            Pants
          </a>
          <a className="nav-item nav-link" href="/allproducts?Categories=shoes">
            Shoes
          </a>
          <a className="nav-item nav-link" href="/allproducts?Categories=jeans">
            Jeans
          </a>
          <a className="nav-item nav-link" href="/allproducts?Categories=skirt">
            Skirts
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
