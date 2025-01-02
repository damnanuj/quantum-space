import axios from "axios";
import { postsEnpoints } from "../../endpoints";

export const deletePostApi = async (postId) => {
  try {
    const token = localStorage.getItem("quantum-space");

    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await axios.delete(postsEnpoints.deletePost(postId), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error deleting post:", error.message);
    throw error;
  }
};
