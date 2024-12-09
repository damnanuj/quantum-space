import React from "react";
import "../UsersList/UsersList.scss";

const CommonButton = ({ text, color, onClick }) => {
  const className = color === "blue" ? "bluebg" : "whitebg";

  return (
    <button className={`commonBtnCSS ${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default CommonButton;
