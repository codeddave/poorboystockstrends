//import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
//create navItem component
export const Navbar = () => {
  return (
    <nav className="pt-6 ">
      <ul className="flex justify-center nav-ul">
        <NavLink to="/" className="ml-4 font-bold text-lg cursor-pointer">
          POORBOY STOCKS TRENDS
        </NavLink>
        <NavLink to="/" className="ml-10 cursor-pointer hover:text-3xl">
          Stocks
        </NavLink>
        <NavLink to="/" className="ml-4 cursor-pointer">
          Forex
        </NavLink>
        <NavLink to="/" className="ml-4 cursor-pointer">
          Crypto
        </NavLink>
        <NavLink to="/" className="ml-4 cursor-pointer">
          Indexes
        </NavLink>
        <NavLink to="/" className="ml-4 cursor-pointer">
          Commodities
        </NavLink>
        <NavLink to="/" className="ml-4 cursor-pointer">
          Profile
        </NavLink>
        <NavLink to="/" className="ml-4 cursor-pointer">
          About Us
        </NavLink>
        <NavLink to="/" className="ml-10 cursor-pointer">
          Login
        </NavLink>
        <NavLink to="/" className="ml-4 cursor-pointer">
          Register
        </NavLink>
      </ul>
    </nav>
  );
};
