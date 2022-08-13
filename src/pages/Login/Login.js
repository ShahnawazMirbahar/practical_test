import { Avatar, Box, Button, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import React from "react";
import { loginAsync } from "./loginStore/loginSlice";
import { useNavigate } from "react-router-dom";
import { DASHBOARD } from "../../routes";
import {
  ERROR,
  ERROR_INCIDENT,
  ERROR_MESSAGE,
  LOGGED_IN,
  TRY,
  WELCOME,
  WRONG,
} from "../../utils/Constant";
import { useToast } from "../../hooks/useToast";
import { CustomTextBox } from "../../Components/Common/TextBox";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fire = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") && data.get("password")) {
      // dispatching our loginSlice async action

      dispatch(
        loginAsync({ email: data.get("email"), password: data.get("password") })
      )
        .unwrap()
        .then((res) => {
          if (res.length > 0) {
            localStorage.setItem("userName", res[0].email); //setting userName in localStorage
            fire(WELCOME, LOGGED_IN); //showing toast message
            navigate(DASHBOARD); //navigating to dashboard
          } else {
            //handling if credentials not found
            fire(TRY, WRONG, ERROR); //showing toast message
          }
        })
        .catch((err) => {
          fire(ERROR_INCIDENT, ERROR_MESSAGE, ERROR); //showing toast message
        });
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box mt={20}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Avatar sx={{ bgcolor: "cyan" }}>
            <LockOpenIcon sx={{ fontSize: 30 }} />
          </Avatar>
        </Box>
        <Box display="flex" flexDirection="column" flexWrap="wrap">
          <Box>
            <h1>Login Here</h1>
          </Box>
          <form onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <CustomTextBox id="email" label="User Name" name="email" />
            <CustomTextBox
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
