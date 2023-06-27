import React from "react";
import { LinkComponent } from "../utils/link";
import { Link } from "react-router-dom";
import Logo from "../assets/image/logo.png"

const Navbar = () => {
  return (
    <nav className="nav d-flex align-center">
      <div className="navbar-container">
        <header className="nav-header">
          <Link to="/" className="">
            <h2 className="brand-color-title">Tarquinio Store</h2>
          </Link>
          <div className="logo-container">
            <img className="logo" src={Logo} alt="Logo Store" />
          </div>
          <div className="link-container">
            <LinkComponent />
          </div>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;
