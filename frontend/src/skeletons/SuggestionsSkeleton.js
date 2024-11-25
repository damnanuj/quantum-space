import React from 'react';
import { Skeleton } from 'antd';

const SuggestionsSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}>
          <Skeleton.Avatar active size={48} shape="circle" style={{ marginRight: 16 }} />
          <div style={{ flex: 1 }}>
            <Skeleton.Input active size="small" style={{ width: '60%', marginBottom: 4 }} /> {/* Name */}
            <Skeleton.Input active size="small" style={{ width: '40%'  }} /> {/* Username */}
          </div>
          <Skeleton.Button active shape="default" style={{ width: 70, marginLeft: 16 }} />
        </div>
      ))}
   </>
  );
};

export default SuggestionsSkeleton;
