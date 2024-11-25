import React, { useState, useEffect } from "react";
import "./SmallProfile.scss";
import profile from "../../../imgs/profilemale.png";
import cover from "../../../imgs/coverimg.webp";

import SmallProfileSkeleton from "../../../skeletons/SmallProfileSkeleton";
import { Link } from "react-router-dom";
import { fetchUserProfile } from "../../../utils/apis/feed/fetchUserProfile";

const SmallProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
       
        if (userProfile.success === false) {
          throw new Error(userProfile.message);
        }
        setUser(userProfile.data);
      } catch (err) {
        setError(err.message || "An error occurred while fetching the profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Skeleton fallback UI 
  if (loading) {
    return <SmallProfileSkeleton />;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="small_profile_container">
      
      <div
        className="cover-photo"
        style={{
          backgroundImage: `url(${cover})`,
        }}
      />

      <div className="bottomProfileDetails">
        <div className="profileImg_holder">
          <img
            className="maleProfile"
            src={profile}
            alt={`${user.username || "User"}'s profile`}
          />
        </div>

        <div className="nameUserNameBio">
          <h3 className="name">{user.name || "Unknown User"}</h3>
          <p className="username">@{user.username || "unknown"}</p>
          <p className="bio">{user.about || "No bio available"}</p>
        </div>

        <div className="follow-counts">
          <div className="follower">
            <h4>{user.followers ? user.followers.length : "0"}</h4>
            <p>Followers</p>
          </div>
          <div className="following">
            <h4>{user.following ? user.following.length : "0"}</h4>
            <p>Following</p>
          </div>
        </div>

        <div className="myProfileBtn">
          <Link to={`/profile/${user.username || ""}`}>My Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProfile;