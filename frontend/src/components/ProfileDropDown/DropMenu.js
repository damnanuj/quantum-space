import React, { useState } from "react";
import { Menu, Dropdown, message } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/apis/auth/logoutApi";

export default function DropMenu() {
  const navigate = useNavigate();
  const [tooltipVisible, setTooltipVisible] = useState(true);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/login");
    }
  };

  const menu = (
    <Menu
      style={{
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
        padding: "10px",
        borderRadius: "8px",
      }}
    >
      <Menu.Item
        key="settings"
        onClick={() => message.info("Development is in progress !")}
        style={{
          fontSize: "16px",
          fontWeight: "500",
          padding: "12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <SettingOutlined style={{ fontWeight: "500", fontSize: "16px" }} />{" "}
        Settings
      </Menu.Item>
      <Menu.Item
        key="logout"
        onClick={handleLogout}
        style={{
          fontSize: "16px",
          fontWeight: "500",
          padding: "12px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <LogoutOutlined style={{ fontWeight: "500", fontSize: "16px" }} />{" "}
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="dropmenu" style={{ position: "relative" }}>
      <Dropdown
        overlay={menu}
        placement="bottomRight"
        trigger={["click"]}
        onOpenChange={(visible) => setTooltipVisible(!visible)}
      >
        <span
          style={{
            cursor: "pointer",
          }}
        >
          <i className="fa-solid fa-bars-staggered menu"></i>
        </span>
      </Dropdown>
    </div>
  );
}
