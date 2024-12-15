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
import { useState } from "react";
import { Check } from "./check";
import { axiosInstance } from "./config/http";
const navItems = [
  { href: "/events", label: "Event Types", icon: Link },
  { href: "/meeting", label: "Meeting", icon: Calendar },
  { href: "/availability", label: "Availability", icon: Clock },
];

const SideBar = () => {
  const navigate = useNavigate();
  const [tabItem, setTabItem] = useState(0);
  const handleNavigation = (tab: number) => {
    console.log(tab, "tabbbbbbb");

    if (tab == 0) {
      navigate("/events/user");
      setTabItem(tab);
    } else if (tab == 1) {
      navigate("/meetings/user");
      setTabItem(tab);
    } else if (tab == 2) {
      navigate("/availability/user");
      setTabItem(tab);
    }
  };

  const handleSubmit = async (values: any) => {
    console.log(values, "valuessss");

    try {
      // Send data to backend using Axios
      const response = await axiosInstance.post("/events", values);
      console.log("Event created successfully:", response.data);
      // Optionally, you can handle success (clear form, close modal, show success message, etc.)
    } catch (error) {
      console.error("Error creating event:", error);
      // Optionally, handle error (show error message to the user)
    }
  };
  return (
    <>
      <div className=" bg-gray-50  ">
        {/* Sidebar for medium screens and up */}
        <div className="flex justify-between  ">
          <div className="flex  justify-between ">
            <div className=" flex ">
              <aside className="hidden md:block w-64 bg-white border-r border-blue-200 pt-6 shadow-lg h-screen">
                <div>
                  <img
                    src="https://assets.calendly.com/assets/frontend/media/calendly-wordmark-0da6c58d9a06b08c975f.svg"
                    alt=""
                  />
                </div>
                <nav className="mt-8">
                  {/* Create Button */}

                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="  hover:bg-blue-100 w-56 h-11 flex justify-center items-center border border-blue-800 rounded-full mx-auto cursor-pointer">
                        <div className="flex items-center gap-1 text-blue-800 font-light">
                          <span className=" text-xl">+</span>
                          <span className="text-md ">Create</span>
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
                        {({ setFieldValue, errors, touched, isSubmitting }) => (
                          <Form>
                            <div className="grid gap-4 py-4">
                              {/* Event Title */}
                              <div>
                                <div>
                                  <Label
                                    htmlFor="eventTitle"
                                    className="text-right"
                                  >
                                    Event Title
                                  </Label>
                                </div>
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

                              {/* Description */}

                              {/* Duration */}
                              <div>
                                <div>
                                  <Label
                                    htmlFor="duration"
                                    className="text-right"
                                  >
                                    Duration (minutes)
                                  </Label>
                                </div>
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
                            </div>

                            <div>
                              <div>
                                <Label
                                  htmlFor="description"
                                  className="text-right"
                                >
                                  Description
                                </Label>
                              </div>
                              <Field
                                id="description"
                                name="description"
                                as="textarea" // Use "textarea" to render a proper text area
                                className="w-full p-2 h-24 border rounded-md"
                              />
                              <ErrorMessage
                                name="description"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>

                            {/* Submit Button */}
                            <DialogFooter className="flex items-center">
                              <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-500"
                                disabled={isSubmitting}
                              >
                                {isSubmitting
                                  ? "Submitting..."
                                  : "Create Event"}
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
          <div className="w-full   ml-11 ">
            {tabItem == 0 ? <Events /> : ""}
            {tabItem == 1 ? <div>eveent</div> : ""}
            {tabItem == 2 ? <Testing /> : ""}
          </div>

          <div className="m-4">
            <div>
              <SubNav />
            </div>
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
      {/* <Check /> */}
    </>
  );
};

export default SideBar;
