import React, { useEffect, useState } from "react";
import backImage from "../assets/image/clay-banks-XvS-uKUoUao-unsplash.jpg";

const Hero = ({ children }) => {

  return (
    <div
      className="hero-img-container"
      style={{
        background: `url(${backImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="hero-overlay">
        <div className="hero-container">{children}</div>
      </div>
    </div>
  );
};

export default Hero;
