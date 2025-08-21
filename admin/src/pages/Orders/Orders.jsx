import React from "react";
import "./Orders.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
const Orders = () => {
  const url = "https://foodingo-backend-dj72.onrender.com";
  const [orders, setOrders] = useState([]);
  const fetchallorders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  const statushandler=async(e,orderId)=>{
const response = await axios.post(url+"/api/order/status",{
  orderId,
  status:e.target.value
})
if(response.data.success){
  await fetchallorders();
}
  }
  useEffect(() => {
    fetchallorders();
  }, []);
  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="orderlist">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="orderitemfood">
                {order.items.map((item, index) => {
                  if (index == order.items.length - 1) {
                    return item.name + "x" + item.quantity;
                  } else {
                    return item.name + "x" + item.quantity + ",";
                  }
                })}
              </p>
              <p className="OrderItemname">
                {order.address.firstname + " " + order.address.lastname}
              </p>
              <div className="orderitemaddress">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", "+order.address.country + ", "+order.address.pincode}</p>
              </div>
              <p className="orderitemphone">{order.address.phone}</p>

            </div>
            <p>Items : {order.items.length}</p>
            <p>Rs {order.amount}</p>
            <select onChange={(event)=>statushandler(event,order._id)} value ={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
