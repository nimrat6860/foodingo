import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
    const navigate = useNavigate();

  const { cartTotal, token, food_list, cartItems,setCartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });
  const onchangehanlder = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const placeorder = async (e) => {
  e.preventDefault();
  try {
    let orderitems = [];
    (food_list || []).forEach((item) => {
      if (cartItems[item._id] > 0) {
        orderitems.push({ ...item, quantity: cartItems[item._id] });
      }
    });

    let orderdata = {
      address: data,
      items: orderitems,
      amount: cartTotal() + 20
    };
    const res = await axios.post(url + "/api/order/place", orderdata, {
      headers: { token }
    });

if (res.status === 200) {
  setCartItems({}); // clear frontend cart
  navigate("/placed");
}
  } catch (err) {
    console.error("Error placing order:", err);
    alert("Failed to place order. Please try again.");
  }
};
useContext(()=>{
  if(!token){
    navigate("/cart")
  }
},[token])
  return (
    <form onSubmit={placeorder} className="placeorder">
      <div className="placeorderleft">
        <p className="title"> Delivery Information</p>
        <div className="multifields">
          <input 
            name="firstname"
            onChange={onchangehanlder}
            value={data.firstname}
            type="text"
            placeholder="First Name"
              required="true"
          />
          <input 
            name="lastname"
            onChange={onchangehanlder}
            value={data.lastname}
            type="text"
            placeholder="Last Name"
              required="true"
          />
        </div>
        <input 
          name="email"
          onChange={onchangehanlder}
          value={data.email}
          type="email"
          placeholder="Email address"
            required="true"
        />
        <input 
          name="street"
          onChange={onchangehanlder}
          value={data.street}
          type="text"
          placeholder="Street"
            required="true"
        />
        <div className="multifields">
          <input 
            name="city"
            onChange={onchangehanlder}
            value={data.city}
            type="text"
            placeholder="City"
              required="true"
          />
          <input 
            name="state"
            onChange={onchangehanlder}
            value={data.state}
            type="text"
            placeholder="State"
              required="true"
          />
        </div>
        <div className="multifieldz">
          <input 
            name="pincode"
            onChange={onchangehanlder}
            value={data.pincode}
            type="text"
            placeholder="PIN CODE"
          />
          <input 
            name="country"
            onChange={onchangehanlder}
            value={data.country}
            type="text"
            placeholder="COUNTRY"
              required="true"
          />
        </div>
        <input  
          name="phone"
          onChange={onchangehanlder}
          value={data.phone}
          type="text"
          placeholder="Phone Number"
            required="true"
        />
      </div>
      <div className="placeorderright">
        <div className="cartTotal">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>{cartTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {cartTotal() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{cartTotal() === 0 ? 0 : cartTotal() + 20}</b>
            </div>
          </div>
          <button type="submit"  >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
