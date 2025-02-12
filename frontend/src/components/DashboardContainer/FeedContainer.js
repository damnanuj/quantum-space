import React from "react";
import { useLocation } from "react-router-dom"; // Hook to get the current route
import "./FeedContainer.scss";

import SmallProfile from "../Common/smallProfile/SmallProfile";

import UsersToFollow from "../features/UsersToFollow/UsersToFollow";

import { Outlet } from "react-router-dom";

const FeedContainer = () => {
  const location = useLocation();

  
  const isProfilePage = location.pathname.startsWith("/profile/");

  return (
    <div className={`main_dashboard ${isProfilePage ? "profile_active" : ""}`}>
      <div className="left_dashboard">
     
        <SmallProfile />
      </div>
      <div className="middle_dashboard">
        <Outlet />
      </div>
      <div className="right_dashboard">
        <UsersToFollow />
      </div>
    </div>
  );
};

export default FeedContainer;
