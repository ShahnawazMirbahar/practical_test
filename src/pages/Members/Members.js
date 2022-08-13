import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Common/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { memberAsync } from "../Tasks/taskStore/taskSlice";
import MembersTable from "./utils/MembersTable";
import Navbar from "../../Components/Common/Navbar/Navbar";

function Members() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //getting the data from the store
  const { members } = useSelector(({ tasks }) => {
    return {
      members: tasks?.members,
    };
  });
  useEffect(() => {
    dispatch(memberAsync()).unwrap(); //dispatching action to get member data from server
  }, []);

  const handleCreate = () => {
    navigate("/members-create");
  };

  return (
    <>
      <Navbar />
      <Box sx={{ height: "150vh" }}>
        <Box pl={2} pr={2} pt={2}>
          <Box p={5} bgcolor="#e5e5e5">
            <Box display="flex" flexDirection="row-reverse" pr={2} pb={2}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#DC143C", height: "45px" }}
                onClick={() => {
                  handleCreate();
                }}
              >
                Create Member
              </Button>
            </Box>
            <Box pb={2}>
              {/* Custom Table Component to display the data */}
              {members && <MembersTable data={members} />}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box pt={2}>
        <Footer />
      </Box>
    </>
  );
}

export default Members;
