import React from "react";
import styles from "./Order.module.css";

const Order = ({ handleOrderAscDesc, handleOrderRating }) => {
  return (
    <div className={styles.orderContainer}>
      <div className={styles.selectGroup}>
        <label>SORT BY ORDER</label>

        <select onChange={(e) => handleOrderAscDesc(e)} defaultValue="default">
          <option value="default">Select by order</option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
      </div>

      <div className={styles.selectGroup}>
        <label>SORT BY RATING</label>

        <select onChange={(e) => handleOrderRating(e)} defaultValue="default">
          <option value="default">Select by rating</option>
          <option value="best">Best</option>
          <option value="worst">Worst</option>
        </select>
      </div>
    </div>
  );
};

export default Order;