// import { Calendar, Folder, Plus, Trash2, XIcon } from "lucide-react";

// import Events from "./Events";

// import { useNavigate } from "react-router-dom";

// import { useDispatch, useSelector } from "react-redux";
// import Meeting from "./Meeting";
// import AppointmentTypesList from "./AppoinmentTypeList";
// import { addActiveNavState } from "./app-store/gloabalSlice";
// import Cookies from "js-cookie";
// import { clearUserData } from "./app-store/registerSlice";
// import { clearEventData, removeDeleteEventIds } from "./app-store/eventSlice";
// import { useEffect, useState } from "react";
// import { addMeetingData } from "./app-store/meetingSlice";
// import DeleteModal from "./DeleteModal";
// import { axiosInstance } from "./config/http";
// const navItems = [
//   { href: "/events", label: "My Events", icon: Folder },
//   { href: "/meeting", label: "Meetings", icon: Calendar },
// ];

// const SideBar = () => {
//   const [modalOpen, setModalOpen] = useState(false);

//   const dispatch = useDispatch();
//   const selectedEvents = useSelector(
//     (state: any) => state.event.deleteEventIds
//   );

//   const activeNav = useSelector((state: any) => state.global.activeNav);
//   const handleSideBarNavigation = (index: any) => {
//     // Dispatch the active navigation change
//     if (index === 0) {
//       navigate("/events/user/me");

//       dispatch(addActiveNavState(index));
//     } else if (index === 1) {
//       navigate("/meetings/user");

//       dispatch(addActiveNavState(index));
//     } else if (index === 2) {
//       navigate("/availability/user");
//     } else if (index === 3) {
//       navigate("/events/types_list");

//       dispatch(addActiveNavState(index));
//     }
//   };
//   const eventData = useSelector((state: any) => state.event.eventData);
//   const userData = useSelector((state: any) => state.registration.userData);

//   const navigate = useNavigate();

//   const handleLogOut = () => {
//     // Clear the authentication cookie
//     Cookies.remove("authToken");

//     // Clear user data from Redux
//     dispatch(clearUserData({} as any));
//     dispatch(clearEventData([] as any));
//     dispatch(addMeetingData([] as any));
//     dispatch(addActiveNavState(0 as any));
//     Cookies.remove("authToken" + userData._id);
//     // Redirect to the login page
//     navigate("/");
//   };

//   //
//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     // Handler to update online status
//     const updateOnlineStatus = () => {
//       setIsOnline(navigator.onLine);
//     };

//     // Listen for online/offline events
//     window.addEventListener("online", updateOnlineStatus);
//     window.addEventListener("offline", updateOnlineStatus);

//     // Cleanup event listeners on component unmount
//     return () => {
//       window.removeEventListener("online", updateOnlineStatus);
//       window.removeEventListener("offline", updateOnlineStatus);
//     };
//   }, []);

//   const handleDelete = async () => {
//     //dispatch(clearDeletedEvents([] as any));

//     try {
//       const deleteResponse = await axiosInstance.put(`/events/delete`, {
//         selectedIds: selectedEvents,
//       });

//       if (deleteResponse.data.success) {
//         setModalOpen(false);
//         dispatch(removeDeleteEventIds(deleteResponse.data.data));
//         window.location.reload();
//       }
//     } catch (error) {}
//   };
//   const OnClose = () => {
//     setModalOpen(false);
//     dispatch(removeDeleteEventIds(selectedEvents));
//   };

//   return (
//     // <>
//     //   <div className=" bg-white h-screen flex flex-col">
//     //     {/* Main Content */}
//     //     <div className="flex h-full border-r-2">
//     //       {/* Sidebar */}
//     //       <aside className="hidden md:block w-64 bg-white border border-r-blue-100 shadow-lg h-full fixed left-0 top-0 overflow-y-auto">
//     //         {/* Logo and Company Name */}
//     //         <div className="flex items-center justify-start ml-0 mt-12  px-4">
//     //           <img
//     //             src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png"
//     //             alt="Company Logo"
//     //             className="h-14 w-14"
//     //           />
//     //           <span className="text-4xl font-bold text-blue-500">Cal.LIT</span>
//     //         </div>

//     //         {/* Create Button */}
//     //         <div
//     //           className="hover:bg-blue-100 w-56 h-12 mt-6 flex justify-center items-center border border-blue-400 rounded-full mx-auto cursor-pointer"
//     //           onClick={() => {
//     //             handleSideBarNavigation(3);
//     //           }}
//     //         >
//     //           <div className="flex items-center gap-1 text-blue-800 font-light">
//     //             <span className="text-xl text-black">+</span>
//     //             <span className="text-md text-black">Create</span>
//     //           </div>
//     //         </div>

//     //         {/* Navigation Items */}
//     //         <nav className="mt-8">
//     //           <ul className=" ">
//     //             {navItems.map((item, index) => (
//     //               <li
//     //                 key={item.href}
//     //                 className={`flex items-center px-4 font-extrabold  m-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition transform rounded-md cursor-pointer ${
//     //                   activeNav === index
//     //                     ? "bg-blue-100 scale-105 rounded-lg m-4 text-blue-500"
//     //                     : ""
//     //                 }`}
//     //                 onClick={() => handleSideBarNavigation(index)}
//     //               >
//     //                 <item.icon className="w-5 h-5 mr-3" />
//     //                 <span
//     //                   className={`text-sm text-black font-opensauce font-extrabold ${
//     //                     activeNav === index ? " text-blue-500 " : ""
//     //                   }`}
//     //                 >
//     //                   {item.label}
//     //                 </span>
//     //               </li>
//     //             ))}
//     //           </ul>
//     //         </nav>
//     //       </aside>

//     //       {/* Content Area */}
//     //       <main className="ml-64 w-full overflow-y-auto relative">
//     //         {/* Account and Logout Section */}
//     //         <div className="absolute top-4 right-6 flex items-center space-x-4">
//     //           {/* Profile Picture */}
//     //           <div className="relative w-8 h-8">
//     //             <div
//     //               className={`absolute inset-0 rounded-full ring-2 ${
//     //                 isOnline ? "ring-blue-400" : "ring-red-400"
//     //               }`}
//     //             ></div>
//     //             <div className="relative w-full h-full flex items-center justify-center">
//     //               {userData.profileImageUrl ? (
//     //                 <img
//     //                   src={userData?.profileImageUrl}
//     //                   alt={`${userData?.firstName.charAt(0)}'s profile`}
//     //                   className="w-full h-full object-cover rounded-full"
//     //                 />
//     //               ) : (
//     //                 <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full">
//     //                   {userData.firstName?.charAt(0).toUpperCase()}
//     //                 </div>
//     //               )}
//     //             </div>
//     //           </div>

//     //           {/* Logout Button */}
//     //           <button
//     //             onClick={() => handleLogOut()}
//     //             className="flex items-center text-gray-600 hover:text-red-500"
//     //           >
//     //             <svg
//     //               xmlns="http://www.w3.org/2000/svg"
//     //               fill="none"
//     //               viewBox="0 0 24 24"
//     //               strokeWidth={2}
//     //               stroke="currentColor"
//     //               className="w-6 h-6 mr-2"
//     //             >
//     //               <path
//     //                 strokeLinecap="round"
//     //                 strokeLinejoin="round"
//     //                 d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 007.5 21h6.75a2.25 2.25 0 002.25-2.25V15M15 12h6m0 0l-3-3m3 3l-3 3"
//     //               />
//     //             </svg>
//     //             <span className="text-sm text-gray-500 font-medium font-opensauce">
//     //               Log Out
//     //             </span>
//     //           </button>
//     //         </div>

//     //         {/* Main Content */}
//     //         <div className="p-6 ">
//     //           {/* Welcome Message */}

//     //           {/* Events, Meetings, Appointment Types */}
//     //           {eventData?.length >= 1 && (
//     //             <div className={`${activeNav === 0 ? "" : "mt-0"}`}>
//     //               <div>
//     //                 {activeNav == 2 && (
//     //                   <p className="text-gray-500 font-semibold text-lg">
//     //                     View your Availability,
//     //                   </p>
//     //                 )}
//     //               </div>
//     //             </div>
//     //           )}
//     //           {activeNav === 0 && <Events />}
//     //           {activeNav === 1 && <Meeting />}
//     //           {activeNav === 3 && <AppointmentTypesList />}
//     //         </div>
//     //       </main>
//     //     </div>

//     //     {selectedEvents?.length >= 1 && (
//     //       <div className="fixed bottom-0 z-20 left-64 w-[calc(100%-16rem)] overflow-hidden bg-white shadow-md  py-4 flex p-4 gap-4 transition-transform duration-300">
//     //         <p className="text-lg mt-1 flex gap-1">
//     //           <XIcon className=" mt-1.5" size={20} />
//     //           {selectedEvents.length} Selected
//     //         </p>
//     //         <button className="px-6 py-2 bg-white border  text-white rounded-md hover:bg-blue-50">
//     //           <Trash2
//     //             color="black"
//     //             onClick={() => {
//     //               setModalOpen(true);
//     //             }}
//     //           />
//     //         </button>
//     //       </div>
//     //     )}
//     //   </div>
//     //   <DeleteModal
//     //     isOpen={modalOpen}
//     //     onClose={OnClose}
//     //     deleteFn={handleDelete}
//     //   />
//     // </>

//     <>
//       <div className="bg-white min-h-screen flex flex-col">
//         {/* Desktop Sidebar (hidden on mobile) */}
//         <aside className="hidden md:block w-64 bg-white border-r border-blue-100 shadow-lg h-screen fixed left-0 top-0 overflow-y-auto">
//           {/* Desktop sidebar content (same as before) */}
//           <div className="flex items-center justify-start ml-0 mt-12 px-4">
//             <img
//               src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png"
//               alt="Company Logo"
//               className="h-14 w-14"
//             />
//             <span className="text-4xl font-bold text-blue-500">Cal.LIT</span>
//           </div>

//           <div
//             className="hover:bg-blue-100 w-56 h-12 mt-6 flex justify-center items-center border border-blue-400 rounded-full mx-auto cursor-pointer"
//             onClick={() => handleSideBarNavigation(3)}
//           >
//             <div className="flex items-center gap-1 text-blue-800 font-light">
//               <Plus className="text-xl text-black" />
//               <span className="text-md text-black">Create</span>
//             </div>
//           </div>

//           <nav className="mt-8">
//             <ul className="">
//               {navItems.map((item, index) => (
//                 <li
//                   key={item.href}
//                   className={`flex items-center px-4 font-extrabold m-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition transform rounded-md cursor-pointer ${
//                     activeNav === index
//                       ? "bg-blue-100 scale-105 rounded-lg m-4 text-blue-500"
//                       : ""
//                   }`}
//                   onClick={() => handleSideBarNavigation(index)}
//                 >
//                   <item.icon className="w-5 h-5 mr-3" />
//                   <span
//                     className={`text-sm text-black font-opensauce font-extrabold ${
//                       activeNav === index ? " text-blue-500 " : ""
//                     }`}
//                   >
//                     {item.label}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </aside>

//         {/* Main Content Area */}
//         <main className="md:ml-64 w-full overflow-y-auto relative pb-16 md:pb-0">
//           {/* Account and Logout Section (same as before) */}
//           <div className="absolute top-4 right-6 flex items-center space-x-4">
//             {/* ... existing profile and logout code */}
//           </div>

//           {/* Page Content */}
//           <div className="p-6">
//             {activeNav === 0 && <Events />}
//             {activeNav === 1 && <Meeting />}
//             {activeNav === 3 && <AppointmentTypesList />}
//           </div>
//         </main>

//         {/* Mobile Bottom Navigation (shown only on mobile) */}
//         <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
//           <div className="flex justify-around items-center h-16">
//             {navItems.map((item, index) => (
//               <button
//                 key={item.href}
//                 className={`flex flex-col items-center justify-center w-full h-full ${
//                   activeNav === index ? "text-blue-500" : "text-gray-600"
//                 }`}
//                 onClick={() => handleSideBarNavigation(index)}
//               >
//                 <item.icon className="w-5 h-5" />
//                 <span className="text-xs mt-1">{item.label}</span>
//               </button>
//             ))}
//             <button
//               className={`flex flex-col items-center justify-center w-full h-full ${
//                 activeNav === 3 ? "text-blue-500" : "text-gray-600"
//               }`}
//               onClick={() => handleSideBarNavigation(3)}
//             >
//               <Plus className="w-5 h-5" />
//               <span className="text-xs mt-1">Create</span>
//             </button>
//           </div>
//         </div>

//         {/* Selected Events Bar (position adjusted for mobile) */}
//         {selectedEvents?.length >= 1 && (
//           <div className="fixed bottom-16 md:bottom-0 z-20 left-0 md:left-64 w-full md:w-[calc(100%-16rem)] bg-white shadow-md py-4 flex p-4 gap-4 transition-transform duration-300">
//             <p className="text-lg mt-1 flex gap-1">
//               <XIcon className="mt-1.5" size={20} />
//               {selectedEvents.length} Selected
//             </p>
//             <button
//               className="px-6 py-2 bg-white border text-white rounded-md hover:bg-blue-50"
//               onClick={() => setModalOpen(true)}
//             >
//               <Trash2 color="black" />
//             </button>
//           </div>
//         )}
//       </div>

//       <DeleteModal
//         isOpen={modalOpen}
//         onClose={OnClose}
//         deleteFn={handleDelete}
//       />
//     </>
//   );
// };

// export default SideBar;

// import { Calendar, Folder, Plus, Trash2, XIcon } from "lucide-react";
// import Events from "./Events";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Meeting from "./Meeting";
// import AppointmentTypesList from "./AppoinmentTypeList";
// import { addActiveNavState } from "./app-store/gloabalSlice";
// import Cookies from "js-cookie";
// import { clearUserData } from "./app-store/registerSlice";
// import { clearEventData, removeDeleteEventIds } from "./app-store/eventSlice";
// import { useEffect, useState } from "react";
// import { addMeetingData } from "./app-store/meetingSlice";
// import DeleteModal from "./DeleteModal";
// import { axiosInstance } from "./config/http";

// const navItems = [
//   { href: "/events", label: "My Events", icon: Folder },
//   { href: "/meeting", label: "Meetings", icon: Calendar },
// ];

// const SideBar = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const dispatch = useDispatch();
//   const selectedEvents = useSelector(
//     (state: any) => state.event.deleteEventIds
//   );
//   const activeNav = useSelector((state: any) => state.global.activeNav);

//   const handleSideBarNavigation = (index: any) => {
//     if (index === 0) {
//       navigate("/events/user/me");
//       dispatch(addActiveNavState(index));
//     } else if (index === 1) {
//       navigate("/meetings/user");
//       dispatch(addActiveNavState(index));
//     } else if (index === 2) {
//       navigate("/availability/user");
//     } else if (index === 3) {
//       navigate("/events/types_list");
//       dispatch(addActiveNavState(index));
//     }
//   };

//   const eventData = useSelector((state: any) => state.event.eventData);
//   const userData = useSelector((state: any) => state.registration.userData);
//   const navigate = useNavigate();

//   const handleLogOut = () => {
//     Cookies.remove("authToken");
//     dispatch(clearUserData({} as any));
//     dispatch(clearEventData([] as any));
//     dispatch(addMeetingData([] as any));
//     dispatch(addActiveNavState(0 as any));
//     Cookies.remove("authToken" + userData._id);
//     navigate("/");
//   };

//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const updateOnlineStatus = () => {
//       setIsOnline(navigator.onLine);
//     };

//     window.addEventListener("online", updateOnlineStatus);
//     window.addEventListener("offline", updateOnlineStatus);

//     return () => {
//       window.removeEventListener("online", updateOnlineStatus);
//       window.removeEventListener("offline", updateOnlineStatus);
//     };
//   }, []);

//   const handleDelete = async () => {
//     try {
//       const deleteResponse = await axiosInstance.put(`/events/delete`, {
//         selectedIds: selectedEvents,
//       });

//       if (deleteResponse.data.success) {
//         setModalOpen(false);
//         dispatch(removeDeleteEventIds(deleteResponse.data.data));
//         window.location.reload();
//       }
//     } catch (error) {}
//   };

//   const OnClose = () => {
//     setModalOpen(false);
//     dispatch(removeDeleteEventIds(selectedEvents));
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-white">
//       {/* Desktop Sidebar */}
//       <aside className="hidden md:flex md:w-64 bg-white border-r border-blue-100 shadow-lg h-screen sticky top-0 overflow-y-auto flex-shrink-0">
//         <div className="w-full">
//           {/* Logo and Company Name */}
//           <div className="flex items-center justify-start ml-0 mt-12 px-4">
//             <img
//               src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png"
//               alt="Company Logo"
//               className="h-14 w-14"
//             />
//             <span className="text-4xl font-bold text-blue-500">Cal.LIT</span>
//           </div>

//           {/* Create Button */}
//           <div
//             className="hover:bg-blue-100 w-56 h-12 mt-6 flex justify-center items-center border border-blue-400 rounded-full mx-auto cursor-pointer"
//             onClick={() => handleSideBarNavigation(3)}
//           >
//             <div className="flex items-center gap-1 text-blue-800 font-light">
//               <Plus className="text-xl text-black" />
//               <span className="text-md text-black">Create</span>
//             </div>
//           </div>

//           {/* Navigation Items */}
//           <nav className="mt-8">
//             <ul>
//               {navItems.map((item, index) => (
//                 <li
//                   key={item.href}
//                   className={`flex items-center px-4 font-extrabold m-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition transform rounded-md cursor-pointer ${
//                     activeNav === index
//                       ? "bg-blue-100 scale-105 rounded-lg m-4 text-blue-500"
//                       : ""
//                   }`}
//                   onClick={() => handleSideBarNavigation(index)}
//                 >
//                   <item.icon className="w-5 h-5 mr-3" />
//                   <span
//                     className={`text-sm text-black font-opensauce font-extrabold ${
//                       activeNav === index ? " text-blue-500 " : ""
//                     }`}
//                   >
//                     {item.label}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </aside>

//       {/* Mobile Bottom Navigation */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
//         <div className="flex justify-around items-center h-16">
//           {navItems.map((item, index) => (
//             <button
//               key={item.href}
//               className={`flex flex-col items-center justify-center w-full h-full ${
//                 activeNav === index ? "text-blue-500" : "text-gray-600"
//               }`}
//               onClick={() => handleSideBarNavigation(index)}
//             >
//               <item.icon className="w-5 h-5" />
//               <span className="text-xs mt-1">{item.label}</span>
//             </button>
//           ))}
//           <button
//             className={`flex flex-col items-center justify-center w-full h-full ${
//               activeNav === 3 ? "text-blue-500" : "text-gray-600"
//             }`}
//             onClick={() => handleSideBarNavigation(3)}
//           >
//             <Plus className="w-5 h-5" />
//             <span className="text-xs mt-1">Create</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <main className="flex-1 overflow-x-hidden">
//         {/* Account and Logout Section */}
//         <div className="absolute top-4 right-6 flex items-center space-x-4">
//           <div className="relative w-8 h-8">
//             <div
//               className={`absolute inset-0 rounded-full ring-2 ${
//                 isOnline ? "ring-blue-400" : "ring-red-400"
//               }`}
//             ></div>
//             <div className="relative w-full h-full flex items-center justify-center">
//               {userData.profileImageUrl ? (
//                 <img
//                   src={userData?.profileImageUrl}
//                   alt={`${userData?.firstName.charAt(0)}'s profile`}
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               ) : (
//                 <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full">
//                   {userData.firstName?.charAt(0).toUpperCase()}
//                 </div>
//               )}
//             </div>
//           </div>

//           <button
//             onClick={() => handleLogOut()}
//             className="flex items-center text-gray-600 hover:text-red-500"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={2}
//               stroke="currentColor"
//               className="w-6 h-6 mr-2"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 007.5 21h6.75a2.25 2.25 0 002.25-2.25V15M15 12h6m0 0l-3-3m3 3l-3 3"
//               />
//             </svg>
//             <span className="text-sm text-gray-500 font-medium font-opensauce">
//               Log Out
//             </span>
//           </button>
//         </div>

//         {/* Page Content */}
//         <div className="p-6 pt-20 md:pt-6">
//           {activeNav === 0 && <Events />}
//           {activeNav === 1 && <Meeting />}
//           {activeNav === 3 && <AppointmentTypesList />}
//         </div>
//       </main>

//       {/* Selected Events Bar */}
//       {selectedEvents?.length >= 1 && (
//         <div className="fixed bottom-16 md:bottom-0 z-20 left-0 md:left-64 right-0 bg-white shadow-md py-4 flex p-4 gap-4 transition-transform duration-300">
//           <p className="text-lg mt-1 flex gap-1">
//             <XIcon className="mt-1.5" size={20} />
//             {selectedEvents.length} Selected
//           </p>
//           <button
//             className="px-6 py-2 bg-white border text-white rounded-md hover:bg-blue-50"
//             onClick={() => setModalOpen(true)}
//           >
//             <Trash2 color="black" />
//           </button>
//         </div>
//       )}

//       <DeleteModal
//         isOpen={modalOpen}
//         onClose={OnClose}
//         deleteFn={handleDelete}
//       />
//     </div>
//   );
// };

// export default SideBar;
// import { Calendar, Folder, Plus, Trash2, XIcon } from "lucide-react";
// import Events from "./Events";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import Meeting from "./Meeting";
// import AppointmentTypesList from "./AppoinmentTypeList";
// import { addActiveNavState } from "./app-store/gloabalSlice";
// import Cookies from "js-cookie";
// import { clearUserData } from "./app-store/registerSlice";
// import { clearEventData, removeDeleteEventIds } from "./app-store/eventSlice";
// import { useEffect, useState } from "react";
// import { addMeetingData } from "./app-store/meetingSlice";
// import DeleteModal from "./DeleteModal";
// import { axiosInstance } from "./config/http";

// const navItems = [
//   { href: "/events", label: "My Events", icon: Folder },
//   { href: "/meeting", label: "Meetings", icon: Calendar },
// ];

// const SideBar = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const dispatch = useDispatch();
//   const selectedEvents = useSelector(
//     (state: any) => state.event.deleteEventIds
//   );
//   const activeNav = useSelector((state: any) => state.global.activeNav);

//   const handleSideBarNavigation = (index: any) => {
//     if (index === 0) {
//       navigate("/events/user/me");
//       dispatch(addActiveNavState(index));
//     } else if (index === 1) {
//       navigate("/meetings/user");
//       dispatch(addActiveNavState(index));
//     } else if (index === 2) {
//       navigate("/availability/user");
//     } else if (index === 3) {
//       navigate("/events/types_list");
//       dispatch(addActiveNavState(index));
//     }
//   };

//   const eventData = useSelector((state: any) => state.event.eventData);
//   const userData = useSelector((state: any) => state.registration.userData);
//   const navigate = useNavigate();

//   const handleLogOut = () => {
//     Cookies.remove("authToken");
//     dispatch(clearUserData({} as any));
//     dispatch(clearEventData([] as any));
//     dispatch(addMeetingData([] as any));
//     dispatch(addActiveNavState(0 as any));
//     Cookies.remove("authToken" + userData._id);
//     navigate("/");
//   };

//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   useEffect(() => {
//     const updateOnlineStatus = () => {
//       setIsOnline(navigator.onLine);
//     };

//     window.addEventListener("online", updateOnlineStatus);
//     window.addEventListener("offline", updateOnlineStatus);

//     return () => {
//       window.removeEventListener("online", updateOnlineStatus);
//       window.removeEventListener("offline", updateOnlineStatus);
//     };
//   }, []);

//   const handleDelete = async () => {
//     try {
//       const deleteResponse = await axiosInstance.put(`/events/delete`, {
//         selectedIds: selectedEvents,
//       });

//       if (deleteResponse.data.success) {
//         setModalOpen(false);
//         dispatch(removeDeleteEventIds(deleteResponse.data.data));
//         window.location.reload();
//       }
//     } catch (error) {}
//   };

//   const OnClose = () => {
//     setModalOpen(false);
//     dispatch(removeDeleteEventIds(selectedEvents));
//   };

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-white">
//       {/* Desktop Sidebar */}
//       <aside className="hidden md:flex md:w-64 bg-white border-r border-blue-100 shadow-lg h-screen sticky top-0 overflow-y-auto flex-shrink-0">
//         <div className="w-full">
//           {/* Logo and Company Name */}
//           <div className="flex items-center justify-start ml-0 mt-12 px-4">
//             <img
//               src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png"
//               alt="Company Logo"
//               className="h-14 w-14"
//             />
//             <span className="text-4xl font-bold text-blue-500">Cal.LIT</span>
//           </div>

//           {/* Create Button */}
//           <div
//             className="hover:bg-blue-100 w-56 h-12 mt-6 flex justify-center items-center border border-blue-400 rounded-full mx-auto cursor-pointer"
//             onClick={() => handleSideBarNavigation(3)}
//           >
//             <div className="flex items-center gap-1 text-blue-800 font-light">
//               <Plus className="text-xl text-black" />
//               <span className="text-md text-black">Create</span>
//             </div>
//           </div>

//           {/* Navigation Items */}
//           <nav className="mt-8">
//             <ul>
//               {navItems.map((item, index) => (
//                 <li
//                   key={item.href}
//                   className={`flex items-center px-4 font-extrabold m-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition transform rounded-md cursor-pointer ${
//                     activeNav === index
//                       ? "bg-blue-100 scale-105 rounded-lg m-4 text-blue-500"
//                       : ""
//                   }`}
//                   onClick={() => handleSideBarNavigation(index)}
//                 >
//                   <item.icon className="w-5 h-5 mr-3" />
//                   <span
//                     className={`text-sm text-black font-opensauce font-extrabold ${
//                       activeNav === index ? " text-blue-500 " : ""
//                     }`}
//                   >
//                     {item.label}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>
//       </aside>

//       {/* Mobile Top Header with Logo */}
//       <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-30 p-4 flex justify-between items-center">
//         <div className="flex items-center">
//           <img
//             src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png"
//             alt="Company Logo"
//             className="h-10 w-10"
//           />
//           <span className="text-2xl font-bold text-blue-500 ml-2">Cal.LIT</span>
//         </div>

//         {/* Account Indicator - Moved from absolute position */}
//         <div className="relative w-8 h-8">
//           <div
//             className={`absolute inset-0 rounded-full ring-2 ${
//               isOnline ? "ring-blue-400" : "ring-red-400"
//             }`}
//           ></div>
//           <div className="relative w-full h-full flex items-center justify-center">
//             {userData.profileImageUrl ? (
//               <img
//                 src={userData?.profileImageUrl}
//                 alt={`${userData?.firstName.charAt(0)}'s profile`}
//                 className="w-full h-full object-cover rounded-full"
//               />
//             ) : (
//               <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full">
//                 {userData.firstName?.charAt(0).toUpperCase()}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Bottom Navigation */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
//         <div className="flex justify-around items-center h-16">
//           {navItems.map((item, index) => (
//             <button
//               key={item.href}
//               className={`flex flex-col items-center justify-center w-full h-full ${
//                 activeNav === index ? "text-blue-500" : "text-gray-600"
//               }`}
//               onClick={() => handleSideBarNavigation(index)}
//             >
//               <item.icon className="w-5 h-5" />
//               <span className="text-xs mt-1">{item.label}</span>
//             </button>
//           ))}
//           <button
//             className={`flex flex-col items-center justify-center w-full h-full ${
//               activeNav === 3 ? "text-blue-500" : "text-gray-600"
//             }`}
//             onClick={() => handleSideBarNavigation(3)}
//           >
//             <Plus className="w-5 h-5" />
//             <span className="text-xs mt-1">Create</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <main className="flex-1 overflow-x-hidden mt-16 md:mt-0">
//         {" "}
//         {/* Added mt-16 for mobile header */}
//         {/* Page Content */}
//         <div className="p-6 pt-4 md:pt-6">
//           {" "}
//           {/* Adjusted pt-4 for mobile */}
//           {activeNav === 0 && <Events />}
//           {activeNav === 1 && <Meeting />}
//           {activeNav === 3 && <AppointmentTypesList />}
//         </div>
//       </main>

//       {/* Selected Events Bar */}
//       {selectedEvents?.length >= 1 && (
//         <div className="fixed bottom-16 md:bottom-0 z-20 left-0 md:left-64 right-0 bg-white shadow-md py-4 flex p-4 gap-4 transition-transform duration-300">
//           <p className="text-lg mt-1 flex gap-1">
//             <XIcon className="mt-1.5" size={20} />
//             {selectedEvents.length} Selected
//           </p>
//           <button
//             className="px-6 py-2 bg-white border text-white rounded-md hover:bg-blue-50"
//             onClick={() => setModalOpen(true)}
//           >
//             <Trash2 color="black" />
//           </button>
//         </div>
//       )}

//       <DeleteModal
//         isOpen={modalOpen}
//         onClose={OnClose}
//         deleteFn={handleDelete}
//       />
//     </div>
//   );
// };
// export default SideBar;

import {
  Calendar,
  Folder,
  Plus,
  Trash2,
  XIcon,
  LogOut,
  User,
} from "lucide-react";
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
  { href: "/events", label: "My Events", icon: Folder },
  { href: "/meeting", label: "Meetings", icon: Calendar },
];

const SideBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const selectedEvents = useSelector(
    (state: any) => state.event.deleteEventIds
  );
  const activeNav = useSelector((state: any) => state.global.activeNav);

  const handleSideBarNavigation = (index: any) => {
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

  //const eventData = useSelector((state: any) => state.event.eventData);
  const userData = useSelector((state: any) => state.registration.userData);
  const navigate = useNavigate();

  const handleLogOut = () => {
    Cookies.remove("authToken");
    dispatch(clearUserData({} as any));
    dispatch(clearEventData([] as any));
    dispatch(addMeetingData([] as any));
    dispatch(addActiveNavState(0 as any));
    Cookies.remove("authToken" + userData._id);
    navigate("/");
  };

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  const handleDelete = async () => {
    try {
      const deleteResponse = await axiosInstance.put(`/events/delete`, {
        selectedIds: selectedEvents,
      });

      if (deleteResponse.data.success) {
        setModalOpen(false);
        dispatch(removeDeleteEventIds(deleteResponse.data.data));
        window.location.reload();
      }
    } catch (error) {}
  };

  const OnClose = () => {
    setModalOpen(false);
    dispatch(removeDeleteEventIds(selectedEvents));
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 bg-white border-r border-blue-100 shadow-lg h-screen sticky top-0 overflow-y-auto flex-shrink-0">
        <div className="w-full flex flex-col h-full">
          {/* Logo and Company Name */}
          <div className="flex items-center justify-start ml-0 mt-12 px-4">
            <img
              src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png"
              alt="Company Logo"
              className="h-14 w-14"
            />
            <span className="text-4xl font-bold text-blue-500">Cal.LIT</span>
          </div>

          {/* Create Button */}
          <div
            className="hover:bg-blue-100 w-56 h-12 mt-6 flex justify-center items-center border border-blue-400 rounded-full mx-auto cursor-pointer"
            onClick={() => handleSideBarNavigation(3)}
          >
            <div className="flex items-center gap-1 text-blue-800 font-light">
              <Plus className="text-xl text-black" />
              <span className="text-md text-black">Create</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="mt-8 flex-grow">
            <ul>
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  className={`flex items-center px-4 font-extrabold m-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition transform rounded-md cursor-pointer ${
                    activeNav === index
                      ? "bg-blue-100 scale-105 rounded-lg m-4 text-blue-500"
                      : ""
                  }`}
                  onClick={() => handleSideBarNavigation(index)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span
                    className={`text-sm text-black font-opensauce font-extrabold ${
                      activeNav === index ? " text-blue-500 " : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Profile and Logout Section (Desktop) */}
          <div className="mt-auto mb-6 px-4 relative">
            <div
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 cursor-pointer"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            >
              <div className="relative w-10 h-10">
                <div
                  className={`absolute inset-0 rounded-full ring-2 ${
                    isOnline ? "ring-blue-400" : "ring-red-400"
                  }`}
                ></div>
                <div className="relative w-full h-full flex items-center justify-center">
                  {userData.profileImageUrl ? (
                    <img
                      src={userData?.profileImageUrl}
                      alt={`${userData?.firstName.charAt(0)}'s profile`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full">
                      {userData.firstName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-800">
                  {userData.firstName} {userData.lastName}
                </p>
                <p className="text-xs text-gray-500">{userData.email}</p>
              </div>
            </div>

            {/* Profile Dropdown (Desktop) */}
            {profileDropdownOpen && (
              <div className="absolute bottom-16 left-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  className="flex items-center gap-2 w-full p-3 hover:bg-gray-100 rounded-t-lg"
                  onClick={() => {
                    // Navigate to profile page or show profile modal
                    setProfileDropdownOpen(false);
                  }}
                >
                  <User size={16} />
                  <span>Profile</span>
                </button>
                <button
                  className="flex items-center gap-2 w-full p-3 hover:bg-gray-100 rounded-b-lg text-red-500"
                  onClick={() => {
                    handleLogOut();
                    setProfileDropdownOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Top Header with Logo */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-30 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png"
            alt="Company Logo"
            className="h-10 w-10"
          />
          <span className="text-2xl font-bold text-blue-500 ml-2">Cal.LIT</span>
        </div>

        {/* Account Indicator and Logout (Mobile) */}
        <div className="flex items-center gap-4">
          <div className="relative w-8 h-8">
            <div
              className={`absolute inset-0 rounded-full ring-2 ${
                isOnline ? "ring-blue-400" : "ring-red-400"
              }`}
            ></div>
            <div className="relative w-full h-full flex items-center justify-center">
              {userData.profileImageUrl ? (
                <img
                  src={userData?.profileImageUrl}
                  alt={`${userData?.firstName.charAt(0)}'s profile`}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-lg font-bold rounded-full">
                  {userData.firstName?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={handleLogOut}
            className="text-gray-600 hover:text-red-500"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {/* <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item, index) => (
            <button
              key={item.href}
              className={`flex flex-col items-center justify-center w-full h-full ${
                activeNav === index ? "text-blue-500" : "text-gray-600"
              }`}
              onClick={() => handleSideBarNavigation(index)}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
          <button
            className={`flex flex-col items-center justify-center w-full h-full ${
              activeNav === 3 ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => handleSideBarNavigation(3)}
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs mt-1">Create</span>
          </button>
        </div>
      </div> */}

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30">
        {/* Navigation bar with bottom notch */}
        <div className="relative h-16 bg-white border-t border-gray-200 shadow-lg">
          {/* Bottom half-circle notch */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-8 overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-white border-b border-l border-r border-gray-200 rotate-180"></div>
          </div>

          {/* Navigation items */}
          <div className="flex justify-between items-center h-full px-8">
            {/* Events Tab */}
            <button
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                activeNav === 0 ? "text-blue-500" : "text-gray-600"
              }`}
              onClick={() => handleSideBarNavigation(0)}
            >
              <Folder className="w-5 h-5" />
              <span className="text-xs mt-1">Events</span>
            </button>

            {/* Meetings Tab */}
            <button
              className={`flex flex-col items-center justify-center flex-1 h-full ${
                activeNav === 1 ? "text-blue-500" : "text-gray-600"
              }`}
              onClick={() => handleSideBarNavigation(1)}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs mt-1">Meetings</span>
            </button>
          </div>
        </div>

        {/* Floating Create Button */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            className={`flex items-center justify-center w-14 h-14 rounded-full ${
              activeNav === 3 ? "bg-blue-400" : "bg-blue-500"
            } text-white shadow-lg transform hover:scale-105 transition-transform`}
            onClick={() => handleSideBarNavigation(3)}
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden mt-16 md:mt-0">
        <div className="p-6 pt-4 md:pt-6">
          {activeNav === 0 && <Events />}
          {activeNav === 1 && <Meeting />}
          {activeNav === 3 && <AppointmentTypesList />}
        </div>
      </main>

      {/* Selected Events Bar */}
      {selectedEvents?.length >= 1 && (
        <div className="fixed bottom-16 md:bottom-0 z-20 left-0 md:left-64 right-0 bg-white shadow-md py-4 flex p-4 gap-4 transition-transform duration-300">
          <p className="text-lg mt-1 flex gap-1">
            <XIcon className="mt-1.5" size={20} />
            {selectedEvents.length} Selected
          </p>
          <button
            className="px-6 py-2 bg-white border text-white rounded-md hover:bg-blue-50"
            onClick={() => setModalOpen(true)}
          >
            <Trash2 color="black" />
          </button>
        </div>
      )}

      <DeleteModal
        isOpen={modalOpen}
        onClose={OnClose}
        deleteFn={handleDelete}
      />
    </div>
  );
};
export default SideBar;
