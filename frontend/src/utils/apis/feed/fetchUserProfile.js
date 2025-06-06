import axios from "axios";
import { userEndpoints } from "../../endpoints";
import { jwtDecode } from "jwt-decode";

export const fetchUserProfile = async (userId) => {
  try {
    const token = localStorage.getItem("quantum-space");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }
    //  fetch user's profile by the userId
    const decoded = jwtDecode(token);

    const response = await axios.get(
      userEndpoints.getUser(userId || decoded.userId),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // console.log("response>>>>>>>>>", response);

    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch profile",
    };
  }
};
