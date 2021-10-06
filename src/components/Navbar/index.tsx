//import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
//create navItem component
export const Navbar = () => {
  return (
    <>
      <nav className="pt-8 w-full  mx-auto">
        <ul className=" nav-ul grid grid-cols-4   full">
          <div className="place-self-center">
            <NavLink
              to="/"
              className="ml-2 font-bold text-lg lg:text-xl cursor-pointer text-center"
            >
              POORBOY STOCKS TRENDS
            </NavLink>
          </div>
          <div className="col-span-2  place-self-center">
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

          <div className="place-self-center">
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
    </>
  );
};
