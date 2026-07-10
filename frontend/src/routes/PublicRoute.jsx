import { Navigate } from "react-router-dom";

const isAuthenticated = false;

const PublicRoute = ({ children }) => {
  return isAuthenticated
    ? <Navigate to="/dashboard" replace />
    : children;
};

export default PublicRoute;