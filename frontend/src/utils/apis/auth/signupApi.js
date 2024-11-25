import axios from "axios";
import { authEndpoints } from "../../endpoints";
import { saveToken, showNotification } from "./loginApi";

export async function signupApi(signupFormData) {
  try {
    const response = await axios.post(authEndpoints.signup, signupFormData);

    const { message, success, token } = response.data;

    // >>========Save the token in localStorage after signup==============>>
    if (token) {
      saveToken(token);
    }

    showNotification("success", "Signup Successful", message);

    return { success: success || true };
  } catch (error) {
    console.error(error);

    const errorMessage =
      error.response?.data?.message ||
      "An unexpected error occurred during signup";
    const errorSuccess = error.response?.data?.success || false;

    showNotification("error", "Signup Failed", errorMessage);

    return { success: errorSuccess || false };
  }
}
