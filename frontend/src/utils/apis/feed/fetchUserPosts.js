import axios from "axios";
import { postsEnpoints } from "../../endpoints";
import { jwtDecode } from "jwt-decode";

export const fetchUserPosts = async ({pageNumber, userId}) => {
  try {
    const token = localStorage.getItem("quantum-space");

    if (!token)
      throw new Error("No authentication token found. Please log in.");

    // const { userId } = jwtDecode(token);
    // console.log(userId);

    const response = await axios.get(`${postsEnpoints.getUserPosts(userId)}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return { response: response.data, status: response.status };
  } catch (error) {
    console.error("Error fetching user posts:", error.message);
  }
};
