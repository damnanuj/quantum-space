import React, { useEffect, useState } from "react";
import "./UsersToFollow.scss";

import SuggestionsSkeleton from "../../../skeletons/SuggestionsSkeleton";
import { getUserSuggestions } from "../../../utils/apis/users/getUserSuggestions";
import UsersList from "../../Common/UsersList/UsersList";

const UsersToFollow = () => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [suggestions, setSuggestions] = useState([]); // Suggestions data
  const [pageNumber, setPageNumber] = useState(1); // Current page
  const [pages, setPages] = useState(1); // Total pages

  // Fetch suggestions
  const fetchSuggestions = async (page) => {
    setIsLoading(true);
    setError(null); 

    try {
      const response = await getUserSuggestions(page);

      if (response.success && response.data.length > 0) {
        setSuggestions((prev) => [...prev, ...response.data]);
        setPageNumber(response.currentPage);
        setPages(response.totalPages);
      } else if (response.success && response.data.length === 0) {
        setError("No more suggestions available.");
      } else {
        throw new Error(response.message || "Failed to load suggestions.");
      }
    } catch (error) {
      console.error(error);
      setError("Failed to load suggestions. Please try again.");
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchSuggestions(1); // Fetch the first page on component mount
  }, []);

  // Load more suggestions
  const loadMoreSuggestions = () => {
    if (pageNumber < pages && !isLoading) {
      fetchSuggestions(pageNumber + 1);
    }
  };

  return (
    <div className="UsersToFollow_container">
      <h3>People you may follow</h3>

      {/* Initial Loading Skeleton */}
      {isInitialLoading && <SuggestionsSkeleton />}

      {/* Display Error Message */}
      {error && !isLoading && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {/* Display Suggestions */}
      {!isInitialLoading && !error && suggestions.length > 0 && (
        <>
          {suggestions.map((user) => (
            <UsersList
              key={user.username}
              profileImg={user.profilePicture}
              name={user.name}
              username={user.username}
            />
          ))}

          {/* Load More Button */}
          {pageNumber < pages && (
            <div className="load-more-container">
              <p onClick={loadMoreSuggestions} disabled={isLoading}>
                {isLoading ? "Loading..." : "See more..."}
              </p>
            </div>
          )}
        </>
      )}

      {/* Display Message when no suggestions */}
      {!isInitialLoading && !error && suggestions.length === 0 && (
        <p>No suggestions available</p>
      )}
    </div>
  );
};

export default UsersToFollow;
