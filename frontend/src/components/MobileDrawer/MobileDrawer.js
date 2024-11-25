import React, { useState } from "react";
import { Drawer, Button, Typography } from "antd";
import profile from "../../imgs/profilemale.png";
import SmallProfile from "../Common/smallProfile/SmallProfile";
import UsersToFollow from "../features/UsersToFollow/UsersToFollow";
import "./MobileDrawer.scss";

const MobileDrawer = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <React.Fragment>
      <div className="profile_button" onClick={handleDrawerOpen}>
        <img src={profile} alt="profile" />
      </div>

      <Drawer
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography.Text style={{ fontSize: "16px", color: "white" }}>
              Close
            </Typography.Text>
            <Button
              type="text"
              onClick={handleDrawerClose}
              style={{ color: "white" }}
              className="mobileMenuCloseBtn"
            >
             <i class="fa-solid fa-x"></i>
            </Button>
          </div>
        }
        placement="left"
        onClose={handleDrawerClose}
        open={open}
        closable={false} 
        bodyStyle={{ backgroundColor: "#001529", padding: "1rem", gap:"10px" }}
        headerStyle={{ backgroundColor: "#001529" }} 
      >
        <div className="drawer-content">
          <SmallProfile />
          <UsersToFollow />
        </div>
      </Drawer>
    </React.Fragment>
  );
};

export default MobileDrawer;
