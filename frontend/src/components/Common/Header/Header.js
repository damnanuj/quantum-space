import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.scss";


import DropMenu from "../../ProfileDropDown/DropMenu";
import MobileDrawer from "../../MobileDrawer/MobileDrawer";

const Header = () => {
  const navItems = [
    { path: "/feed", 
      icon: <i className="fa-solid fa-house"></i>, 
      label: "Home" 
    },
    {
      path: "/notifications",
      icon: <i className="fa-solid fa-bell"></i>,
      label: "Notifications",
    },
  ];

  return (
    <div className="header_container">
      <div className="header_left">
        <h1 className="logo">QuantumSpace</h1>
      </div>

      <div className="header_middle">
        <input className="explore_search" type="text" placeholder="#explore" />
      </div>

      <div className="header_right">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav_icon active" : "nav_icon"
            }
          >
            {item.icon}
          </NavLink>
        ))}
        <div className="MobileDrawer">
          <MobileDrawer />
        </div>
        <DropMenu />
      </div>
    </div>
  );
};

export default Header;
