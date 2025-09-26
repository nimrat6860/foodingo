import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/Context";
import FoodItem from "../FoodItem/FoodItem";
const FoodDisplay = ({ category }) => {
  const { food_list,loading } = useContext(StoreContext);
  if (loading) {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <div className="loader-text">
        Fetching fresh <span>dishes 🍲</span> ...
      </div>
    </div>
  );
}

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if ((category === "All" || category === item.category)) {
            return (
              <FoodItem
                key={item.index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
