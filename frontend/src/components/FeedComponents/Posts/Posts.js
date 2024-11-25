import React, { useEffect, useState } from "react";
import "./posts.scss";
import PostSkeleton from "../../../skeletons/PostsSkeleton";
import PostMenu from "../PostDropMenu/PostDropMenu";
import { fetchAllPosts } from "../../../utils/apis/feed/fetchAllPosts";
import { timeAgo } from "../../../utils/convertTimestamp";
import {jwtDecode} from "jwt-decode";
import { likeUnlikePost } from "../../../utils/apis/feed/likeUnlikePost";
import { message } from "antd";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("quantum-space");
    if (token) {
      const { username, userId } = jwtDecode(token);
      setLoggedInUser(userId);
    }

    const fetchBlogs = async () => {
      try {
        const allPosts = await fetchAllPosts();
        setPosts(allPosts.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleLikeUnlike = async (postId) => {
    // Optimistic UI update
    const updatedPosts = posts.map((post) => {
      if (post._id === postId) {
        const isLiked = post.likes.includes(loggedInUser);
        return {
          ...post,
          likes: isLiked
            ? post.likes.filter((id) => id !== loggedInUser) // Unlike
            : [...post.likes, loggedInUser], // Like
        };
      }
      return post;
    });

    setPosts(updatedPosts);

    try {
      await likeUnlikePost(postId);
    } catch (error) {
      // Revert to original state in case of an error
      setPosts(posts);
      message.error("Failed to like/unlike the post. Please try again.");
    }
  };

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
            {loggedInUser === post.user.username && <PostMenu />}
          </div>
          <div className="blogContent">
            <p>{post.caption}</p>
            {post.image && <img src={post.image} alt="postImage" />}
          </div>
          <div className="likesCommentsContainer">
            <div className="like" onClick={() => handleLikeUnlike(post._id)}>
              <i
                className={`fa-heart ${
                  post.likes.includes(loggedInUser)
                    ? "fa-solid"
                    : "fa-regular"
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
    </>
  );
};

export default Posts;
