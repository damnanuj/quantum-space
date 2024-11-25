import axios from "axios";
import { authEndpoints } from "../../endpoints";
import { message } from "antd";

export const logout = async () => {
  try {
    const response = await axios.post(authEndpoints.logout);

    // Accessing success from response.data
    if (response.data.success) {
      localStorage.removeItem("quantum-space");
      message.success(response.data.message || "Logout successful");
      return true;
    } else {
      message.error(response.data.message || "Failed to logout");
      return false; 
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred during logout.";
    console.error("Error logging out:", errorMessage);
    message.error(errorMessage);
    return false; 
  }
};
