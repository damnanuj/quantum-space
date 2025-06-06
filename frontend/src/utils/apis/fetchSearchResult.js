import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { userEndpoints } from "../endpoints";

export const fetchSearchResult = async (searchQuery) => {
 

  try {
    const token = localStorage.getItem("quantum-space");
    if (!token) return [];

    const { userId } = jwtDecode(token); // Decode user info if needed

    const response = await axios.get(
      userEndpoints.fetchSearchQuery(searchQuery),
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }
};
