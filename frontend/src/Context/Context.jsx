import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://foodingo-backend-dj72.onrender.com"
  const [token,setToken]=useState("")
 const [food_list,setFoodlist] = useState([])
  const [loading, setLoading] = useState(true); 

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      await loadcartdata(token);
    }
  };
  const removeFromCart = async(itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
      await loadcartdata(token);
    }
  };
  const cartTotal = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if(cartItems[item]>0){
      let itemInfo = food_list.find((product) => product._id === item);
      totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const fetchfoodlist=async()=>{
    const response = await axios.get(url+"/api/food/list");
setFoodlist(response.data.data)
    setLoading(false);

  }
  const loadcartdata=async(token)=>{
    const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setCartItems(response.data.cartData || {});
  }
  useEffect(()=>{
async function loaddata(){
  await fetchfoodlist()
  if(localStorage.getItem('token')){
  setToken(localStorage.getItem('token'))
  await loadcartdata(localStorage.getItem('token'))
}
}
loaddata()
  },[])
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    cartTotal,
    url,
    token,
    setToken,
    loading
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
