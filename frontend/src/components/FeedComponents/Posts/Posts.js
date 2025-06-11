import React, { useEffect, useState } from "react";
import "./posts.scss";
import PostSkeleton from "../../../skeletons/PostsSkeleton";
import PostMenu from "../PostDropMenu/PostDropMenu";
import { fetchAllPosts } from "../../../utils/apis/feed/fetchAllPosts";
import { timeAgo } from "../../../utils/convertTimestamp";
import { likeUnlikePost } from "../../../utils/apis/feed/likeUnlikePost";
import { message } from "antd";
import SeeMore from "../../Common/SeeMore/SeeMore";
import CommentsModal from "./CommentsModal";
import { useDisclosure } from "@heroui/react";
import PostCard from "../../PostCard/PostCard";

const Posts = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  //>>============= Fetch posts based on page number=================>>
  const fetchPosts = async (page) => {
    try {
      setIsFetchingNextPage(true);
      const { response, userId } = await fetchAllPosts(page);

      if (response.success) {
        setPosts((prev) => [...prev, ...response.data]); // Append posts
        setPages(response.totalPages); // Update total pages
        setLoggedInUser(userId); // Save logged-in user
      } else {
        throw new Error(response.message || "Failed to fetch posts.");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
      setIsFetchingNextPage(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchPosts(pageNumber);
  }, [pageNumber]);

  //>>========= Load more posts ===============>>
  const loadMorePosts = () => {
    if (pageNumber < pages && !isFetchingNextPage) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  // Loading state
  if (loading) return <PostSkeleton loading={loading} />;
  if (error) return <p>Error loading blogs: {error.message}</p>;

  return (
    <PostCard
      posts={posts}
      setPosts={setPosts}
      loggedInUser={loggedInUser}
      fetchPosts={fetchPosts}
      isFetchingNextPage={false}
      isProfilePage={true}
      loadMorePosts={loadMorePosts}
      isLastPage={true}
      loading={loading}
      error={error}
    />
  );
};

export default Posts;
