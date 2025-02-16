import { Calendar, Folder, Trash2, XIcon } from "lucide-react";

import Events from "./Events";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Meeting from "./Meeting";
import AppointmentTypesList from "./AppoinmentTypeList";
import { addActiveNavState } from "./app-store/gloabalSlice";
import Cookies from "js-cookie";
import { clearUserData } from "./app-store/registerSlice";
import { clearEventData, removeDeleteEventIds } from "./app-store/eventSlice";
import { useEffect, useState } from "react";
import { addMeetingData } from "./app-store/meetingSlice";
import DeleteModal from "./DeleteModal";
import { axiosInstance } from "./config/http";
const navItems = [
  { href: "/events", label: "My Event", icon: Folder },
  { href: "/meeting", label: "Meetings", icon: Calendar },
];

const SideBar = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const selectedEvents = useSelector(
    (state: any) => state.event.deleteEventIds
  );
  console.log(selectedEvents, "seleeeeee");

  const activeNav = useSelector((state: any) => state.global.activeNav);
  const handleSideBarNavigation = (index: any) => {
    // Dispatch the active navigation change
    if (index === 0) {
      navigate("/events/user/me");

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

  const handleLogOut = () => {
    console.log("dleteeee");

    // Clear the authentication cookie
    Cookies.remove("authToken");

    // Clear user data from Redux
    dispatch(clearUserData({} as any));
    dispatch(clearEventData([] as any));
    dispatch(addMeetingData([] as any));
    dispatch(addActiveNavState(0 as any));
    Cookies.remove("authToken" + userData._id);
    // Redirect to the login page
    navigate("/");
  };

  //
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Handler to update online status
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen for online/offline events
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  const handleDelete = async () => {
    //dispatch(clearDeletedEvents([] as any));
    console.log("start coneeeemmm");

    try {
      const deleteResponse = await axiosInstance.put(`/events/delete`, {
        selectedIds: selectedEvents,
      });

      if (deleteResponse.data.success) {
        setModalOpen(false);
        dispatch(removeDeleteEventIds(deleteResponse.data.data));
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };
  const OnClose = () => {
    setModalOpen(false);
    dispatch(removeDeleteEventIds(selectedEvents));
  };

  return (
    <>
      <div className=" bg-white h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex h-full border-r-2">
          {/* Sidebar */}
          <aside className="hidden md:block w-64 bg-white border border-r-blue-100 shadow-lg h-full fixed left-0 top-0 overflow-y-auto">
            {/* Logo and Company Name */}
            <div className="flex items-center justify-center m-6 gap-2">
              <img
                src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png"
                alt="Company Logo"
                className="h-14 w-14"
              />
              <span className="text-4xl font-bold text-blue-500">Cal.LIT</span>
            </div>

            {/* Create Button */}
            <div
              className="hover:bg-blue-100 w-56 h-12 mt-10 flex justify-center items-center border border-blue-400 rounded-full mx-auto cursor-pointer"
              onClick={() => {
                handleSideBarNavigation(3);
              }}
            >
              <div className="flex items-center gap-1 text-blue-800 font-light">
                <span className="text-xl text-black">+</span>
                <span className="text-md text-black">Create</span>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="mt-8">
              <ul className=" ">
                {navItems.map((item, index) => (
                  <li
                    key={item.href}
                    className={`flex items-center px-4 font-extrabold  m-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition transform rounded-md cursor-pointer ${
                      activeNav === index
                        ? "bg-blue-100 scale-105     rounded-lg m-4 text-blue-500"
                        : ""
                    }`}
                    onClick={() => handleSideBarNavigation(index)}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span
                      className={`text-sm text-black font-extrabold ${
                        activeNav === index ? " text-blue-500 " : ""
                      }`}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Content Area */}
          <main className="ml-64 w-full overflow-y-auto relative">
            {/* Account and Logout Section */}
            <div className="absolute top-4 right-6 flex items-center space-x-4">
              {/* Profile Picture */}
              <div className="relative w-8 h-8">
                <div
                  className={`absolute inset-0 rounded-full ring-2 ${
                    isOnline ? "ring-blue-400" : "ring-red-400"
                  }`}
                ></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  {userData.profileImageUrl !== null ? (
                    <img
                      src={userData.profileImageUrl}
                      alt={`${userData.firstName}'s profile`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full">
                      {userData.firstName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Logout Button */}
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
                <span className="text-sm font-medium">Log Out</span>
              </button>
            </div>

            {/* Main Content */}
            <div className="p-6 ">
              {/* Welcome Message */}

              {/* Events, Meetings, Appointment Types */}
              {eventData?.length >= 1 && (
                <div className={`${activeNav === 0 ? "" : "mt-0"}`}>
                  <div>
                    {activeNav == 2 && (
                      <p className="text-gray-500 font-semibold text-lg">
                        View your Availability,
                      </p>
                    )}
                  </div>
                </div>
              )}
              {activeNav === 0 && <Events />}
              {activeNav === 1 && <Meeting />}
              {activeNav === 3 && <AppointmentTypesList />}
            </div>
          </main>
        </div>

        {selectedEvents?.length >= 1 && (
          <div className="fixed bottom-0 z-20 left-64 w-[calc(100%-16rem)] overflow-hidden bg-white shadow-md  py-4 flex p-4 gap-4 transition-transform duration-300">
            <p className="text-lg mt-1 flex gap-1">
              <XIcon className=" mt-1.5" size={20} />
              {selectedEvents.length} Selected
            </p>
            <button className="px-6 py-2 bg-white border  text-white rounded-md hover:bg-blue-50">
              <Trash2
                color="black"
                onClick={() => {
                  setModalOpen(true);
                }}
              />
            </button>
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={modalOpen}
        onClose={OnClose}
        deleteFn={handleDelete}
      />
    </>
  );
};

export default SideBar;
