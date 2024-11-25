import React from "react";
import "./loader.scss";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const Loader = () => (
  <div
    style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#06141d",
    }}
  >
    {" "}
    <Spin indicator={<LoadingOutlined spin />} size="large" />
    {/* <span class="loader"></span> */}
  </div>
);
export default Loader;
