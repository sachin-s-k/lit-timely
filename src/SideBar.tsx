import { Calendar, Folder } from "lucide-react";

//import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// Yup Validation Schema
// const validationSchema = Yup.object({
//   eventTitle: Yup.string().required("Event Title is required"),
//   description: Yup.string().required("Description is required"),
//   duration: Yup.number()
//     .required("Duration is required")
//     .positive("Duration must be a positive number")
//     .integer("Duration must be an integer"),
//   eventPrivacy: Yup.string()
//     .oneOf(
//       ["public", "private"],
//       "Event Privacy must be either 'public' or 'private'"
//     )
//     .required("Event Privacy is required"),
// });

import Events from "./Events";

import Testing from "./Testing";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import LinkPart from "./LinkPart";
import Meeting from "./Meeting";
import AppointmentTypesList from "./AppoinmentTypeList";
import { addActiveNavState } from "./app-store/gloabalSlice";
import Cookies from "js-cookie";
import { clearUserData } from "./app-store/registerSlice";
import { clearEventData } from "./app-store/eventSlice";
// Navigation items for sidebar
const navItems = [
  { href: "/events", label: "My Events", icon: Folder },
  { href: "/meeting", label: "Meeting", icon: Calendar },
  // { href: "/availability", label: "Availability", icon: CalendarClock },
  // { href: "/tab", label: "side", icon: Clock },
];

const SideBar = () => {
  const dispatch = useDispatch();
  const activeNav = useSelector((state: any) => state.global.activeNav);

  const handleSideBarNavigation = (index: any) => {
    // Dispatch the active navigation change
    if (index === 0) {
      navigate("/events/user");

      dispatch(addActiveNavState(index));
    } else if (index === 1) {
      navigate("/meetings/user");

      dispatch(addActiveNavState(index));
    } else if (index === 2) {
      navigate("/availability/user");
    } else if (index === 3) {
      navigate("/events/types_list");

      dispatch(addActiveNavState(index));
    }
  };
  const eventData = useSelector((state: any) => state.event.eventData);
  const userData = useSelector((state: any) => state.registration.userData);

  const navigate = useNavigate();

  // const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  // const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state
  // const [isSubmittings, setIsSubmitting] = useState(false);
  // const handleNavigation = (tab: number) => {
  //   console.log(tab, "tabbbbbbb");

  //   if (tab === 0) {
  //     navigate("/events/user");
  //     setTabItem(tab);
  //   } else if (tab === 1) {
  //     navigate("/meetings/user");
  //     setTabItem(tab);
  //   } else if (tab === 2) {
  //     navigate("/availability/user");
  //     setTabItem(tab);
  //   } else if (tab === 3) {
  //     // navigate("/tab/user");
  //     setTabItem(tab);
  //   }
  // };
  //const [effect, setEffect] = useState(false);
  // useEffect(() => {
  //   console.log("set effectttt");
  // }, [effect]);
  const handleLogOut = () => {
    console.log("dleteeee");

    // Clear the authentication cookie
    Cookies.remove("authToken");

    // Clear user data from Redux
    dispatch(clearUserData([] as any));
    dispatch(clearEventData([] as any));
    // Redirect to the login page
    navigate("/");
  };
  return (
    <div className="bg-gray-50 h-screen flex flex-col ">
      {/* Header */}
      <div className="shadow-sm border-b border-blue-100 fixed top-0 left-0 right-0 z-20">
        <div className="w-full bg-white px-6 py-4 flex justify-between items-center">
          {/* Left Section: Company Logo and Name */}
          <div className="flex items-center space-x-1">
            <img
              src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png"
              alt="Company Logo"
              className="h-11 w-11"
            />
            <span className="text-2xl font-bold text-blue-500">CalendLIT</span>
          </div>

          {/* Right Section: User Initial and Sign Out */}
          <div className="flex items-center space-x-4">
            {/* User Initial */}
            <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full overflow-hidden">
              {userData.profileImageUrl ? (
                <img
                  src={userData.profileImageUrl}
                  alt={`${userData.firstName}'s profile`}
                  className="w-full h-full object-cover"
                />
              ) : (
                userData.firstName.charAt(0).toUpperCase()
              )}
            </div>

            {/* Sign Out Button */}
            <button
              onClick={() => handleLogOut()}
              className="flex items-center text-gray-600 hover:text-red-500"
            >
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
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full pt-[4rem]  border-r-2 border-blue-400">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-lg h-full fixed left-0 top-[4rem]  overflow-y-auto">
          <nav className="mt-12">
            {/* Create Button */}
            <div
              className="hover:bg-blue-100 w-56 h-11 mt-16 flex justify-center items-center border border-blue-400 rounded-full mx-auto cursor-pointer"
              onClick={() => {
                handleSideBarNavigation(3);
              }}
            >
              <div className="flex items-center gap-1 text-blue-800 font-light ">
                <span className="text-xl text-black">+</span>
                <span className="text-md text-black">Create</span>
              </div>
            </div>

            {/* Navigation Items */}
            <ul className="mt-8">
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  className={`flex items-center px-4 py-3 text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition transform rounded-md cursor-pointer
                 ${
                   activeNav === index
                     ? "bg-blue-200 scale-105  rounded-lg m-2"
                     : ""
                 } 
               `}
                  onClick={() => handleSideBarNavigation(index)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="text-sm text-black font-bold">
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="ml-64 w-full overflow-y-auto">
          <div className="p-6">
            {eventData?.length >= 1 && (
              <div className={`${activeNav === 0 ? "mt-12" : "mt-0"}`}>
                <div className="flex justify-between">
                  <header className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                      {activeNav !== 1 && activeNav !== 2 && activeNav !== 3 ? (
                        <span>Welcome, {userData?.firstName}</span>
                      ) : (
                        ""
                      )}
                      {/* {activeNav == 1 ? <span>Your meetings</span> : ""} */}
                      {activeNav == 2 ? <span>Availability</span> : ""}
                    </h1>
                  </header>
                </div>
                <div>
                  {activeNav == 2 && (
                    <p className="text-gray-500 font-semibold text-lg">
                      View your Availability,
                    </p>
                  )}
                </div>

                {activeNav !== 1 && activeNav !== 2 && activeNav !== 3 && (
                  <LinkPart />
                )}
              </div>
            )}
            {activeNav === 0 && <Events />}
            {activeNav === 1 && <Meeting />}
            {activeNav === 2 && <Testing />}
            {activeNav === 3 && <AppointmentTypesList />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SideBar;
