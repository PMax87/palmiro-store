import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import { useGlobalContext } from "../context";
import FormatNumber from "../utils/FormatNumber";

const Cards = ({ id, image, price, title }) => {

  const {truncateTitleLength} = useGlobalContext();

  const navigate = useNavigate();

  const navigateTo = (id) => {
    navigate(`/products/${id}`)
  }

  return (
    <div className="card-container">
      <div className="img-card-container" style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}>
      </div>
      <div className="card-title">
        <h6>{truncateTitleLength(title)}</h6>
      </div>
      <div className="card-subtitle">
        <p>Price: {FormatNumber(price)}</p>
        <button type="button" className="btn btn-secondary" onClick={() => navigateTo(id)}>View Details</button>
      </div>
    </div>
  );
};

export default Cards;
