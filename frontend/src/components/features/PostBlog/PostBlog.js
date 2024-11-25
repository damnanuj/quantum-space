import React from "react";
import "./PostBlog.scss";

import profile from "../../../imgs/profilemale.png";

const PostBlog = () => {
  return (
    <div className="postBlog_container">
      <div className="postBlog_top">
        <img src={profile} alt="userProfile" />
        <input
          disabled={true}
          className="explore_search"
          type="text"
          placeholder="What's happening?"
        />
      </div>
    </div>
  );
};

export default PostBlog;
