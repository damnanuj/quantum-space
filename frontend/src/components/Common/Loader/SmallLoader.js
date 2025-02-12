import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const SmallLoader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
    }}
  >
    <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} />
  </div>
);

export default SmallLoader;
