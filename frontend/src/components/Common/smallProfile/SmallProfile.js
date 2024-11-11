import React, { useContext } from "react";
import "./SmallProfile.scss";
import profileMale from "../../../imgs/profilemale.png";
import profileFemale from "../../../imgs/profilefemale.png";
import coverPhoto from "../../../imgs/coverImg.jpg";
import { AuthContext } from "../../../context/AuthContext";

import SmallProfileSkeleton from "../../../skeletons/SmallProfileSkeleton";

const SmallProfile = () => {
  const { userDetails: user } = useContext(AuthContext);

 

  // Skeleton fallback UI while loading
  if (!user) {
    return <SmallProfileSkeleton />;
  }

  return (
    <div className="small_profile_container">
      <div className="small_profile_top">
        {/* Cover Photo as background image */}
        <div
          className="cover-photo"
          style={{
            backgroundImage: `url(${user.coverPicture || coverPhoto})`,
          }}
        />

        {/* Profile Picture */}
        <div className="logo_holder">
          <img
            className="maleProfile"
            src={
              user.profilePicture
                ? user.profilePicture
                : user.gender === "male"
                ? profileMale
                : profileFemale
            }
            alt={`${user.username || "User"}'s profile`}
          />
        </div>
      </div>

      {/* Profile Bottom Section */}
      <div className="small_profile_bottom">
        <div className="nameUserNameBio">
          <h3 className="name">{user.name || "Unknown User"}</h3>
          <p className="username">@{user.username || "unknown"}</p>
          <p className="bio">{user.about || "No bio available"}</p>
        </div>

        {/* Followers and Following Counts */}
        <div className="follow-counts">
          <div className="follower">
            <h4>{user.followers ? user.followers.length : "0"}</h4>
            <p>Followers</p>
          </div>
          <div className="following">
            <h4>{user.following ? user.following.length : "0"}</h4>
            <p>Following</p>
          </div>
        </div>

        {/* Profile Link */}
        <div className="myProfileBtn">
          <a href={`/profile/${user.username || ""}`}>My Profile</a>
        </div>
      </div>
    </div>
  );
};

export default SmallProfile;
