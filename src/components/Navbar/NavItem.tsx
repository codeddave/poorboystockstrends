import { FC } from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  navTitle: string;
  linkTo: string;
};
const NavItem: FC<NavItemProps> = ({ navTitle, linkTo }) => {
  return (
    <>
      <NavLink to={linkTo} className="">
        {navTitle}
      </NavLink>
    </>
  );
};

export default NavItem;
