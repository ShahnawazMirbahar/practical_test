import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../pages/Login/loginStore/loginSlice";
import taskReducer from "../pages/Tasks/taskStore/taskSlice";
import memberReducer from "../pages/Members/memberStore/memberSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    tasks: taskReducer,
    members: memberReducer,
  },
});
