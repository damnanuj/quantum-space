import React from "react";
import profile from "../../../imgs/profilemale.png";
import "./ProfilePics.scss"


export const ProfileMini = () => {
  return <img className="profile_mini" src={profile} alt="profile" />;
};
export const ProfileLarge = () => {
  return <img className="profile_large" src={profile} alt="profile" />;
};
export const ProfileMedium = () => {
  return <img className="profile_medium" src={profile} alt="profile" />;
};
