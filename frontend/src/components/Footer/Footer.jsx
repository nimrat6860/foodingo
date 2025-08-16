import React from "react";
import "./Footer.css";
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="Footer" id='Footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>🍴 Foodingo – Delivering Happiness to Your Doorstep
                Serving delicious meals from your favorite restaurants with love and speed.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-8968608213</li>
                <li>nimrat628@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr></hr>
      <p className="footer-copywrite"> Copywrite 2025 © Foodingo.com All rights are resrerved.</p>
    </div>
  );
};

export default Footer;
