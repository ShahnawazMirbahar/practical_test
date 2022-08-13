import Button from "@mui/material/Button";
import { Avatar, Box, Container } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Common/Footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import {
  setEditMembersDetails,
  singleMemberAsync,
} from "./memberStore/memberSlice";
import { CustomTextBox } from "../../Components/Common/TextBox";
import Navbar from "../../Components/Common/Navbar/Navbar";
import { useToast } from "../../hooks/useToast";
import { UPDATED, UPDATE_MEMBER } from "../../utils/Constant";

function MemberDetails() {
  const navigate = useNavigate();
  const fire = useToast();
  const d = new Date();
  const { id } = useParams();
  const { singleMember } = useSelector(({ members }) => {
    return {
      singleMember: members?.singleMember,
    };
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(singleMemberAsync(id)).unwrap();
    } //dispatching action to get single task data from server
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (singleMember?.assignedTask) {
      const data = new FormData(event.currentTarget);
      const submittingData = {
        name: data.get("name"),
        email: data.get("email"),
        assignedTask: singleMember?.assignedTask,
        createdAt: d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear(),
      };
      fetch(`http://localhost:8000/members/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittingData),
      })
        .then((res) => {
          fire(UPDATE_MEMBER, UPDATED);
          dispatch(setEditMembersDetails());
          navigate("/members");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                <h1> Member Details</h1>
              </Box>
              <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
                {singleMember && (
                  <CustomTextBox
                    defaultValue={singleMember.name}
                    type="text"
                    id="name"
                    label="Name"
                    name="name"
                  />
                )}
                {singleMember && (
                  <CustomTextBox
                    required={false}
                    defaultValue={singleMember?.email}
                    name="email"
                    label="Email"
                    type="text"
                    id="email"
                  />
                )}

                <Box pb={2} pt={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "#DC143C" }}
                  >
                    Update Member
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

export default MemberDetails;
