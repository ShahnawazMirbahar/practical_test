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
import { memberAsync } from "./taskStore/taskSlice";
import { useNavigate } from "react-router-dom";
import { CustomTextBox } from "../../Components/Common/TextBox";
import Navbar from "../../Components/Common/Navbar/Navbar";
import { useToast } from "../../hooks/useToast";
import { CREATED, SUCCESS_TASK } from "../../utils/Constant";

function CreateTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fire = useToast();
  const d = new Date();

  const [member, setMember] = useState("");

  const { dropdownData } = useSelector(({ tasks }) => {
    return {
      dropdownData: tasks?.members,
    };
  });

  useEffect(() => {
    dispatch(memberAsync()).unwrap(); //dispatching action to get member data from server
  }, []);

  // submit the form
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const filteredDropdownData = dropdownData.filter(
      (item) => item.name === member
    );
    console.log("filteredDropdownData", filteredDropdownData);

    if (filteredDropdownData.length > 0) {
      //Assigned Task Increased by 1 every time a task is assigned to a member
      const addededTask = {
        name: filteredDropdownData[0].name,
        email: filteredDropdownData[0].email
          ? filteredDropdownData[0].email
          : "",
        assignedTask: filteredDropdownData[0].assignedTask + 1,
      };
      const submittingData = {
        title: data.get("title"),
        description: data.get("description"),
        assignedTo: member,
        createdAt: d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear(),
      };

      fetch(`http://localhost:8000/members/${filteredDropdownData[0].id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addededTask),
      }).then((res) => {
        fetch("http://localhost:8000/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submittingData),
        })
          .then((res) => {
            fire(SUCCESS_TASK, CREATED);
            navigate("/tasks");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    } else {
      const submittingData = {
        title: data.get("title"),
        description: data.get("description"),
        assignedTo: member,
        createdAt: d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear(),
      };

      fetch("http://localhost:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submittingData),
      })
        .then((res) => {
          fire(SUCCESS_TASK, CREATED);
          navigate("/tasks");
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
                <CustomTextBox
                  type="text"
                  id="title"
                  label="Task Title"
                  name="title"
                />
                <CustomTextBox
                  required={false}
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
                    Create Task
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

export default CreateTask;
