import axios from "axios";
import { userEndpoints } from "../../endpoints";

export const getUserSuggestions = async (pageNumber) => {
  try {
    const token = localStorage.getItem("quantum-space");

    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await axios.get(
      `${userEndpoints.getSuggestions}?page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data, currentPage, totalPages } = response.data;

    return { data, currentPage, totalPages, success: true };
  } catch (error) {
    console.error("Failed to get suggestions:", error);
    return { success: false, error };
  }
};
