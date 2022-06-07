import { Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { ProtectedRouteProps } from "../../types/types";

const ProtectedRoute = ({ children }: ProtectedRouteProps): any => {
  
  auth.onAuthStateChanged(user => {
    if (!user) {
      return <Navigate to='/' />
    }
  })
  
  return children
}
export default ProtectedRoute