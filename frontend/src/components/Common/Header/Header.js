import React from "react";
import logo from "../../../imgs/logo.png";
import "./Header.scss";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import DropMenu from "../../ProfileDropDown/DropMenu";
import MobileDrawer from "../../MobileDrawer/MobileDrawer";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header_container">
      <div className="header_left">
        <img className="logo" src={logo} alt="logo" />
      </div>

      <div className="header_middle">
        <input className="explore_search" type="text" placeholder="#explore" />
      </div>

      <div className="header_right">
        <Link to={"/dashboard"}>
          <HomeRoundedIcon className="home" />
        </Link>

        <NotificationsRoundedIcon className="notification" />
        <div className="MobileDrawer">
          <MobileDrawer />
        </div>
        <DropMenu />
        {/* <MobileDrawer /> */}
      </div>
    </div>
  );
};

export default Header;
