import React from "react";
import "./home.css";
import Pants from "../Images/Pants.avif";
import Tshirt from "../Images/shirts.jpg";
import Shoes from "../Images/jordans.jpg";
import Navbar from "../components/navbar";
import {Link} from "react-router-dom" 

const home = () => {
  return (
    <>
      <Navbar />
        <div className="container">
        <Link to="/allproducts?Categories=jeans">
        <div className="Pants">
          <img src={Pants} id="pants" alt=""></img>
          <div className="DescPants">
            <h2>Classic cut: straight-leg</h2>
            <spam>Fresh takes on the essential wear-forever denim</spam>
          </div>
        </div>
        </Link>
        <Link to="/allproducts?Categories=shoes">
        <div className="shoes">
          <img src={Shoes} id="pants" alt=""></img>
          <div className="DescShoes">
            <h2>NIKE JORDANS</h2>
            <spam>
              Wear the most flexible and classiest shoes to ever exist
            </spam>
          </div>
        </div>
        </Link>
        <Link to="/allproducts?Categories=shirt">
        <div className="shirt">
          <img src={Tshirt} id="pants" alt=""></img>
          <div className="DescShirt">
            <h1>Quality Shirts: Good Fit</h1>
            <spam>Wear the most quality cotton ever</spam>
          </div>
        </div>
        </Link>
      </div>
    </>
  );
};

export default home;
