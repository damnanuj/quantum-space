import React from "react";
import UsersList from "../UsersList/UsersList";
import "./styles.scss";
import SmallLoader from "../Loader/SmallLoader";

const SearchResultBox = ({ searchResult, loading, onUserClick }) => {
  return (
    <div className="searchResultContainer">
      {loading ? (
        <SmallLoader />
      ) : searchResult.length > 0 ? (
        searchResult.map((user) => (
          <div
            key={user._id}
            onClick={onUserClick}
            style={{ cursor: "pointer" }}
          >
            <UsersList
              name={user.name}
              username={user.username}
              profileImg={user.profilePicture}
            />
          </div>
        ))
      ) : (
        <p className="noResults">No results found</p>
      )}
    </div>
  );
};

export default SearchResultBox;
