import axios from "axios";
import { postsEnpoints } from "../../endpoints";
import { jwtDecode } from "jwt-decode";
export const fetchAllPosts = async (pageNumber) => {
  try {
    //>>====token from local storage=======>>
    const token = localStorage.getItem("quantum-space");

    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }
    const { userId } = jwtDecode(token);
    //>>====API call with the Authorization header====>>
    const response = await axios.get(
      `${postsEnpoints.getAllPosts}&page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return { response: response.data, userId };
  } catch (error) {
    console.error("Error fetching posts:", error.message);
  }
};
