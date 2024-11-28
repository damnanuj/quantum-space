import React from "react";
import { Skeleton, Avatar } from "antd";

const UserProfileSkeleton = () => {
  return (
    <div className="userProfileContainer">
      {/* Skeleton for Cover Photo */}
      <div className="coverPhoto">
        <Skeleton.Image
          style={{
            width: "100%",
            height: "150px",
            borderRadius: "8px",
          }}
          active
        />
      </div>

      {/* Skeleton for Profile Section */}
      <div className="profileSection">
        <Avatar size={100} shape="circle" />
      </div>

      {/* Skeleton for Details Section */}
      <div className="detailsContainer">
        {/* User Details */}
        <div className="userDetails">
          <Skeleton.Input
            active
            style={{ width: "150px", marginBottom: "8px" }}
          />

          <Skeleton.Input
            active
            style={{ width: "200px", marginBottom: "8px" }}
          />

          <div className="stats">
            <Skeleton.Button
              active
              size="small"
              style={{
                width: "80px",
                margin: "8px 8px 8px 0",
              }}
            />
            <Skeleton.Button
              active
              size="small"
              style={{
                width: "80px",
                margin: "8px 0",
              }}
            />
          </div>
        </div>

        {/* Skeleton for Follow/Edit Button */}
        <div className="editFollowButton">
          <Skeleton.Button
            active
            style={{
              width: "120px",
              height: "40px",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileSkeleton;
