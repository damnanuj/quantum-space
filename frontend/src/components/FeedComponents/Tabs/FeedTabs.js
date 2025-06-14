import React from "react";
import { Tabs } from "antd";

import "./feedTabs.scss";

import Posts from "../Posts/Posts";
import FollowingPosts from "../Posts/FollowingPosts";

const onChange = (key) => {
  // console.log(key);
};
const items = [
  {
    key: "1",
    label: "For You",
    children: <Posts />,
  },
  {
    key: "2",
    label: "Following",
    children: <FollowingPosts />,
  },
];
const FeedTabs = () => (
  <div className="feedTabs-container">
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
  </div>
);
export default FeedTabs;
