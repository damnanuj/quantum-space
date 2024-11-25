import axios from "axios";
import { userEndpoints } from "../../endpoints";

export const updateProfileDetails = async (updatedValues) => {
  try {
    const response = await axios.post(
      userEndpoints.updateProfileDetails,
      updatedValues,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.log("Error updating profile:", error);
    return error;
  }
};
