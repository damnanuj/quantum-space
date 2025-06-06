import axios from "axios";
import { userEndpoints } from "../../endpoints";

export const updateProfileDetails = async (updatedValues) => {
  try {
    const token = localStorage.getItem("quantum-space");

    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await axios.post(
      userEndpoints.updateProfileDetails,
      updatedValues,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    // console.log("Error updating profile:", error);
    return error;
  }
};
