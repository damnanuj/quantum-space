import React, { useState, useEffect, useContext } from "react";
import "./SmallProfile.scss";

import SmallProfileSkeleton from "../../../skeletons/SmallProfileSkeleton";
import { Link } from "react-router-dom";
import { fetchUserProfile } from "../../../utils/apis/feed/fetchUserProfile";
import { UserContext } from "../../../context/userContext";

const SmallProfile = ({ onCloseDrawer }) => {
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleNavigation = () => {
    // Close the drawer and navigate to the profile page
    onCloseDrawer();
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();

        if (userProfile.success === false) {
          throw new Error(userProfile.message);
        }
        setUser(userProfile.data);
      } catch (err) {
        setError(
          err.message || "An error occurred while fetching the profile."
        );
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
          backgroundImage: `url(${user.coverPicture})`,
        }}
      />

      <div className="bottomProfileDetails">
        <div className="profileImg_holder">
          <img
            className="maleProfile"
            src={user.profilePicture}
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
          <Link onClick={handleNavigation} to={`/profile/${user.username}`}>
            My Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProfile;
