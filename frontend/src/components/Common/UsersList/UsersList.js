import React from "react";
import "./UsersList.scss";
import CommonButton from "../Button/CommonButton";


const UsersList = ({ name, username, profileImg }) => {
  return (
    <div className="UsersList_container">
      <img src={profileImg} alt="userProfile" />
      <div className="nameUsername">
        <h4>{name}</h4>
        <span>{username}</span>
      </div>
      <CommonButton color={"white"} text={"Follow"}/>
      
    </div>
  );
};

export default UsersList;
