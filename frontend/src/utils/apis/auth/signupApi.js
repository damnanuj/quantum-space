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

export async function signupApi(signupFormData) {
  try {
    const response = await axios.post(authEndpoints.signup, signupFormData, {
      withCredentials: true,
    });

    const { message, success } = response.data;

    showNotification("success", "Signup Successful", message);

    return { success: success || true };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred during signup";
    const errorSuccess = error.response?.data?.success || false;

    showNotification("error", "Signup Failed", errorMessage);

    return { success: errorSuccess || false};
  }
}
