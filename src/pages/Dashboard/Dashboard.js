import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import { DASHBOARD, MEMBERS, TASKS } from "../../routes";
import Footer from "../../Components/Common/Footer/Footer";
import Navbar from "../../Components/Common/Navbar/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const navigateType = useNavigationType();
  const token= localStorage.getItem("userName")
  useEffect(() => {
   if(token){
      navigate(DASHBOARD);
   }
  }, [navigateType]);
  return (
    <>
      <Navbar />
      <Box sx={{ height: "100vh" }}>
          <h1>Welcome To Dashboard</h1>
          <Box display="flex" justifyContent="center" flexWrap="wrap">
          <Card style={{backgroundColor:'#111517',margin:5}}>
          <CardContent>
          <Button variant="contained" size="large" sx={{ bgcolor: "#DC143C" }} onClick={()=>{navigate(TASKS)}}>
            Tasks
          </Button>
          </CardContent>
          </Card>
          <Card style={{backgroundColor:'#111517',margin:5}}>
          <CardContent>
          <Button variant="contained" size="large" sx={{ bgcolor: "#DC143C" }} onClick={() =>{navigate(MEMBERS)}}>
            Members
          </Button>
          </CardContent>
          </Card>
          </Box>
        </Box>
      
      <Footer />
    </>
  );
}

export default Dashboard;
