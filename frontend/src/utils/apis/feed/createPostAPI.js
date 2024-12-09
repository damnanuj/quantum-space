import axios from "axios";
import { postsEnpoints } from "../../endpoints";


export const createPostAPI = async (data) => {
  try {
    const token = localStorage.getItem("quantum-space");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await axios.post(postsEnpoints.createPost, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error.message);
    throw error;
  }
};
