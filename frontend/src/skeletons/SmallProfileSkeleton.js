import { Skeleton } from "antd";
import React from "react";

const SmallProfileSkeleton = () => {
  return (
    <div className="small_profile_container">
      <Skeleton.Input
        active
        className="cover-photo"
        style={{
          width: "100%",
          height: "120px",
          borderRadius: "20px 20px 0 0",
        }}
      />

      <div className="bottomProfileDetails">
        <div className="profileImg_holder">
          <Skeleton.Avatar active size={74} shape="circle" />
        </div>
        <div className="nameUserNameBio">
          <Skeleton.Input
            active
            style={{ width: "60%", height: "24px", margin: "10px 0" }}
            className="name"
          />
          <Skeleton.Input
            active
            style={{ width: "30%", height: "18px" }}
            className="username"
          />

          <Skeleton.Input
            active
            style={{ width: "80%", height: "25px" }}
            className="bio"
          />
        </div>
        <div className="follow-counts">
          <Skeleton.Input active size="small" className="follower" />
          <Skeleton.Input active size="small" className="following" />
        </div>
      </div>
    </div>
  );
};

export default SmallProfileSkeleton;
