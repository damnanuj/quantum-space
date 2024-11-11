import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Drawer from '@mui/joy/Drawer';
import profile from "../../imgs/profilemale.png"
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import SmallProfile from '../Common/smallProfile/SmallProfile';
import "./MobileDrawer.scss"
import UsersToFollow from '../Common/UsersToFollow/UsersToFollow';
import ProfileButton from '../ProfileButton/ProfileButton';



export default function MobileDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <IconButton  color="neutral" onClick={() => setOpen(true)}>
        <ProfileButton name={"Steve Rogers"} profile={profile} />
      </IconButton>
      <Drawer
      
      open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            ml: 'auto',
            mt: 1,
            mr: 2,
            
          }}
        >
          <Typography
            component="label"
            htmlFor="close-icon"
            fontSize="sm"
            fontWeight="lg"
            sx={{ cursor: 'pointer', color:"white" }}
          >
            Close
          </Typography>
          <ModalClose id="close-icon" sx={{ position: 'initial' }} />
        </Box>
        
        <SmallProfile/>
        <UsersToFollow/>
      </Drawer>
    </React.Fragment>
  );
}
