import React, { useContext, useState } from "react";
import "./PostBlog.scss";

import profile from "../../../imgs/blank-profile.png";
import { UserContext } from "../../../context/userContext";
import CommonButton from "../../Common/Button/CommonButton";
import { createPostAPI } from "../../../utils/apis/feed/createPostAPI";

const PostBlog = () => {
  const { user } = useContext(UserContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result); // Convert to base64
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select an image file.");
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handlePost = async () => {
    if (!caption && !selectedImage) {
      alert("Please provide either a caption or an image.");
      return;
    }

    setIsPosting(true);

    try {
      const payload = {
        caption,
        image: selectedImage,
      };
      await createPostAPI(payload);
      alert("Post created successfully!");
      setCaption("");
      setSelectedImage(null);
    } catch (error) {
      alert("Failed to create post. Please try again.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="postBlog_container">
      <div className="postBlog_top">
        <img src={user.profilePicture || profile} alt="userProfile" />
        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="explore_search"
          type="text"
          placeholder="What's happening?"
          disabled={isPosting}
        />
        <CommonButton
          text={isPosting ? "Posting..." : "Post"}
          color={"blue"}
          disabled={isPosting}
          onClick={handlePost}
        />
      </div>
      <div className="postBlog_bottom">
        <label htmlFor="imageUpload" className="roundedBox">
          <i className="fa-regular fa-image"></i> <span>Photo</span>
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>

      {selectedImage && (
        <div className="imagePreview">
          <button className="closeButton" onClick={handleRemoveImage}>
            &times;
          </button>
          <img src={selectedImage} alt="preview" />
        </div>
      )}
    </div>
  );
};

export default PostBlog;