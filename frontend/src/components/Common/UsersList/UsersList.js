import React from "react";
import "./UsersList.scss";


const UsersList = ({ name, username, profileImg }) => {
  return (
    <div className="UsersList_container">
      <img src={profileImg} alt="userProfile" />
      <div className="nameUsername">
        <h4>{name}</h4>
        <span>{username}</span>
      </div>
      <button className="commonBtnCSS followBtn">Follow</button>
    </div>
  );
};

export default UsersList;
