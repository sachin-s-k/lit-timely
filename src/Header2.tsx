import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "./app-store/registerSlice";
import { clearEventData } from "./app-store/eventSlice";

const Header2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((state: any) => state.registration.userData);

  const handleLogOut = () => {
    // Clear the authentication cookie
    Cookies.remove("authToken");

    // Clear user data from Redux
    dispatch(clearUserData([] as any));
    dispatch(clearEventData([] as any));
    // Redirect to the login page
    navigate("/");
  };
  return (
    <div className=" shadow-sm border-b border-blue-50">
      <div className="w-full bg-white shadow-d px-6 py-4 flex justify-between items-center">
        {/* Left Section: Company Logo and Name */}
        <div className="flex items-center space-x-1">
          <img
            src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png" // Replace with your company logo path
            alt="Company Logo"
            className="h-11 w-11"
          />
          <span className="text-2xl font-bold text-blue-500">CalendLIT</span>
        </div>

        {/* Right Section: User Initial and Sign Out */}
        <div className="flex items-center space-x-4">
          {/* User Initial */}
          <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full">
            {userData.firstName.charAt(0).toUpperCase()}
            {/* Replace 'A' with the user's first initial dynamically */}
          </div>

          {/* Sign Out Button */}
          <button className="flex items-center text-gray-600 hover:text-red-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 007.5 21h6.75a2.25 2.25 0 002.25-2.25V15M15 12h6m0 0l-3-3m3 3l-3 3"
              />
            </svg>
            <span
              className="text-sm font-medium"
              onClick={() => {
                handleLogOut;
              }}
            >
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header2;
