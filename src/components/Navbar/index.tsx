//import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import HamburgerMenu from "react-hamburger-menu";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";
//create navItem component
export const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleMenuClicked = () => {
    setIsNavOpen((prevState) => !prevState);
  };

  const handleNavClose = () => {
    setIsNavOpen(false);
  };
  return (
    <>
      <nav className=" md:pt-8 w-full  mx-auto fixed z-30">
        <div className="right-0 absolute sm:hidden pr-3 pt-4 z-50">
          <HamburgerMenu
            isOpen={isNavOpen}
            color={isNavOpen ? "#000" : "#fff"}
            menuClicked={handleMenuClicked}
            width={20}
            height={14}
          />
        </div>
        {isNavOpen ? (
          <ClickAwayListener onClickAway={handleNavClose}>
            <ul className="flex flex-col items-center justify-center bg-gray-200 py-8 w-full md:hidden text-gray-700 shadow opacity-90 font-semibold">
              <li onClick={handleNavClose} className="pb-1.5 cursor-pointer">
                <NavLink to="/stocks">Stocks</NavLink>
              </li>
              <li onClick={handleNavClose} className="pb-1.5 cursor-pointer">
                <NavLink to="/forex">Forex</NavLink>
              </li>
              <li onClick={handleNavClose} className="pb-1.5 cursor-pointer">
                <NavLink to="/crypto">Crypto</NavLink>
              </li>
              <li onClick={handleNavClose} className="pb-1.5 cursor-pointer">
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li onClick={handleNavClose} className="pb-1.5 cursor-pointer">
                <NavLink to="/fabout-us">About Us</NavLink>
              </li>
              <li onClick={handleNavClose} className="pb-1.5 cursor-pointer">
                <NavLink to="/login">Login</NavLink>
              </li>
              <li onClick={handleNavClose} className="pb-1.5 cursor-pointer">
                <NavLink to="/register">Register</NavLink>
              </li>
            </ul>
          </ClickAwayListener>
        ) : null}
        <ul className=" hidden sm:grid nav-ul g grid-cols-4 full">
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
