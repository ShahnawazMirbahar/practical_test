import React from "react";
import { Navigate } from "react-router-dom";

const isAuthinticated = () => {
  const token = localStorage.getItem("userName");
  try {
    if (token) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

function PrivateRoute({ children }) {
  const auth = isAuthinticated();
  return auth ? children : <Navigate to="/" />;
}
export default PrivateRoute;
