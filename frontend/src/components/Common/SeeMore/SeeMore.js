import React from "react";
import "./seemore.scss";
const SeeMore = ({ loadMore, isLoading }) => {
  return (
    <div className="load-more-container">
      <p onClick={loadMore} disabled={isLoading}>
        {isLoading ? "Loading..." : "See more..."}
      </p>
    </div>
  );
};

export default SeeMore;
