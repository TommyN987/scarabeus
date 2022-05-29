import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ProtectedRouteProps } from "../../types/types";

const ProtectedRoute = ({ children }: ProtectedRouteProps): any => {
  
  const userContext = useContext(AuthContext);

  if (!userContext?.activeUser) {
    return <Navigate to='/' />
  }
  
  return children
}
export default ProtectedRoute