import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import Cards from "../components/Cards";

const HomeScreen = () => {
  const {
    isLoadingCategory,
    dataCategory,
    getSpecCategory,
    loadingProducts,
    sortedData,
    selectedOrderBy,
    handleSelectedChange,
    activeSelectedCategory,
  } = useGlobalContext();

  return (
    <>
      <Hero>
        <div className="home-hero container">
          <div className="home-hero-text">
            <h2>The Modern Maven</h2>
            <h4>Where Shopping Comes to Life</h4>
            <p>
              Welcome to Mall Haven, your ultimate destination for shopping,
              entertainment, and more. Step into a world of excitement and
              indulge in a one-of-a-kind shopping experience that caters to all
              your desires.
            </p>
            <Link to="/about" className="btn btn-primary">
              <span>Discover more</span>
            </Link>
          </div>
        </div>
      </Hero>
      <div className="container">
        <h2 className="section-title">Our Product's</h2>
        <div className="d-flex">
          <div className="col-15">
            <h5 className="section-subtitle">Category:</h5>
            <ul className="list-category">
              {!isLoadingCategory &&
                dataCategory &&
                dataCategory.map((category, id) => {
                  return (
                    <li
                      onClick={(e) => getSpecCategory(e, id)}
                      className={`category-item ${
                        activeSelectedCategory === id ? "selected" : ""
                      }`}
                      key={id}
                    >
                      {category}
                    </li>
                  );
                })}
            </ul>
            <div className="filter-container">
              <p>Filter Products</p>
              <select
                value={selectedOrderBy}
                onChange={handleSelectedChange}
                className="filter-item"
              >
                <option>Order by:</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="highest-price">Highest Price</option>
                <option value="order-AZ">Order A-Z</option>
                <option value="order-ZA">Order Z-A</option>
              </select>
            </div>
          </div>
          <div className="col-85 d-grid">
            {!loadingProducts &&
              sortedData &&
              sortedData.map((products) => {
                return <Cards key={products.id} {...products} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
