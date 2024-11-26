import React from "react";
import "../UsersList/UsersList.scss";

const CommonButton = ({ text, color }) => {
  const className = color === "blue" ? "bluebg" : "whitebg";

  return <button className={`commonBtnCSS ${className}`}>{text}</button>;
};

export default CommonButton;
