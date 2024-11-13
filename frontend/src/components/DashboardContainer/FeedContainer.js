import React from "react";

import "./FeedContainer.scss";

import UsersToFollow from "../Common/UsersToFollow/UsersToFollow";
import PostBlog from "../FeedComponents/PostBlog/PostBlog";
import SmallProfile from "../Common/smallProfile/SmallProfile";
import FeedTabs from "../FeedComponents/Tabs/FeedTabs";





const FeedContainer = () => {
  return (
    <div className="main_dashboard">
      <div className="left_dashboard">
        <SmallProfile />
      </div>
      <div className="middle_dashboard">
        <PostBlog />
        <FeedTabs/>
      </div>
      <div className="right_dashboard">
        <UsersToFollow />
      </div>
    </div>
  );
};

export default FeedContainer;
