import axios from "axios";
import { userEndpoints } from "../../endpoints";


export const getUserSuggestions = async (pageNumber) => {
  try {
    const response = await axios.get(
      `${userEndpoints.getSuggestions}?page=${pageNumber}`,
      { withCredentials: true }
    );
    const { data, currentPage, totalPages } = response.data;

    return { data, currentPage, totalPages, success: true };
  } catch (error) {
    console.error("Failed to get suggestions:", error);
    return { success: false, error };
  }
};
