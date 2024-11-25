import React, { useEffect, useState } from "react";
import "./UsersToFollow.scss";

import SuggestionsSkeleton from "../../../skeletons/SuggestionsSkeleton";
import { getUserSuggestions } from "../../../utils/apis/users/getUserSuggestions";
import UsersList from "../../Common/UsersList/UsersList";
import SeeMore from "../../Common/SeeMore/SeeMore";

const UsersToFollow = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);

  // Fetch suggestions
  const fetchSuggestions = async (page) => {
    setIsLoading(true);
    try {
      const response = await getUserSuggestions(page);
      if (response.success && response.data.length > 0) {
        setSuggestions((prev) => [...prev, ...response.data]);
        setPages(response.totalPages); // Update total pages
      }
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions(pageNumber); // Fetch suggestions when component mounts
  }, [pageNumber]);

  const loadMoreSuggestions = () => {
    if (pageNumber < pages && !isLoading) {
      setPageNumber((prevPage) => prevPage + 1); // Increment page number
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
            <SeeMore loadMore={loadMoreSuggestions} isLoading={isLoading} />
          )}
        </>
      ) : (
        <p>No suggestions available</p>
      )}
    </div>
  );
};

export default UsersToFollow;
