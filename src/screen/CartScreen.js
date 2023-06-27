import React from "react";
import { useGlobalContext } from "../context";
import TotalBox from "../components/TotalBox";
import SingleProductCart from "../components/SingleProductCart";

const CartScreen = () => {
  const { cart, deleteAllItems } = useGlobalContext();

  return (
    <div className="cart-container">
      <header className="cart-header">
        <h2>Cart</h2>
      </header>
      <div className="cart-product-container">
        <div className="cart-legend">
          <p className="col-40">Item</p>
          <p className="col-20">Price</p>
          <p className="col-20">Quantity</p>
          <p className="col-20">Subtotal</p>
        </div>
        <hr />
        {cart.map((products, id) => {
          return <SingleProductCart key={id} {...products}/>;
        })}
      </div>
      <div><button onClick={() => deleteAllItems()}>Delete All Cart</button></div>
      <TotalBox />
    </div>
  );
};

export default CartScreen;
