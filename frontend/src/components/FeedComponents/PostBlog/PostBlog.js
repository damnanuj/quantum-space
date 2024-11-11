import React from "react";
import "./PostBlog.scss";
// import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";

import userProfile from "../../../imgs/profilemale.png"
// import RoundedBox from "../../Common/RoundedBox/RoundedBox";

const PostBlog = () => {
  return (
    <div className="postBlog_container">
      <div className="postBlog_top">
      <img src={userProfile} alt="userProfile" />
        <input disabled={true} className="explore_search" type="text" placeholder="What's happening?" />
        {/* <button className="commonBtnCSS postBtn">Post</button> */}
       
      </div>
      {/* <div className="postBlog_bottom">
        <RoundedBox
          icon={<CollectionsRoundedIcon style={{ color: "#DBEAEE" }} />}
          title={"Photos"}
        />
        <RoundedBox
          icon={<CollectionsRoundedIcon style={{ color: "#DBEAEE" }} />}
          title={"Photos"}
        />
        <RoundedBox
          icon={<CollectionsRoundedIcon style={{ color: "#DBEAEE" }} />}
          title={"Photos"}
        />
        <RoundedBox
          icon={<CollectionsRoundedIcon style={{ color: "#DBEAEE" }} />}
          title={"Photos"}
        />
      </div> */}
    </div>
  );
};

export default PostBlog;
