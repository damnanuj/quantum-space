import React from "react";
import profileMale from "../../../imgs/profilemale.png";
import profileFemale from "../../../imgs/profilefemale.png";
import "./UsersList.scss";

const UsersList = ({ name, username, gender, profileImg }) => {
  return (
    <div className="UsersList_container">
      <img
        src={profileImg || gender === "male" ? profileMale : profileFemale}
        alt="userProfile"
      />
      <div className="nameUsername">
        <h4>{name}</h4>
        <span>{username}</span>
      </div>
      <button className="commonBtnCSS followBtn">Follow</button>
    </div>
  );
};

export default UsersList;
