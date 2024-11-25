import axios from "axios";
import { postsEnpoints } from "../../endpoints";

export const likeUnlikePost = async (postId) => {
  try {
    const token = localStorage.getItem("quantum-space");
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    await axios.post(postsEnpoints.likeUnlikePost(postId), null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error liking/unliking post:", error.message);
    throw error;
  }
};
