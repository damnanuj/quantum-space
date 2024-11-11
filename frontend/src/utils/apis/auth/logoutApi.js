
import axios from "axios";
import { authEndpoints } from "../../endpoints";
import { message } from "antd";

export const logout = async () => {
  try {
    const response = await axios.post(authEndpoints.logout, {}, { withCredentials: true });
    if (response.data.success) {
      message.success("Logout success");
    }
    return response.data;
   
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};
