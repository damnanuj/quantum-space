import React, { useEffect, useState } from "react";
import "./UsersToFollow.scss";

import SuggestionsSkeleton from "../../../skeletons/SuggestionsSkeleton";
import { getUserSuggestions } from "../../../utils/apis/users/getUserSuggestions";
import UsersList from "../../Common/UsersList/UsersList";
import SeeMore from "../../Common/SeeMore/SeeMore";

const UsersToFollow = ({ onCloseDrawer }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);

  // Fetch suggestions
  const fetchSuggestions = async (page) => {
    setIsFetchingNextPage(true);
    try {
      const response = await getUserSuggestions(page);
      if (response.success && response.data.length > 0) {
        setSuggestions((prev) => [...prev, ...response.data]); // Append new suggestions
        setPages(response.totalPages); // Update total pages
      }
      // console.log(response);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
    } finally {
      setIsFetchingNextPage(false);
      setIsInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions(pageNumber);
  }, [pageNumber]);

  const loadMoreSuggestions = () => {
    if (pageNumber < pages && !isFetchingNextPage) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  const isLastPage = pageNumber >= pages; // Check if current page is the last page

  return (
    <div className="UsersToFollow_container">
      <h3>People you may follow</h3>

      {isInitialLoading ? (
        <SuggestionsSkeleton />
      ) : suggestions.length > 0 ? (
        <>
          {suggestions.map((user) => (
            <UsersList
              onCloseDrawer={onCloseDrawer}
              key={user.username}
              profileImg={user.profilePicture}
              name={user.name}
              userId={user._id}
              username={user.username}
            />
          ))}
          {!isLastPage || isFetchingNextPage ? (
            <SeeMore
              loadMore={loadMoreSuggestions}
              isLoading={isFetchingNextPage}
            />
          ) : (
            <div style={{ textAlign: "center", color: "#dc172a" }}>
              No more suggestions
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
