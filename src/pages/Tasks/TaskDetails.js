import Button from "@mui/material/Button";
import {
  Avatar,
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../Components/Common/Footer/Footer";

import {
  memberAsync,
  setEditTaskDetails,
  singleTaskAsync,
} from "./taskStore/taskSlice";
import { useNavigate, useParams } from "react-router-dom";
import { CustomTextBox } from "../../Components/Common/TextBox";
import Navbar from "../../Components/Common/Navbar/Navbar";
import { useToast } from "../../hooks/useToast";
import { UPDATED, UPDATE_TASK } from "../../utils/Constant";

function TaskDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const d = new Date();
  const { id } = useParams();
  const fire = useToast();

  const [member, setMember] = useState("");

  const { dropdownData } = useSelector(({ tasks }) => {
    return {
      dropdownData: tasks?.members,
    };
  });
  const { singleTaskData } = useSelector(({ tasks }) => {
    return {
      singleTaskData: tasks?.singleTask,
    };
  });

  useEffect(() => {
    dispatch(memberAsync()).unwrap(); //dispatching action to get member data from server
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(singleTaskAsync(id)).unwrap();
    } //dispatching action to get single task data from server
  }, [id]);

  useEffect(() => {
    if (singleTaskData) {
      setMember(singleTaskData.assignedTo);
    } //setting the value of member from server data
  }, [singleTaskData]);

  console.log("id", id);

  // submit the form
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const submittingData = {
      title: data.get("title"),
      description: data.get("description"),
      assignedTo: member,
      createdAt: d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear(),
    };
    fetch(`http://localhost:8000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittingData),
    })
      .then((res) => {
        fire(UPDATE_TASK, UPDATED);
        dispatch(setEditTaskDetails());
        navigate("/tasks");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //function to set the value of member
  const handleChange = (event) => {
    setMember(event.target.value);
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
                <h1>Create Task</h1>
              </Box>
              <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
                {console.log("singleTaskData?.title", singleTaskData?.title)}
                {singleTaskData?.title && (
                  <CustomTextBox
                    defaultValue={singleTaskData?.title}
                    type="text"
                    id="title"
                    label="Task Title"
                    name="title"
                  />
                )}
                <CustomTextBox
                  required={false}
                  defaultValue={singleTaskData && singleTaskData.description}
                  name="description"
                  label="Description"
                  type="textArea"
                  multiline={true}
                  rows={4}
                  id="description"
                />
                <FormControl fullWidth>
                  <InputLabel>Assign Memeber</InputLabel>
                  <Select
                    id="assignMember"
                    value={member}
                    label="Assign-Member"
                    style={{
                      backgroundColor: "white",
                    }}
                    onChange={handleChange}
                  >
                    {dropdownData &&
                      dropdownData.map((item) => (
                        <MenuItem value={item?.name}>{item?.name}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
                <Box pb={2} pt={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: "#DC143C" }}
                  >
                    Update Task
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

export default TaskDetails;
