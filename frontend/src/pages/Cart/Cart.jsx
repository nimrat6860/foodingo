import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const Cart = ({ setLogin }) => {
  const { cartItems, food_list, removeFromCart, cartTotal, url, token } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const hasCartItems = cartTotal() > 0;

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] && cartItems[item._id] > 0) {
            return (
              <React.Fragment key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹ {item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>

      <div className="cartBottom">
        <div className="cartTotal">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹ {cartTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {hasCartItems ? 20 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹ {hasCartItems ? cartTotal() + 20 : 0}</b>
            </div>
          </div>

          {hasCartItems && (
            token ? (
              <button onClick={() => navigate("/order")}>Proceed to checkout</button>
            ) : (
              <button onClick={() => setLogin(true)}>Please first Sign In</button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

