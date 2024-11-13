import React, { useContext } from "react";
import "./PostBlog.scss";
import CollectionsRoundedIcon from "@mui/icons-material/CollectionsRounded";


import RoundedBox from "../../Common/RoundedBox/RoundedBox";
import { AuthContext } from "../../../context/AuthContext";
// import RoundedBox from "../../Common/RoundedBox/RoundedBox";

const PostBlog = () => {
  const {userDetails} = useContext(AuthContext)
  return (
    <div className="postBlog_container">
      <div className="postBlog_top">
      <img src={userDetails.profilePicture} alt="userProfile" />
        <input disabled={true} className="explore_search" type="text" placeholder="What's happening?" />
        {/* <button className="commonBtnCSS postBtn">Post</button> */}
       
      </div>
      <div className="postBlog_bottom">
        <RoundedBox
          icon={<CollectionsRoundedIcon style={{ color: "#e66177" }} />}
          title={"Photos"}
        />
        {/* <RoundedBox
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
        /> */}
      </div>
    </div>
  );
};

export default PostBlog;
