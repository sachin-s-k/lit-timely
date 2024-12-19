import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }: any) => {
  const userData = useSelector((state: any) => state.registration.userData); // Check if userData exists

  if (!userData) {
    return <Navigate to="/" replace />; // Redirect to home if not logged in
  }

  return children; // Render the route if userData exists
};

export default ProtectedRoute;
