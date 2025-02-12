import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import UsersList from "../UsersList/UsersList";
import { fetchSearchResult } from "../../../utils/apis/fetchSearchResult";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const users = await fetchSearchResult(searchQuery);
      setSuggestions(users);
      setLoading(false);
    };

    // Debounce API calls (wait 500ms after user stops typing)
    const timer = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(timer); // Cleanup function
  }, [searchQuery]);

  return (
    <div className="header_middle">
      <input
        className="explore_search"
        type="text"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Display suggestions below */}
      {loading && <p>Loading...</p>}
      {suggestions.length > 0 && (
        <div className="suggestions_list">
          {suggestions.map((user) => (
            <UsersList
              key={user._id} // Always add a unique key when mapping
              name={user.name}
              username={user.username}
              profileImg={user.profilePicture}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
