import React from "react";
import { Dropdown, Menu, message } from "antd";
import { deletePostApi } from "../../../utils/apis/feed/deletePostApi";

const PostMenu =  ({onPostDeleted, postId }) => {
  const handleMenuClick = async(e) => {
    if (e.key === "edit") {
      message.info("Edit option clicked");
    } else if (e.key === "delete") {
      try {
       const {data}= await deletePostApi(postId);
        message.success(data.message || "Post deleted successfully!");
        if (onPostDeleted) onPostDeleted(postId); 
      } catch (error) {
        message.error("Failed to delete the post. Please try again.");
      }
    } else {
      message.error("You are not authorized to delete this post.");
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
