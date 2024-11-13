import React from "react";
import { Tabs } from "antd";


import "./feedTabs.scss"


const onChange = (key) => {
    console.log(key);
  };
const items = [
  {
    key: "1",
    label: "For You",
    children: "All users Posts will be here",
  },
  {
    key: "2",
    label: "Following",
    children: "Only Following user's post will be here",
  },
];
const FeedTabs = () => (
    <div className="feedTabs-container">
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} /></div>
);
export default FeedTabs;
