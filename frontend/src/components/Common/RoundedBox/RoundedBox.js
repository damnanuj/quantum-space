import React from "react";

import "./RoundedBox.scss";
const RoundedBox = ({ icon, title }) => {
  return (
    <div
      className="roundedBox"
      style={{ border: "1px solid $dark-light-color" }}
    >
      {icon} <span> {title}</span>
    </div>
  );
};

export default RoundedBox;
