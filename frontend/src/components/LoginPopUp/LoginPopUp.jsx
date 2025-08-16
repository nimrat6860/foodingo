import React, { useContext, useState } from "react";
import "./LoginPopUp.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/Context";
import axios from 'axios'
const LoginPopUp = ({ setLogin }) => {
  const { url,setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onlogin = async (e) => {
    e.preventDefault();
    let newurl = url;
    if (currentState === "Login") {
      newurl += "/api/user/login";
    } else {
      newurl += "/api/user/register";
    }
    const response = await axios.post(newurl,data)
    if(response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token",response.data.token)
      setLogin(false)
    }
    else{
      alert(response.data.message)
    }
  };
  return (
    <div className="loginpopup">
      <form onSubmit={onlogin} className="loginpopupcontainer">
        <div className="loginpopuptitle">
          <h2>{currentState}</h2>
          <img
            onClick={() => setLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="loginpopupinputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Create Acoount" : "Login In"}
        </button>
        <div className="loginpopupcondition">
          <input type="checkbox" required />
          <p>By continuing , I agree to terms of use & privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};
export default LoginPopUp;
