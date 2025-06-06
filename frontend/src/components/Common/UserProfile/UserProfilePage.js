import React, { useContext, useEffect, useState } from "react";
import "./userProfile.scss";
import CommonButton from "../Button/CommonButton";

import { fetchUserProfile } from "../../../utils/apis/feed/fetchUserProfile";
import { useParams } from "react-router-dom";
import UserProfilePageSkeleton from "../../../skeletons/UserProfilePageSkeleton";
import { jwtDecode } from "jwt-decode";
import UpdateDetails from "../../features/updateProfile/UpdateDetails";
import { UserContext } from "../../../context/userContext";

const UserProfile = () => {
  const { username: userId } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [fetchedUser, setFetchedUser] = useState(null);
  const [isLoggedUser, setIsLoggedUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(userId,"userId");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);
      setFetchedUser(null); // Reset fetchedUser before new fetch
      try {
        // console.log("Fetching profile for userId:", userId);

        const userProfile = await fetchUserProfile(userId);
        // console.log("Fetched user profile:", userProfile);

        if (!userProfile || userProfile.success === false) {
          throw new Error(
            userProfile?.message || "Failed to fetch user profile."
          );
        }
        // setUser(userProfile.data);
        // Ensure correct user identification
        const token = localStorage.getItem("quantum-space");
        if (token) {
          const decoded = jwtDecode(token);
          const isAuthUser = userId === decoded.userId || !userId;

          setIsLoggedUser(isAuthUser);
          if (isAuthUser) {
            setUser(userProfile.data);
          } else {
            setFetchedUser(userProfile.data);
          }
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId, setUser]);

  if (loading) return <UserProfilePageSkeleton />;
  if (error) return <div>{error}</div>;

  // Determine which user details to display
  const displayedUser = isLoggedUser ? user : fetchedUser;
  // console.log(displayedUser);

  return (
    <div className="userProfileContainer">
      {/* Cover Photo */}
      <div className="coverPhoto">
        <img
          alt="coverPic"
          src={
            displayedUser?.coverPicture || "https://via.placeholder.com/800x150"
          }
        />
      </div>

      {/* Profile Section */}
      <div className="profileSection">
        <div className="profileImage">
          <img
            alt="profilePic"
            src={
              displayedUser?.profilePicture || "https://via.placeholder.com/100"
            }
          />
        </div>
      </div>
      <div className="detailsContainer">
        <div className="userDetails">
          <h2>{displayedUser?.name}</h2>
          <p>@{displayedUser?.username}</p>
          <p>{displayedUser?.about}</p>
          <p>
            {displayedUser?.location?.state}{" "}
            {displayedUser?.location?.city},{" "}
            {displayedUser?.location?.country || "Location not provided"}
          </p>
      
          <div className="stats">
            <div>
              <strong>{displayedUser?.followers?.length || "0"}</strong>{" "}
              Followers
            </div>
            <div>
              <strong>{displayedUser?.following?.length || "0"}</strong>{" "}
              Following
            </div>
          </div>
         
        </div>

        <div className="editFollowButton">
          {isLoggedUser ? (
            <UpdateDetails />
          ) : (
            <CommonButton
              color={displayedUser?.isFollowed ? "blue" : "white"}
              text={displayedUser?.isFollowed ? "Following" : "Follow"}
            />
          )}
             <div className="websiteLink">{displayedUser?.website &&  <a  href={displayedUser?.website} target="_blank" >Visit website</a>}</div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
