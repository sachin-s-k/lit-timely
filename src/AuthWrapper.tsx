import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

export const AuthWrapper = () => {
  const userData = useSelector((state: any) => state.registration.userData);
  const authToken = Cookies.get(`authToken${userData?._id}`);

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export const PublicWrapper = () => {
  const userData = useSelector((state: any) => state.registration.userData);
  const authToken = Cookies.get(`authToken${userData?._id}`);

  if (authToken) {
    return <Navigate to="/events/user/me" replace />;
  }

  return <Outlet />;
};
