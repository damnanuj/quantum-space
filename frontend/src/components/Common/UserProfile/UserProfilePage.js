import React, { useEffect, useState } from "react";
import "./userProfile.scss";
import CommonButton from "../Button/CommonButton";

import { fetchUserProfile } from "../../../utils/apis/feed/fetchUserProfile";
import { useParams } from "react-router-dom";
import UserProfilePageSkeleton from "../../../skeletons/UserProfilePageSkeleton";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [isLoggedUser, setIsLoggedUser] = useState(false); // Dynamically determine
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        const userProfile = await fetchUserProfile(username);
        if (userProfile.success === false) {
          throw new Error(userProfile.message);
        }
        setUser(userProfile.data);

        // Determine if the fetched user is the logged-in user
        const token = localStorage.getItem("quantum-space");
        if (token) {
          const decoded = jwtDecode(token);
          setIsLoggedUser(username === decoded.username || !username);
        }
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) return <UserProfilePageSkeleton />;
  if (error) return <div>{error}</div>;

  return (
    <div className="userProfileContainer">
      {/* Cover Photo */}
      <div className="coverPhoto">
        <img
          alt="coverPic"
          src={user.coverPicture || "https://via.placeholder.com/800x150"}
        />
      </div>

      {/* Profile Section */}
      <div className="profileSection">
        <div className="profileImage">
          <img
            alt="profilePic"
            src={user.profilePicture || "https://via.placeholder.com/100"}
          />
        </div>
      </div>
      <div className="detailsContainer">
        <div className="userDetails">
          <h2>{user.name}</h2>
          <p>@{user.username}</p>
          <p>{user.about}</p>
          <p>{user.location?.country || "Location not provided"}</p>

          <div className="stats">
            <div>
              <strong>{user.followers ? user.followers.length : "0"}</strong>{" "}
              Followers
            </div>
            <div>
              <strong>{user.following ? user.following.length : "0"}</strong>{" "}
              Following
            </div>
          </div>
        </div>

        <div className="editFollowButton">
          {isLoggedUser ? (
            <CommonButton text={"Edit Profile"} color={"blue"} />
          ) : (
            <CommonButton
              color={user.isFollowed ? "blue" : "white"}
              text={user.isFollowed ? "Following" : "Follow"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
