import React from "react";
import styles from "./order.module.css";

const Order = ({ handleOrderAscDesc, handleOrderRating }) => {
  return (
    <div>
      <div className={`${styles.orderAscDesc}`}>
        <select onChange={(e) => handleOrderAscDesc(e)}>
          <option value="default">Select by order</option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
      </div>
      <div className={`${styles.orderByRating}`}>
        <select onChange={(e) => handleOrderRating(e)}>
          <option value="default">Select by rating</option>
          <option value="best">Best</option>
          <option value="worst">Worst</option>
        </select>
      </div>
    </div>
  );
};

export default Order;
