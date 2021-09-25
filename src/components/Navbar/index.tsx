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
            className="ml-2 md:ml-4 font-bold text-xl cursor-pointer"
          >
            POORBOY STOCKS TRENDS
          </NavLink>
        </div>
        <div>
          <NavLink to="/stocks" className=" cursor-pointer ">
            Stocks
          </NavLink>
          <NavLink to="/" className="ml-2 md:ml-4 cursor-pointer">
            Forex
          </NavLink>
          <NavLink to="/" className="ml-2 md:ml-4 cursor-pointer">
            Crypto
          </NavLink>
          <NavLink to="/" className="ml-2 md:ml-4 cursor-pointer">
            Indexes
          </NavLink>
          <NavLink to="/" className="ml-2 md:ml-4 cursor-pointer">
            Commodities
          </NavLink>
          <NavLink to="/" className="ml-2 md:ml-4 cursor-pointer">
            Profile
          </NavLink>
          <NavLink to="/" className="ml-2 md:ml-4 cursor-pointer">
            About Us
          </NavLink>
        </div>

        <div>
          <NavLink to="/login" className=" cursor-pointer">
            Login
          </NavLink>
          <NavLink to="/" className="ml-2 md:ml-4 cursor-pointer">
            Register
          </NavLink>
        </div>
      </ul>
    </nav>
  );
};
