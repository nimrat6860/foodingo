import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Order your favorite food here</h2>
        <p>
          Foodingo is a smart and user-friendly food delivery app designed to
          make ordering meals easy, fast, and convenient. Whether you're craving
          a quick snack or a full-course meal, Foodingo connects you with your
          favorite restaurants and local food spots
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
