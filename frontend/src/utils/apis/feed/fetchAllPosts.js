import axios from "axios";
import { postsEnpoints } from "../../endpoints";

export const fetchAllPosts = async () => {
  try {
    //>>====token from local storage=======>>
    const token = localStorage.getItem("quantum-space");

    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    //>>====API call with the Authorization header====>>
    const response = await axios.get(postsEnpoints.getAllPosts, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error.message);
  }
};
