import axios from "axios";
import { authEndpoints } from "../../endpoints";

export const logout = async () => {
  try {
    const response = await axios.post(authEndpoints.logout);
    if (response.data.success) {
      return response.data;
    } else {
      return response.data;
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred during logout.";
    console.error("Error logging out:", errorMessage);

    return { success: false, message: errorMessage };
  }
};
