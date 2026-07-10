import { Navigate } from "react-router-dom";

const isAuthenticated = true;

const ProtectedRoute = ({ children }) => {
  return isAuthenticated
    ? children
    : <Navigate to="/login" replace />;
};

export default ProtectedRoute;