import React from "react";
import FormatNumber from "../utils/FormatNumber";
import { useGlobalContext } from "../context";

const SingleProductCart = ({ id, title, price, image, qty }) => {
  const { addPrdQtInCart, decPrdQtInCart, deleteSingleItem } = useGlobalContext();

  const handleDecQty = () => {
    if (qty - 1 > 0) {
      decPrdQtInCart(id, qty);
    } else {
      deleteSingleItem(id)
    }
  };

  return (
    <div className="products-row d-flex align-center">
      <div className="img-title-container col-40">
        <div className="img-cart-container">
          <img src={image} alt={title} />
        </div>
        <div className="products-cart-title">
          <p>{title}</p>
        </div>
      </div>
      <div className="item-cart-price col-20 text-center">
        <p>{FormatNumber(price)}</p>
      </div>
      <div className="cart qty col-20 text-center">
        <button onClick={() => addPrdQtInCart(id, qty)}>+</button>
        <p>{qty}</p>
        <button onClick={handleDecQty}>-</button>
      </div>
      <div className="col-20 text-center">
        <p>{FormatNumber(qty * price)}</p>
      </div>
      <div>
        <button onClick={() => deleteSingleItem(id)}>X</button>
      </div>
    </div>
  );
};

export default SingleProductCart;
