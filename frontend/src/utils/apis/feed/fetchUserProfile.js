import axios from "axios";
import { userEndpoints } from "../../endpoints";
import { jwtDecode } from "jwt-decode";

export const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("quantum-space");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const decoded = jwtDecode(token);
    const response = await axios.get(userEndpoints.getUser(decoded.username), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
