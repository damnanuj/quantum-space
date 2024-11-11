import React from "react";

import "./DashboardContainer.scss";

import UsersToFollow from "../Common/UsersToFollow/UsersToFollow";
import PostBlog from "../FeedComponents/PostBlog/PostBlog";
import SmallProfile from "../Common/smallProfile/SmallProfile";





const DashboardContainer = () => {
  return (
    <div className="main_dashboard">
      <div className="left_dashboard">
        <SmallProfile />
      </div>
      <div className="middle_dashboard">
        <PostBlog />
        
      </div>
      <div className="right_dashboard">
        <UsersToFollow />
      </div>
    </div>
  );
};

export default DashboardContainer;
