import React from "react";
import { Dropdown, Menu, message } from "antd";

const PostMenu = () => {
  const handleMenuClick = (e) => {
    if (e.key === "edit") {
      message.info("Edit option clicked");
    } else if (e.key === "delete") {
      message.info("Delete option clicked");
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="edit">Edit</Menu.Item>
      <Menu.Item key="delete">Delete</Menu.Item>
    </Menu>
  );

  return (
    <div className="postMenu">
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        placement="leftTop"
        overlayStyle={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <i
          className="fa-solid fa-ellipsis-vertical"
          style={{ cursor: "pointer", fontSize: "20px" }}
        />
      </Dropdown>
    </div>
  );
};

export default PostMenu;
