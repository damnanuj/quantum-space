import { Skeleton } from "antd";
import React from "react";


const SmallProfileSkeleton = () => {
  return (
    <div className="small_profile_container">
      <div className="small_profile_top">
        <Skeleton.Input active className="cover-photo" />
        <div className="logo_holder">
          <Skeleton.Avatar active size={74} shape="circle" />
        </div>
      </div>
      <div className="small_profile_bottom">
        <div className="nameUserNameBio">
          <Skeleton.Input active size="large" className="name" />
          <Skeleton.Input active size="small" className="username" />
          <Skeleton.Input active size="small" className="bio" />
        </div>
        <div className="follow-counts">
          <Skeleton.Input active size="small" className="follower" />
          <Skeleton.Input active size="small" className="following" />
        </div>
        <div className="myProfileBtn">
          <Skeleton.Button active size="default" />
        </div>
      </div>
    </div>
  );
};

export default SmallProfileSkeleton;
