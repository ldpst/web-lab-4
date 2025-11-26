import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const context = useContext(AuthContext);
    console.log(context);
    setTimeout(5000);

  if (!context.token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;