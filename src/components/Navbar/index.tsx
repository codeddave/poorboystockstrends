//import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
//create navItem component
export const Navbar = () => {
  return (
    <nav className="pt-8 w-full lg:w-11/12 mx-auto">
      <ul className=" nav-ul flex justify-between lg:pr-14 full">
        <div>
          <NavLink
            to="/"
            className="ml-2 md:ml-6 font-bold text-xl cursor-pointer"
          >
            POORBOY STOCKS TRENDS
          </NavLink>
        </div>
        <div>
          <NavLink
            to="/stocks"
            className=" cursor-pointer "
            activeClassName="nav-active"
          >
            Stocks
          </NavLink>
          <NavLink
            to="/forex"
            className="ml-2 md:ml-6 cursor-pointer "
            activeClassName="nav-active"
          >
            Forex
          </NavLink>
          <NavLink
            to="/crypto"
            className="ml-2 md:ml-6 cursor-pointer"
            activeClassName="nav-active"
          >
            Crypto
          </NavLink>
          {/*      <NavLink
            to="/"
            className="ml-2 md:ml-6 cursor-pointer"
            activeClassName="nav-active"
          >
            Indexes
          </NavLink>
          <NavLink to="/" className="ml-2 md:ml-6 cursor-pointer">
            Commodities
          </NavLink> */}
          <NavLink to="/profile" className="ml-2 md:ml-6 cursor-pointer">
            Profile
          </NavLink>
          <NavLink to="/about-us" className="ml-2 md:ml-6 cursor-pointer">
            About Us
          </NavLink>
        </div>

        <div>
          <NavLink
            to="/login"
            className=" cursor-pointer"
            activeClassName="nav-active"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="ml-2 md:ml-6 cursor-pointer"
            activeClassName="nav-active"
          >
            Register
          </NavLink>
        </div>
      </ul>
    </nav>
  );
};
