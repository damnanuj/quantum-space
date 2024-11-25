import axios from "axios";
import { notification } from "antd";
import { authEndpoints } from "../../endpoints";

// >>===========  Helper function for notifications ================>>
export const showNotification = (type, message, description) => {
  notification[type]({
    message,
    description,
  });
};

//>>======== Save token to localStorage================>>
export const saveToken = (token) => {
  localStorage.setItem("quantum-space", token);
};

export async function loginApi(loginFormData) {
  try {
    const response = await axios.post(authEndpoints.login, loginFormData);
    const { message, success, data, token } = response.data;

    //>>save>>
    if (token) {
      saveToken(token);
    }

    showNotification("success", "Login Successful", message);

    return { success: success || true, data };
  } catch (error) {
    console.error(error);

    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred";
    const errorSuccess = error.response?.data?.success || false;

    showNotification("error", "Login Failed", errorMessage);

    return { success: errorSuccess || false };
  }
}
