import React from "react";
import "./userProfile.scss";
import CommonButton from "../Button/CommonButton";

const UserProfile = ({ isLoggedUser = true }) => {
  const user = {
    name: "Anuj Kumar",
    username: "anuj",
    location: "Patna, India",
    about: "Web Developer | Tech Enthusiast",
    coverPhoto:
      "https://i.pinimg.com/736x/b6/0e/bb/b60ebb76818e10a1ffeb1d76ef807568.jpg",
    profileImage: "https://randomuser.me/api/portraits/men/6.jpg",
    followers: 120,
    following: 80,
    isFollowed: false,
  };
  return (
    <div className="userProfileContainer">
      {/* Cover Photo */}
      <div className="coverPhoto">
        <img
          alt="coverPic"
          src={user.coverPhoto || "https://via.placeholder.com/800x150"}
        />
      </div>

      {/* Profile Section */}
      <div className="profileSection">
        <div className="profileImage">
          <img
            alt="profilePic"
            src={user.profileImage || "https://via.placeholder.com/100"}
          />
        </div>
      </div>
      <div className="detailsContainer">
        <div className="userDetails">
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
          <p>{user.about}</p>
          <p>{user.location}</p>

          <div className="stats">
            <div>
              <strong>{user.followers}</strong> Followers
            </div>
            <div>
              <strong>{user.following}</strong> Following
            </div>
          </div>
        </div>

            <p style={{color:"Red"}}>Development is in progress</p>
        <div className="editFollowButton">
          {isLoggedUser ? (
            <CommonButton text={"Edit Profile"} color={"blue"} />
          ) : (
            <CommonButton
              color={user.isFollowed ? "blue" : "white"}
              text={user.isFollowed ? "Following" : "Follow"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
