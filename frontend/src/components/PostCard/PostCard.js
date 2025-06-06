import React from "react";
import "./posts.scss";

import PostSkeleton from "../../skeletons/PostsSkeleton";
import { likeUnlikePost } from "../../utils/apis/feed/likeUnlikePost";
import PostMenu from "../FeedComponents/PostDropMenu/PostDropMenu";
import SeeMore from "../Common/SeeMore/SeeMore";
import { message } from "antd";
import { timeAgo } from "../../utils/convertTimestamp";

const PostCard = ({
  posts,
  setPosts,
  loggedInUser,
  fetchPosts,
  isFetchingNextPage,
  isProfilePage,
  loadMorePosts,
  isLastPage,
  loading,
  error,
}) => {
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

  // Loading and error handling
  if (loading) return <PostSkeleton loading={loading} />;
  if (error) return <p>Error loading posts: {error.message}</p>;

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
            <div className="comment">
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
    </>
  );
};

export default PostCard;
