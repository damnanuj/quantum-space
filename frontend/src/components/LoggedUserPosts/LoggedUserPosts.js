import React, { useEffect, useState } from "react";
import { fetchUserPosts } from "../../utils/apis/feed/fetchUserPosts";
import PostCard from "../PostCard/PostCard";
import { useParams } from "react-router-dom";

const LoggedUserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const {  username: userId  } = useParams();

  console.log("userIddfd",userId)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { response, status } = await fetchUserPosts({userId});
        console.log("<<<<<<<<<<<<", response, status);

        if (response.success) {
          setPosts(response.data);
          
          setLoggedInUser(userId);
        } else {
          throw new Error(response.message || "Failed to fetch posts.");
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <PostCard
      posts={posts}
      setPosts={setPosts}
      loggedInUser={loggedInUser}
      fetchPosts={() => {}} // No pagination in profile
      isFetchingNextPage={false}
      isProfilePage={true}
      loadMorePosts={() => {}}
      isLastPage={true}
      loading={loading}
      error={error}
    />
  );
};

export default LoggedUserPosts;
