import React from "react";
import { useGlobalContext } from "../context";

const ChangePrdQty = () => {
  const { itemQty, decQty, addQty, item } = useGlobalContext();

  return (
    <div>
      <div className="qty-container">
        <button onClick={decQty}>-</button>
        <p>{itemQty}</p>
        <button onClick={addQty}>+</button>
      </div>
    </div>
  );
};

export default ChangePrdQty;
