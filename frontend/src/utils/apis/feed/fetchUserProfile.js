import axios from "axios";
import { userEndpoints } from "../../endpoints";

export const fetchUserProfile = async (username) => {
  try {
    const response = await axios.get(userEndpoints.getUser(username), {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch profile",
    };
  }
};
