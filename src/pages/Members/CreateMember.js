import Button from "@mui/material/Button";
import { Avatar, Box, Container } from "@mui/material";
import React from "react";
import Footer from "../../Components/Common/Footer/Footer";
import Navbar from "../../Components/Common/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { CustomTextBox } from "../../Components/Common/TextBox";
import { useToast } from "../../hooks/useToast";
import { CREATED, SUCCESS_MEMBER } from "../../utils/Constant";

function CreateMember() {
  const navigate = useNavigate();
  const fire = useToast();
  const d = new Date();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submittingData = {
      name: data.get("name"),
      email: data.get("email"),
      assignedTask: 0,
      createdAt: d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear(),
    };
    fetch("http://localhost:8000/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittingData),
    })
      .then((res) => {
        fire(SUCCESS_MEMBER, CREATED);
        navigate("/members");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Navbar />
      <Box sx={{ height: "100vh" }}>
        <Container component="main" maxWidth="sm">
          <Box mt={20}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Avatar sx={{ bgcolor: "cyan" }} />
            </Box>
            <Box display="flex" flexDirection="column" flexWrap="wrap">
              <Box>
                <h1>Create Member</h1>
              </Box>
              <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <CustomTextBox
                  required
                  type="text"
                  id="name"
                  label="Name"
                  name="name"
                />
                <CustomTextBox
                  required={false}
                  name="email"
                  label="Email"
                  type="email"
                  id="email"
                />
                <Box pb={2} pt={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "#DC143C" }}
                  >
                    Create Member
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default CreateMember;
