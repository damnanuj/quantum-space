import React from "react";
import { Skeleton} from "antd";

const PostSkeleton = ({ loading}) => {
  return (
    <>
      {loading
        && Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="blog_container">
              <div className="blogOwnerInfo">
                <div className="topFlex">
                  <Skeleton.Avatar active size="large" shape="circle" />
                  <div className="nameAndTimeHolder">
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: 120 }}
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: 80, marginTop: 5 }}
                    />
                  </div>
                  <Skeleton.Input
                    active
                    size="small"
                    style={{ width: 90, marginLeft: 10 }}
                  />
                </div>
              </div>
              <div className="blogContent">
                <Skeleton.Input
                  active
                  size="default"
                  style={{ width: "100%", marginBottom: 15 }}
                />
              
                {Math.random() > 0.5 ? (
                  <Skeleton.Image active style={{ width: "100%", height: 200 }} />
                ) : null}
              </div>
              <div className="likesCommentsContainer">
                <div className="like">
                  <Skeleton.Input active size="small" style={{ width: 100 }} />
                </div>
                <div className="comment">
                  <Skeleton.Input active size="small" style={{ width: 100 }} />
                </div>
              </div>
            </div>
          ))}
        
    </>
  );
};

export default PostSkeleton;
