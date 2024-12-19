import { Calendar, Clock, Link } from "lucide-react";
import { Plus } from "lucide-react";
import EventCard from "./EventCard";
import LinkPart from "./LinkPart";
import SubNav from "./SubNav";
import { DropDown } from "./DropDown";
import CreateEvent from "./CreateEvent";
import { Button } from "./components/ui/button";
import axios from "axios";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Yup Validation Schema
const validationSchema = Yup.object({
  eventTitle: Yup.string().required("Event Title is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.number()
    .required("Duration is required")
    .positive("Duration must be a positive number")
    .integer("Duration must be an integer"),
  eventPrivacy: Yup.string()
    .oneOf(
      ["public", "private"],
      "Event Privacy must be either 'public' or 'private'"
    )
    .required("Event Privacy is required"),
});

import { Label } from "./components/ui/label";
import Events from "./Events";
import Availabilty from "./Availabilty";
import Test from "./Test";
import Testing from "./Testing";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Check } from "./check";
import { axiosInstance } from "./config/http";
import { useDispatch } from "react-redux";
import { addEventData, effectAdd } from "./app-store/eventSlice";

// Navigation items for sidebar
const navItems = [
  { href: "/events", label: "Event Types", icon: Link },
  { href: "/meeting", label: "Meeting", icon: Calendar },
  { href: "/availability", label: "Availability", icon: Clock },
];

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabItem, setTabItem] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state
  const [isSubmittings, setIsSubmitting] = useState(false);
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
    }
  };
  const [effect, setEffect] = useState(false);
  useEffect(() => {
    console.log("set effectttt");
  }, [effect]);

  const handleSubmit = async (values: any) => {
    dispatch(effectAdd(false));
    setIsSubmitting(true);
    try {
      // Send data to backend using Axios
      const response = await axiosInstance.post("/events", values);
      console.log("Event created successfully:", response.data.data);
      //dispatch(addEventData(response.data.data));
      // Close the modal after successful creation
      setIsModalOpen(false);
      setErrorMessage(null);
      setIsSubmitting(false);
      dispatch(effectAdd(true));

      // Clear error message if event creation was successful
    } catch (error) {
      console.error("Error creating event:", error);
      setIsSubmitting(false);
      // Set the error message to be displayed in the modal
      setErrorMessage(
        "An error occurred while creating the event. Please try again."
      );
    }
  };

  return (
    <div className=" bg-gray-50 ">
      {/* Sidebar for medium screens and up */}
      <div className="flex justify-between">
        <div className="flex justify-between">
          <div className="flex">
            <aside className="hidden md:block w-64 bg-white border-r border-blue-200 pt-6 shadow-lg h-screen">
              {/* <div className="m-4 mt-0">
                <img
                  src="https://assets.calendly.com/assets/frontend/media/calendly-wordmark-0da6c58d9a06b08c975f.svg"
                  alt="Logo"
                />
              </div> */}
              <nav className="mt-8">
                {/* Create Button */}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                  <DialogTrigger asChild>
                    <div className="hover:bg-blue-100 w-56 h-11 flex justify-center items-center border border-blue-800 rounded-full mx-auto cursor-pointer">
                      <div className="flex items-center gap-1 text-blue-800 font-light">
                        <span className="text-xl">+</span>
                        <span className="text-md">Create</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] lg:w-3/4">
                    <DialogHeader>
                      <h2 className="text-center">Create Event</h2>
                    </DialogHeader>
                    <Formik
                      initialValues={{
                        eventTitle: "",
                        description: "",
                        duration: "",
                        eventPrivacy: "public",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(values) => {
                        console.log(values);
                        handleSubmit(values);
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div className="grid gap-4 py-4">
                            {/* Event Title */}
                            <div>
                              <Label
                                htmlFor="eventTitle"
                                className="text-right"
                              >
                                Event Title
                              </Label>
                              <Field
                                id="eventTitle"
                                name="eventTitle"
                                type="text"
                                className="col-span-4 p-2 border rounded-md w-full"
                              />
                              <ErrorMessage
                                name="eventTitle"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>

                            {/* Duration */}
                            <div>
                              <Label htmlFor="duration" className="text-right">
                                Duration (minutes)
                              </Label>
                              <Field
                                id="duration"
                                name="duration"
                                type="number"
                                className="w-full p-2 border rounded-md"
                              />
                              <ErrorMessage
                                name="duration"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>

                            {/* Event Privacy */}
                            <div>
                              <Label
                                htmlFor="eventPrivacy"
                                className="text-right"
                              >
                                Event Privacy
                              </Label>
                              <Field
                                as="select"
                                id="eventPrivacy"
                                name="eventPrivacy"
                                className="w-full p-2 border rounded-md"
                              >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                              </Field>
                              <ErrorMessage
                                name="eventPrivacy"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            {/* Description */}
                            <div>
                              <Label
                                htmlFor="description"
                                className="text-right"
                              >
                                Description
                              </Label>
                              <Field
                                id="description"
                                name="description"
                                as="textarea"
                                className="w-full p-2 h-24 border rounded-md"
                              />
                              <ErrorMessage
                                name="description"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>

                          {/* Display error message */}
                          {errorMessage && (
                            <div className="text-red-500 text-sm text-center mt-4">
                              {errorMessage}
                            </div>
                          )}

                          {/* Submit Button */}
                          <DialogFooter className="flex items-center">
                            <Button
                              type="submit"
                              className="bg-blue-600 hover:bg-blue-500"
                              disabled={isSubmitting}
                            >
                              {isSubmittings ? "Submitting..." : "Create Event"}
                            </Button>
                          </DialogFooter>
                        </Form>
                      )}
                    </Formik>
                  </DialogContent>
                </Dialog>

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
          </div>
        </div>

        {/* Main content */}
        <div className="w-full ml-11">
          {tabItem === 0 && <Events />}
          {tabItem === 1 && <div>Event</div>}
          {tabItem === 2 && <Testing />}
        </div>

        <div className="m-4">
          <SubNav />
        </div>
      </div>

      {/* Bottom tabs for small screens */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 ">
        <ul className="flex justify-around py-3">
          {navItems.map((item) => (
            <li
              key={item.href}
              className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1 font-bold">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
// import { Calendar, Clock, Link, User, LogOut, Settings } from "lucide-react";
// import { Plus } from "lucide-react";
// import EventCard from "./EventCard";
// import LinkPart from "./LinkPart";
// import SubNav from "./SubNav";
// import { DropDown } from "./DropDown";
// import CreateEvent from "./CreateEvent";
// import { Button } from "./components/ui/button";
// import axios from "axios";

// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// import { Label } from "./components/ui/label";
// import Events from "./Events";
// import Availabilty from "./Availabilty";
// import Test from "./Test";
// import Testing from "./Testing";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Check } from "./check";
// import { axiosInstance } from "./config/http";
// import { useDispatch } from "react-redux";
// import { addEventData, effectAdd } from "./app-store/eventSlice";

// // Yup Validation Schema
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

// // Navigation items for sidebar
// const navItems = [
//   { href: "/events", label: "Event Types", icon: Link },
//   { href: "/meeting", label: "Meeting", icon: Calendar },
//   { href: "/availability", label: "Availability", icon: Clock },
// ];

// // Bottom navigation items
// const bottomNavItems = [
//   {
//     label: "Profile",
//     icon: User,
//     onClick: () => console.log("Profile clicked"),
//   },
//   {
//     label: "Settings",
//     icon: Settings,
//     onClick: () => console.log("Settings clicked"),
//   },
//   {
//     label: "Logout",
//     icon: LogOut,
//     onClick: () => console.log("Logout clicked"),
//   },
// ];

// const SideBar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [tabItem, setTabItem] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
//   const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state
//   const [isSubmittings, setIsSubmitting] = useState(false);

//   const handleNavigation = (tab: number) => {
//     if (tab === 0) {
//       navigate("/events/user");
//       setTabItem(tab);
//     } else if (tab === 1) {
//       navigate("/meetings/user");
//       setTabItem(tab);
//     } else if (tab === 2) {
//       navigate("/availability/user");
//       setTabItem(tab);
//     }
//   };

//   const handleSubmit = async (values: any) => {
//     dispatch(effectAdd(false));
//     setIsSubmitting(true);
//     try {
//       const response = await axiosInstance.post("/events", values);
//       setIsModalOpen(false);
//       setErrorMessage(null);
//       setIsSubmitting(false);
//       dispatch(effectAdd(true));
//     } catch (error) {
//       setIsSubmitting(false);
//       setErrorMessage(
//         "An error occurred while creating the event. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="bg-gray-50">
//       {/* Topline header */}
//       {/* <div className="bg-blue-600 text-white py-3 px-6 shadow-md flex justify-between items-center">
//         <h1 className="text-lg font-bold">Dashboard</h1>
//         <Button
//           variant="ghost"
//           className="text-white"
//           onClick={() => console.log("Header Action")}
//         >
//           Action
//         </Button>
//       </div> */}

//       {/* Sidebar and Main Content */}
//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="hidden md:flex flex-col justify-between w-56 bg-white border-r border-blue-200 shadow-lg h-screen">
//           {/* Navigation */}
//           <nav className="mt-8">
//             <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//               <DialogTrigger asChild>
//                 <div className="hover:bg-blue-100 w-56 h-11 flex justify-center items-center border border-blue-800 rounded-full mx-auto cursor-pointer">
//                   <div className="flex items-center gap-1 text-blue-800 font-light">
//                     <span className="text-xl">+</span>
//                     <span className="text-md">Create</span>
//                   </div>
//                 </div>
//               </DialogTrigger>
//               <DialogContent className="sm:max-w-[600px] lg:w-3/4">
//                 <DialogHeader>
//                   <h2 className="text-center">Create Event</h2>
//                 </DialogHeader>
//                 <Formik
//                   initialValues={{
//                     eventTitle: "",
//                     description: "",
//                     duration: "",
//                     eventPrivacy: "public",
//                   }}
//                   validationSchema={validationSchema}
//                   onSubmit={handleSubmit}
//                 >
//                   {({ isSubmitting }) => (
//                     <Form>
//                       <div className="grid gap-4 py-4">
//                         {/* Form fields */}
//                         {/* ... */}
//                       </div>
//                       {errorMessage && (
//                         <div className="text-red-500 text-sm text-center mt-4">
//                           {errorMessage}
//                         </div>
//                       )}
//                       <DialogFooter className="flex items-center">
//                         <Button type="submit" disabled={isSubmitting}>
//                           {isSubmittings ? "Submitting..." : "Create Event"}
//                         </Button>
//                       </DialogFooter>
//                     </Form>
//                   )}
//                 </Formik>
//               </DialogContent>
//             </Dialog>

//             <ul className="mt-8">
//               {navItems.map((item, index) => (
//                 <li
//                   key={item.href}
//                   className="flex items-center px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition rounded-md cursor-pointer"
//                   onClick={() => handleNavigation(index)}
//                 >
//                   <item.icon className="w-5 h-5 mr-3" />
//                   <span className="text-sm text-black font-bold">
//                     {item.label}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Bottom navigation items */}
//           <div className="mt-auto mb-8 px-6">
//             <ul className="space-y-4">
//               {bottomNavItems.map((item) => (
//                 <li
//                   key={item.label}
//                   className="flex items-center text-gray-600 hover:text-blue-600 transition cursor-pointer"
//                   onClick={item.onClick}
//                 >
//                   <item.icon className="w-5 h-5 mr-3" />
//                   <span className="text-sm">{item.label}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main className="w-full ml-11">
//           {tabItem === 0 && <Events />}
//           {tabItem === 1 && <div>Event</div>}
//           {tabItem === 2 && <Testing />}
//         </main>

//         <div className="m-4">
//           <SubNav />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SideBar;
