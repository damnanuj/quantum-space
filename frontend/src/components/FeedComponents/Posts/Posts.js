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

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pages, setPages] = useState(1);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const isLastPage = pageNumber >= pages;

  //>>============ Handle like/unlike ===============>>
  const handleLikeUnlike = async (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        const isLiked = post.likes.includes(loggedInUser);
        return {
          ...post,
          likes: isLiked
            ? post.likes.filter((id) => id !== loggedInUser)
            : [...post.likes, loggedInUser],
        };
      }
      return post;
    });

    setPosts(updatedPosts);

    try {
      await likeUnlikePost(postId);
    } catch (error) {
      setPosts(posts); // Revert to original state on error
      message.error("Failed to like/unlike the post. Please try again.");
    }
  };

  //>>======= Handle post deletion ==========>>
  const handlePostDeleted = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  // Loading state
  if (loading) return <PostSkeleton loading={loading} />;
  if (error) return <p>Error loading blogs: {error.message}</p>;

  return (
    <>
      {posts.map((post) => (
        <div key={post._id} className="blog_container">
          <div className="blogOwnerInfo">
            <div className="topFlex">
              <img src={post.user.profilePicture} alt="profilePicture" />
              <div className="nameAndTimeHolder">
                <h3>{post.user.name}</h3>
                <p>{timeAgo(post.createdAt)}</p>
              </div>
              <span>@{post.user.username}</span>
            </div>
            {loggedInUser === post.user._id && (
              <PostMenu postId={post._id} onPostDeleted={handlePostDeleted} />
            )}
          </div>
          <div className="blogContent">
            <p>{post.caption}</p>
            {post.image && <img src={post.image} alt="postImage" />}
          </div>
          <div className="likesCommentsContainer">
            <div className="like" onClick={() => handleLikeUnlike(post._id)}>
              <i
                className={`fa-heart ${
                  post.likes.includes(loggedInUser) ? "fa-solid" : "fa-regular"
                }`}
              ></i>
              <p>{post.likes.length} Likes</p>
            </div>
            <div className="comment" onClick={onOpenChange}>
              <i className="fa-solid fa-comment-dots"></i>
              <p>{post.comments.length} Comments</p>
            </div>
          </div>
        </div>
      ))}

      {!isLastPage || isFetchingNextPage ? (
        <SeeMore loadMore={loadMorePosts} isLoading={isFetchingNextPage} />
      ) : (
        <div style={{ textAlign: "center", color: "#dc172a" }}>
          No more posts
        </div>
      )}

      <CommentsModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
};

export default Posts;
