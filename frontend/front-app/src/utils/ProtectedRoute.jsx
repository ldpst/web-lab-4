import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../utils/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const context = useContext(AuthContext);
  const [valid, setValid] = useState(null);

  useEffect(() => {
    if (!context.token) {
      setValid(false);
      return;
    }

    validateToken(context.token).then(isValid => {
      if (!isValid) {
        context.logout();
      }
      setValid(isValid);
    });
  }, [context]);

  if (valid === null) return <div>Проверка токена...</div>;

  if (!valid) return <Navigate to="/auth" replace />;

  return children;
};

async function validateToken(token) {
  try {
    const resp = await axios.post("http://localhost:8080/api/auth/checktoken", {
      token
    });

    return resp.data.isValid === "true";
  } catch (err) {
    console.error(err);
    return false;
  }
}


export default ProtectedRoute;