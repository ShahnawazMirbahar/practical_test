import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import { DASHBOARD, MEMBERS, TASKS } from "../../../routes";

function DrawerComp() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("userName");
    window.location.reload();
  };
  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItemButton href={DASHBOARD}>
            <ListItemIcon>
              <ListItemText>Dashboard</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton href={TASKS}>
            <ListItemIcon>
              <ListItemText>Tasks</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton href={MEMBERS}>
            <ListItemIcon>
              <ListItemText>Members</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            variant="contained"
            sx={{ bgcolor: "#DC143C", height: "45px" }}
            onClick={() => handleLogout()}
          >
            <ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
    </React.Fragment>
  );
}

export default DrawerComp;
