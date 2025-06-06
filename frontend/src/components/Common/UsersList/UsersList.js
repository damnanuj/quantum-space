import React from "react";
import "./UsersList.scss";
import CommonButton from "../Button/CommonButton";
import { useNavigate } from "react-router-dom";

const UsersList = ({ name, userId,username, profileImg , onCloseDrawer }) => {
  const navigate = useNavigate();

  function redirectToProfilePage() {
    if (onCloseDrawer) onCloseDrawer();
    navigate(`/profile/${userId}`);
  }
  return (
    <div className="UsersList_container">
      <img src={profileImg} alt="userProfile" onClick={redirectToProfilePage} />
      <div className="nameUsername" onClick={redirectToProfilePage}>
        <h4>{name}</h4>
        <span>{username}</span>
      </div>
      <CommonButton color={"white"} text={"Follow"} />
    </div>
  );
};

export default UsersList;
