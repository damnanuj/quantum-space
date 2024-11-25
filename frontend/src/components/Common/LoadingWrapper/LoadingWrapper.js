import React, { Suspense } from "react";
import Loader from "../Loader/Loader";

const LoadingWrapper = ({ Component }) => {
   
  return (
    <Suspense fallback={<Loader />}>
        <Component />
    </Suspense>
  );
};

export default LoadingWrapper;
