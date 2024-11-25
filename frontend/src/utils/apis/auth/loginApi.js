import axios from "axios";
import { message } from "antd";
import { authEndpoints } from "../../endpoints";

// >>===========  Helper function for notifications ================>>
export const showNotification = (type, description) => {
  message[type](description); // Ensure single argument
};

//>>======== Save token to localStorage================>>
export const saveToken = (token) => {
  localStorage.setItem("quantum-space", token);
};

export async function loginApi(loginFormData) {
  try {
    const response = await axios.post(authEndpoints.login, loginFormData);
    const { message: serverMessage, success, token } = response.data;

    // Save token if it exists
    if (token) {
      saveToken(token);
    }

    // Show success notification
    showNotification("success", serverMessage);

    // Return response data
    return { success: success === true};
  } catch (error) {
    console.error(error);

    // Handle error response
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    const errorSuccess = error.response?.data?.success || false;

    // Show error notification
    showNotification("error", errorMessage);

    return { success: errorSuccess, data: null };
  }
}
