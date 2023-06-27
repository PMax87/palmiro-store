import React from "react";
import { DataRepository } from "../DataRespository";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import FormatNumber from "../utils/FormatNumber";
import starCreator from "../utils/starCreator";
import { useGlobalContext } from "../context";

const SingleProductScreen = () => {
  const { id } = useParams();

  const getProdData = async () => {
    const res = await DataRepository.getProductData(id);
    return res;
  };

  const { addToCart, productQty, addProductQty, decProductQty } = useGlobalContext();

  const handleDecQty = () => {
      if (productQty - 1 > 0) {
        decProductQty()
      }
  }

  const { isLoading, error, data } = useQuery(["product"], getProdData);

  if (isLoading && !data) {
    return console.log("Pippo");
  }

  const { image, title, description, price } = data.data;
  const { rate, count } = data.data.rating;

  return (
    <div className="container">
      <div className="single-product-container d-flex align-center">
        <div className="image-product-container col-50">
          <img src={image} alt={title} className="product-image" />
        </div>
        <div className="description-container col-50">
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{FormatNumber(price)}</p>
          <p>
            {starCreator(rate)} + {rate}
          </p>
          <p>{count}</p>
          <button onClick={() => addToCart(id, title, price, image, productQty)}>Insert</button>
          <div className="qty-container">
            <button onClick={handleDecQty}>
              -
            </button>
            <p>{productQty}</p>
            <button onClick={addProductQty}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductScreen;
