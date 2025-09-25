import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartTotal, token, food_list, cartItems, setCartItems, url } = useContext(StoreContext);

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

  // Redirect non-logged-in users
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    }
  }, [token, navigate]);

  const onchangehanlder = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeorder = async (e) => {
    e.preventDefault();

    if (!token) return; // extra safety

    try {
      const orderitems = (food_list || [])
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({ ...item, quantity: cartItems[item._id] }));

      if (orderitems.length === 0) {
        alert("Cart is empty!");
        return;
      }

      const orderdata = {
        address: data,
        items: orderitems,
        amount: cartTotal() + 20,
      };

      const res = await axios.post(url + "/api/order/place", orderdata, {
        headers: { token },
      });

      if (res.status === 200) {
        setCartItems({}); // clear cart
        navigate("/placed");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <form onSubmit={placeorder} className="placeorder">
      {/* Left Side: Delivery Info */}
      <div className="placeorderleft">
        <p className="title">Delivery Information</p>
        <div className="multifields">
          <input name="firstname" value={data.firstname} onChange={onchangehanlder} placeholder="First Name" required />
          <input name="lastname" value={data.lastname} onChange={onchangehanlder} placeholder="Last Name" required />
        </div>
        <input name="email" value={data.email} onChange={onchangehanlder} placeholder="Email address" type="email" required />
        <input name="street" value={data.street} onChange={onchangehanlder} placeholder="Street" required />
        <div className="multifields">
          <input name="city" value={data.city} onChange={onchangehanlder} placeholder="City" required />
          <input name="state" value={data.state} onChange={onchangehanlder} placeholder="State" required />
        </div>
        <div className="multifieldz">
          <input name="pincode" value={data.pincode} onChange={onchangehanlder} placeholder="PIN CODE" required />
          <input name="country" value={data.country} onChange={onchangehanlder} placeholder="COUNTRY" required />
        </div>
        <input name="phone" value={data.phone} onChange={onchangehanlder} placeholder="Phone Number" required />
      </div>

      {/* Right Side: Cart Summary */}
      <div className="placeorderright">
        <div className="cartTotal">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹{cartTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{cartTotal() === 0 ? 0 : 20}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{cartTotal() === 0 ? 0 : cartTotal() + 20}</b>
            </div>
          </div>
          <button type="submit">Place Order</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
