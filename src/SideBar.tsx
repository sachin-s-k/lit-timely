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
import { useState } from "react";

import { useSelector } from "react-redux";
import LinkPart from "./LinkPart";
import Meeting from "./Meeting";
import AppointmentTypesList from "./AppoinmentTypeList";

// Navigation items for sidebar
const navItems = [
  { href: "/events", label: "My Events", icon: Folder },
  { href: "/meeting", label: "Meeting", icon: Calendar },
  // { href: "/availability", label: "Availability", icon: CalendarClock },
  // { href: "/tab", label: "side", icon: Clock },
];

const SideBar = () => {
  const eventData = useSelector((state: any) => state.event.eventData);
  const userData = useSelector((state: any) => state.registration.userData);

  const navigate = useNavigate();
  const [tabItem, setTabItem] = useState(0);
  // const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  // const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state
  // const [isSubmittings, setIsSubmitting] = useState(false);
  const handleNavigation = (tab: number) => {
    console.log(tab, "tabbbbbbb");

    if (tab === 0) {
      navigate("/events/user");
      setTabItem(tab);
    } else if (tab === 1) {
      navigate("/meetings/user");
      setTabItem(tab);
    } else if (tab === 2) {
      navigate("/availability/user");
      setTabItem(tab);
    } else if (tab === 3) {
      // navigate("/tab/user");
      setTabItem(tab);
    }
  };
  //const [effect, setEffect] = useState(false);
  // useEffect(() => {
  //   console.log("set effectttt");
  // }, [effect]);

  return (
    <div className="bg-gray-50 h-screen flex flex-col">
      {/* Header */}
      <div className="shadow-sm border-b border-blue-50 fixed top-0 left-0 right-0 z-20">
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
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full pt-[4rem]">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 bg-white shadow-lg h-full fixed left-0 top-[4rem]  overflow-y-auto">
          <nav className="mt-12">
            {/* Create Button */}
            <div
              className="hover:bg-blue-100 w-56 h-11 mt-16 flex justify-center items-center border border-blue-400 rounded-full mx-auto cursor-pointer"
              onClick={() => {
                handleNavigation(3);
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
                  className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition rounded-md cursor-pointer"
                  onClick={() => {
                    handleNavigation(index);
                  }}
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
              <div className="mt-12">
                <div className="flex justify-between">
                  <header className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                      {tabItem == 0 ? (
                        <span>Welcome, {userData?.firstName}</span>
                      ) : (
                        ""
                      )}
                      {tabItem == 1 ? <span>Your meetings</span> : ""}
                      {tabItem == 2 ? <span>Availability</span> : ""}
                    </h1>
                  </header>
                </div>
                <div>
                  {tabItem == 2 && (
                    <p className="text-gray-500 font-semibold text-lg">
                      View your Availability,
                    </p>
                  )}
                </div>

                {tabItem !== 3 && <LinkPart />}
              </div>
            )}
            {tabItem === 0 && <Events />}
            {tabItem === 1 && <Meeting />}
            {tabItem === 2 && <Testing />}
            {tabItem === 3 && <AppointmentTypesList />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SideBar;
