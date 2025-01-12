import React from "react";
import AppointmentTypeCard from "./AppoinmentTypeCard";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addActiveNavState } from "./app-store/gloabalSlice";
const appointmentTypes = [
  {
    title: "One-on-One",
    subtitle: "One host with one invitee",
    description: "Good for: coffee chats, 1:1 interviews, etc.",
    icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/one_on_one-c0ed81ea039b15906953.svg",
    link: "/create/new-events",
  },
  // {
  //   title: "Group",
  //   subtitle: "One host with a group of invitees",
  //   description: "Good for: webinars, online classes, etc.",
  //   icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/group-eaa808c3bb66b614c714.svg",
  // },
  // {
  //   title: "Collective",
  //   subtitle: "More than one host with one invitee",
  //   description: "Good for: panel interviews, group sales calls, etc.",
  //   icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/collective-dff7740f53ebd8dd98cc.svg",
  // },
  // {
  //   title: "Round Robin",
  //   subtitle: "One rotating host with one invitee",
  //   description: "Good for: distributing incoming sales leads.",
  //   icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/round_robin-02aa170a63b896ec56e3.svg",
  // },
];

const AppointmentTypesList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigation = (index: any) => {
    navigate("/events/user/");
    dispatch(addActiveNavState(index));
  };
  return (
    <>
      <div className="m-8 mt-8 mb-1 flex cursor-pointer">
        <ChevronLeft color="#3b82f6" size={17} className="mt-1" />
        <span
          className="font-semibold text-blue-500"
          onClick={() => {
            handleNavigation(0);
          }}
        >
          {" "}
          Back
        </span>
      </div>
      <div className="m-8  mb-5   mt-0">
        <span className="font-semibold text-3xl">Create New Event Type</span>
      </div>
      <div className="w-2/4  border rounded-md p-4 ml-8 ">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {appointmentTypes.map((type, index) => (
            <AppointmentTypeCard
              key={index}
              title={type.title}
              subtitle={type.subtitle}
              description={type.description}
              icon={type.icon}
              link={type.link}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AppointmentTypesList;
