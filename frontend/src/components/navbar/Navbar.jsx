import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link,useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/Context";
const Navbar = ({ setLogin }) => {
  const [menu, setMenu] = useState("home");
  const { cartTotal, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }
  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
       <a
  href="#explore-menu"
  onClick={(e) => {
    e.preventDefault();
    if (window.location.pathname !== "/") {
      navigate("/"); // go to home page first
      // wait for DOM to render
      setTimeout(() => {
        document.getElementById("explore-menu")?.scrollIntoView({ behavior: "smooth" });
      }, 100); // 100ms delay to allow ExploreMenu to mount
    } else {
      document.getElementById("explore-menu")?.scrollIntoView({ behavior: "smooth" });
    }
    setMenu("menu");
  }}
  className={menu === "menu" ? "active" : ""}
>
  menu
</a>

       
        <a
          href="#Footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <div className="searchicon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={cartTotal() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setLogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="navbarprofiledropdown">
              <li onClick={()=>navigate('/Myorder')}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
                <p>Log Out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
