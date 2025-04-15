import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }: any) => {
  const userData = useSelector((state: any) => state.registration.userData);

  if (userData) {
    return <Navigate to="/events/user/me" replace />; // Redirect to dashboard if logged in
  }

  return children; // Render the route if no userData exists
};

export default PublicRoute;
