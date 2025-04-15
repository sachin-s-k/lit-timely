import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const userData = useSelector((state: any) => state.registration.userData);
  const authToken = Cookies.get(`authToken${userData?._id}`);

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};
