import React from "react";
import UserProfile from "../components/Common/UserProfile/UserProfilePage";
import LoggedUserPosts from "../components/LoggedUserPosts/LoggedUserPosts";

const ProfilePage = () => {
  return (
    <>
      <UserProfile />
     <LoggedUserPosts/>
    </>
  );
};

export default ProfilePage;
