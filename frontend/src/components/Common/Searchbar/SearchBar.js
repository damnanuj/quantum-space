import React, { useState, useEffect } from "react";
import { fetchSearchResult } from "../../../utils/apis/fetchSearchResult";
import SearchResultBox from "./SearchResultBox";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]); // Clear suggestions if input is empty
      return;
    }

    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await fetchSearchResult(searchQuery);

        // Ensure the latest search result matches the current query
        setSuggestions(users.length > 0 ? users : []);
      } catch (error) {
        console.error("Error fetching users:", error);
        setSuggestions([]); // Ensure it's cleared on error
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchUsers, 500); // Debounce input

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Function to handle user click and reset input
  const handleUserClick = () => {
    setSearchQuery(""); // Clear input field
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="header_middle">
      <input
        className="explore_search"
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Ensure SearchResultBox shows loading & "No results found" correctly */}
      {(suggestions.length > 0 || loading || searchQuery) && (
        <SearchResultBox
          loading={loading}
          searchResult={suggestions}
          onUserClick={handleUserClick}
        />
      )}
    </div>
  );
};

export default SearchBar;
