import React from "react";
import "./SearchBox.scss";
const SearchBox = ({ placeholder, flag }) => {
  let backColor
  if(flag ==="extraLight"){
   backColor = {backgroundColor:"#28353e"}
  }

  return (
    <input
    style={backColor}
      className="searchBox postSearch"
      type="text"
      placeholder={placeholder}
    />
  );
};

export default SearchBox;
