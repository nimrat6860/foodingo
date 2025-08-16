import React, { useContext, useEffect, useState } from "react";
import "./Myorder.css";
import axios from "axios";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/Context";
const Myorder = () => {
  const [data, setData] = useState([]);
  const { url, token } = useContext(StoreContext);
  const fetchorders = async () => {
    const response = await axios.post(
      url + "/api/order/userorder",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };
  useEffect(() => {
    if (token) {
      fetchorders();
    }
  }, [token]);
  return (
    <div className="myorders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="myorderorders">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ",";
                  }
                })}
              </p>
              <p>Rs {order.amount}.00</p>
              <p>Items : {order.items.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button onClick={fetchorders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Myorder;
