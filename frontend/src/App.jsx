import React, { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import Placed from "./pages/Placed/Placed";
import Myorder from "./pages/myorder/Myorder";
const App = () => {
  const [login, setLogin] = useState(false);
  return (
    <>
      {login ? <LoginPopUp setLogin={setLogin}/> : <></>}
      <div className="app">
        <Navbar setLogin={setLogin} />
        <Routes>
          <Route path="/" element={<Home/>} />
<Route path="/cart" element={<Cart setLogin={setLogin}/>} />          
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/placed" element={<Placed/>}/>
          <Route path="/myorder" element={<Myorder/>}/>

        </Routes>
      </div>
      <Footer />
    </>
  );
};
export default App;
