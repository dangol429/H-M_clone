import React from "react";
import "../components/ComponentStyle.css";
import logo from "../Images/logofooter.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faTwitter,
  faPinterest,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <h5>Socials</h5>
        <div id="socials">
          <a href="https://www.instagram.com/hm/">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://www.youtube.com/">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://twitter.com/">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.pinterest.com/">
            <FontAwesomeIcon icon={faPinterest} />
          </a>
          <a href="https://www.facebook.com/hmindiahm">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
        <hr />
        <p className="text-center text-md">
          The content of this site is copyright-protected and is the property of
          H & M Hennes & Mauritz AB.
        </p>
        <img
          className="text-center"
          id="footerLogo"
          src={logo}
          alt="logo"
        ></img>
        <p className="country">NEPAL</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
