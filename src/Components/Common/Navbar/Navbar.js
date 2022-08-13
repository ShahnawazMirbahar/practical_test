import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import logo from "../../../asset/logo.png";
import React, { useEffect, useState } from "react";
import { DASHBOARD, MEMBERS, TASKS } from "../../../routes";
import DrawerComp from "../DrawerComponent/DrawerComp";

function Navbar() {
  const [value, setValue] = useState();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const currentRoute = window.location.pathname ;
  const handleLogout = () => {
    localStorage.removeItem("userName");
    window.location.reload();
  };
  useEffect(() => {
   if(currentRoute === DASHBOARD){
     setValue(0);
   }
    else if(currentRoute === MEMBERS){
      setValue(2);}
    else if(currentRoute === TASKS){
      setValue(1);
    }
  }, [currentRoute])
  
  return (
    <AppBar style={{ backgroundColor: "#111517", position: "inherit" }}>
      <Toolbar>
        <Box mr={6} display="flex">
          <img height={80} width={100} src={logo} alt="Task Manager" />
          <a href={DASHBOARD} style={{ textDecoration: "none" }}>
            <h1 style={{ color: "white" }}>Task Manager</h1>
          </a>
        </Box>
        {isMatch ? (
          <>
            <DrawerComp />
          </>
        ) : (
          <>
            <Tabs
              sx={{ marginLeft: "auto" }}
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
              indicatorColor="secondary"
            >
              <Tab label="Dashboard" href={DASHBOARD} />
              <Tab label="Tasks" href={TASKS} />
              <Tab label="Members" href={MEMBERS} />
              <Tab label={`${localStorage.getItem("userName")}`} />
            </Tabs>
            <Button
              size="small"
              variant="contained"
              sx={{ bgcolor: "#DC143C", height: "45px" }}
              onClick={() => handleLogout()}
            >
              <h6 style={{ color: "white" }}>Logout</h6>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
