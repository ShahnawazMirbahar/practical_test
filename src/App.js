import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import PrivateRoute from "./routes/PrivateRoutes/PrivateRoutes";
import Dashboard from "./pages/Dashboard/Dashboard";
import Tasks from "./pages/Tasks/Tasks";
import CreateTask from "./pages/Tasks/CreateTask";
import TaskDetails from "./pages/Tasks/TaskDetails";
import Members from "./pages/Members/Members";
import CreateMember from "./pages/Members/CreateMember";
import MemberDetails from "./pages/Members/MemberDetails";
import { getPath } from "./utils/RouteUtils";
import {
  CREATEMEMBERS,
  CREATETASKS,
  DASHBOARD,
  LOGIN,
  MEMBERDETAILS,
  MEMBERS,
  TASKDETAILS,
  TASKS,
} from "./routes";

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path={getPath(LOGIN)} exact element={<Login />} />
            <Route
              path={getPath(DASHBOARD)}
              exact
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path={getPath(TASKS)}
              exact
              element={
                <PrivateRoute>
                  <Tasks />
                </PrivateRoute>
              }
            />
            <Route
              path={getPath(CREATETASKS)}
              exact
              element={
                <PrivateRoute>
                  <CreateTask />
                </PrivateRoute>
              }
            />
            <Route
              path={getPath(TASKDETAILS)}
              exact
              element={
                <PrivateRoute>
                  <TaskDetails />
                </PrivateRoute>
              }
            />
            <Route
              path={getPath(MEMBERS)}
              exact
              element={
                <PrivateRoute>
                  <Members />
                </PrivateRoute>
              }
            />
            <Route
              path={getPath(CREATEMEMBERS)}
              exact
              element={
                <PrivateRoute>
                  <CreateMember />
                </PrivateRoute>
              }
            />
            <Route
              path={getPath(MEMBERDETAILS)}
              exact
              element={
                <PrivateRoute>
                  <MemberDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
