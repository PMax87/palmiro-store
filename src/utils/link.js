import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const links = [
  {
    url: "/",
    text: "Home",
  },
  {
    url: "/shop",
    text: "Shop",
  },
  {
    url: "/about",
    text: "About",
  },
  {
    url: "/contacts",
    text: "Contatti",
  },
];

const cart = [
  {
    url: "/cart",
    icon: <FontAwesomeIcon icon={faCartShopping} />,
  },
];

const LinkComponent = () => {

  const {countInCart} = useGlobalContext();

  return (
    <ul className="d-flex align-center">
      {links.map((link) => {
        return (
          <li key={link.text} className="anchor-container">
            <Link to={link.url} className="anchor-style">
              {link.text}
            </Link>
          </li>
        );
      })}
      {cart.map((icon, id) => {
        return <li key={id}><Link to={icon.url}>{icon.icon}</Link><p>{countInCart}</p></li>;
      })}
    </ul>
  );
};

export { LinkComponent };
