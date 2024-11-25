import axios from "axios";
import { authEndpoints } from "../../endpoints";

export const validateToken = async () => {
  try {
    const response = await axios.get(authEndpoints.validate_token, {
      withCredentials: true, // send cookies with the request
    });

    if (response.status === 200 && response.data.success) {
      console.log("success");
      return { success: true, user: response.data.user };
    } else {
      console.log("false");
      return { success: false };
    }
  } catch (error) {
    console.error("Error validating token", error);
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
