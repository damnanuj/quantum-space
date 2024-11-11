import React from "react";
import "./ProfileButton.scss";
const ProfileButton = ({ profile, name}) => {
  return (
    <div className="profile_button">
      <img src={profile} alt="profile" />
      <p>{name}</p>
      <span className="material-icons down">arrow_drop_down</span>
    </div>
  );
};

export default ProfileButton;
