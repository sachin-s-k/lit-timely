// import React from "react";
// import AppointmentTypeCard from "./AppoinmentTypeCard";
// import { ChevronLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addActiveNavState } from "./app-store/gloabalSlice";
// const appointmentTypes = [
//   {
//     title: "One-on-One",
//     subtitle: "One host with one invitee",
//     description: "Good for: coffee chats, 1:1 interviews, etc.",
//     icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/one_on_one-c0ed81ea039b15906953.svg",
//     link: "/create/new-events",
//   },
//   // {
//   //   title: "Group",
//   //   subtitle: "One host with a group of invitees",
//   //   description: "Good for: webinars, online classes, etc.",
//   //   icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/group-eaa808c3bb66b614c714.svg",
//   // },
//   // {
//   //   title: "Collective",
//   //   subtitle: "More than one host with one invitee",
//   //   description: "Good for: panel interviews, group sales calls, etc.",
//   //   icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/collective-dff7740f53ebd8dd98cc.svg",
//   // },
//   // {
//   //   title: "Round Robin",
//   //   subtitle: "One rotating host with one invitee",
//   //   description: "Good for: distributing incoming sales leads.",
//   //   icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/round_robin-02aa170a63b896ec56e3.svg",
//   // },
// ];

// const AppointmentTypesList: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleNavigation = (index: any) => {
//     navigate("/events/user/me");
//     dispatch(addActiveNavState(index));
//   };
//   return (
//     <>
//       <div className="m-8 mt-32 mb-1 flex cursor-pointer">
//         <ChevronLeft color="#3b82f6" size={17} className="mt-1" />
//         <span
//           className="font-semibold text-blue-500"
//           onClick={() => {
//             handleNavigation(0);
//           }}
//         >
//           {" "}
//           Back
//         </span>
//       </div>
//       <div className="m-8  mb-5   mt-0">
//         <span className="font-semibold text-3xl">Create New Event Type</span>
//       </div>
//       <div className="w-2/4  border rounded-md p-4 ml-8 ">
//         <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
//           {appointmentTypes.map((type, index) => (
//             <AppointmentTypeCard
//               key={index}
//               title={type.title}
//               subtitle={type.subtitle}
//               description={type.description}
//               icon={type.icon}
//               link={type.link}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AppointmentTypesList;

// import React from "react";
// import AppointmentTypeCard from "./AppoinmentTypeCard";
// import { ChevronLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addActiveNavState } from "./app-store/gloabalSlice";

// const appointmentTypes = [
//   {
//     title: "One-on-One",
//     subtitle: "One host with one invitee",
//     description: "Good for: coffee chats, 1:1 interviews, etc.",
//     icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/one_on_one-c0ed81ea039b15906953.svg",
//     link: "/create/new-events",
//   },
//   //Uncomment other types as needed
//   {
//     title: "Group",
//     subtitle: "One host with a group of invitees",
//     description: "Good for: webinars, online classes, etc.",
//     icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/group-eaa808c3bb66b614c714.svg",
//   },
//   {
//     title: "Group",
//     subtitle: "One host with a group of invitees",
//     description: "Good for: webinars, online classes, etc.",
//     icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/group-eaa808c3bb66b614c714.svg",
//   },
// ];

// const AppointmentTypesList: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleNavigation = (index: number) => {
//     navigate("/events/user/me");
//     dispatch(addActiveNavState(index));
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-6">
//       {/* Back Button - Mobile friendly */}
//       <div className="flex items-center mb-4 cursor-pointer">
//         <button
//           onClick={() => handleNavigation(0)}
//           className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
//         >
//           <ChevronLeft size={20} className="mr-1" />
//           <span className="font-semibold">Back</span>
//         </button>
//       </div>

//       {/* Page Title */}
//       <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
//         Create New Event Type
//       </h1>

//       {/* Appointment Types Grid - Responsive layout */}
//       <div className="w-full max-w-4xl mx-auto">
//         <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
//             {appointmentTypes.map((type, index) => (
//               <AppointmentTypeCard
//                 key={index}
//                 title={type.title}
//                 subtitle={type.subtitle}
//                 description={type.description}
//                 icon={type.icon}
//                 link={type.link}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Empty State - If no appointment types */}
//       {appointmentTypes.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No appointment types available</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentTypesList;
// import React from "react";
// import AppointmentTypeCard from "./AppoinmentTypeCard";
// import { ChevronLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { addActiveNavState } from "./app-store/gloabalSlice";

// const appointmentTypes = [
//   {
//     title: "One-on-One",
//     subtitle: "One host with one invitee",
//     description: "Good for: coffee chats, 1:1 interviews, etc.",
//     icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/one_on_one-c0ed81ea039b15906953.svg",
//     link: "/create/new-events",
//   },
//   {
//     title: "Group",
//     subtitle: "One host with a group of invitees",
//     description: "Good for: webinars, online classes, etc.",
//     icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/group-eaa808c3bb66b614c714.svg",
//   },
//   {
//     title: "Collective",
//     subtitle: "Multiple hosts with one invitee",
//     description: "Good for: panel interviews, group calls, etc.",
//     icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/collective-dff7740f53ebd8dd98cc.svg",
//   },
//   {
//     title: "Round-Robin",
//     subtitle: "One host assigned per invitee",
//     description:
//       "Good for: sales teams — evenly distributes bookings across hosts.",
//     icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/round_robin-02aa170a63b896ec56e3.svg",
//   },
// ];

// const AppointmentTypesList: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleNavigation = (index: number) => {
//     navigate("/events/user/me");
//     dispatch(addActiveNavState(index));
//   };

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-6">
//       {/* Back Button */}
//       <div className="flex items-center mb-4 cursor-pointer">
//         <button
//           onClick={() => handleNavigation(0)}
//           className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
//         >
//           <ChevronLeft size={20} className="mr-1" />
//           <span className="font-semibold">Back</span>
//         </button>
//       </div>

//       {/* Page Title */}
//       <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
//         Create New Event Type
//       </h1>

//       {/* Stacked Layout for All Screens */}
//       <div className="w-full max-w-2xl mx-auto space-y-6">
//         {appointmentTypes.map((type, index) => (
//           <AppointmentTypeCard
//             key={index}
//             title={type.title}
//             subtitle={type.subtitle}
//             description={type.description}
//             icon={type.icon}
//             link={type.link}
//           />
//         ))}
//       </div>

//       {/* Empty State */}
//       {appointmentTypes.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-500">No appointment types available</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AppointmentTypesList;

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
  {
    title: "Group",
    subtitle: "One host with a group of invitees",
    description: "Good for: webinars, online classes, etc.",
    icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/group-eaa808c3bb66b614c714.svg",
  },
  {
    title: "Collective",
    subtitle: "Multiple hosts with one invitee",
    description: "Good for: panel interviews, group calls, etc.",
    icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/application/collective-dff7740f53ebd8dd98cc.svg",
  },
  {
    title: "Round-Robin",
    subtitle: "One host assigned per invitee",
    description:
      "Good for: sales teams — evenly distributes bookings across hosts.",
    icon: "https://dev-application-portal.s3.eu-north-1.amazonaws.com/round_robin-02aa170a63b896ec56e3.svg",
  },
];

const AppointmentTypesList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigation = (index: any) => {
    navigate("/events/user/me");
    dispatch(addActiveNavState(index));
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 w-full">
      {/* Back Button */}
      <div className="flex items-center mb-4 max-w-6xl mx-auto">
        <button
          onClick={() => handleNavigation(0)}
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <ChevronLeft size={20} className="mr-1" />
          <span className="font-semibold">Back</span>
        </button>
      </div>

      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 max-w-6xl mx-auto">
        Create New Event Type
      </h1>

      {/* Full-width stacked layout for all screens */}
      {/* <div className="w-full max-w-6xl mx-auto space-y-6">
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
      </div> */}
      <div className="w-full max-w-6xl mx-auto flex flex-col space-y-6">
        {appointmentTypes.map((type, index) => (
          <div key={index} className="w-full md:w-1/2">
            <AppointmentTypeCard
              title={type.title}
              subtitle={type.subtitle}
              description={type.description}
              icon={type.icon}
              link={type.link}
            />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {appointmentTypes.length === 0 && (
        <div className="text-center py-12 max-w-6xl mx-auto">
          <p className="text-gray-500">No appointment types available</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentTypesList;
