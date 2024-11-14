import axios from "axios";

import { notification } from "antd";
import { authEndpoints } from "../../endpoints";

// Helper function for notifications
const showNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

export async function loginApi(loginFormData) {
  try {
    const response = await axios.post(authEndpoints.login, loginFormData, {
      withCredentials: true,
    });

    const { message, success, data } = response.data;

    showNotification("success", "Login Successful", message);

    return { success: success || true, data };
  } catch (error) {
    console.log(error);
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    const errorSuccess = error.response?.data?.success || false;

    showNotification("error", "Login Failed", errorMessage);

    return { success: errorSuccess || false };
  }
}
