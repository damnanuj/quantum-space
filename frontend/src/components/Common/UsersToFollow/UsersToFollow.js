import React, { useEffect, useState } from "react";
import "./UsersToFollow.scss";
import UsersList from "../UsersList/UsersList";

import SuggestionsSkeleton from "../../../skeletons/SuggestionsSkeleton";
import { getUserSuggestions } from "../../../utils/apis/users/getUserSuggestions";

const  UsersToFollow = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);

  // Fetch suggestions
  const fetchSuggestions = async (page) => {
    setIsLoading(true);
    const response = await getUserSuggestions(page);

    if (response.success && response.data.length > 0) {
      setSuggestions((prev) => [...prev, ...response.data]);
      setPageNumber(response.currentPage);
      setPages(response.totalPages);
    }

    setIsLoading(false);
    setIsInitialLoading(false);
  };

  useEffect(() => {
    fetchSuggestions(pageNumber);
  },[pageNumber]);

  const loadMoreSuggestions = () => {
    if (pageNumber < pages && !isLoading) {
      fetchSuggestions(pageNumber + 1);
    }
  };

  return (
    <div className="UsersToFollow_container">
      <h3>People you may follow</h3>

      {isInitialLoading ? (
        <SuggestionsSkeleton />
      ) : suggestions.length > 0 ? (
        <>
          {suggestions.map((user) => (
            <UsersList
              key={user.username}
              profileImg={user.profilePicture}
              name={user.name}
              username={user.username}
            />
          ))}

          {pageNumber < pages && (
            <div className="load-more-container">
              <p onClick={loadMoreSuggestions} disabled={isLoading}>
                {isLoading ? "Loading..." : "See more..."}
              </p>
            </div>
          )}
        </>
      ) : (
        <p>No suggestions available</p>
      )}
    </div>
  );
};

export default UsersToFollow;
