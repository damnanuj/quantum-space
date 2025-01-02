import React from "react";
import PostBlog from "../components/features/PostBlog/PostBlog";
import FeedTabs from "../components/FeedComponents/Tabs/FeedTabs";

const PostsPage = () => {
  return (
    <>
      <PostBlog />
      <FeedTabs />
    </>
  );
};

export default PostsPage;
