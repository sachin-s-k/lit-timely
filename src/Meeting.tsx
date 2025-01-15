// import { useEffect, useState } from "react";
// import BabelRow from "./BabelRow";
// import { axiosInstance } from "./config/http";
// import zerocalendar from "../src/assets/images/no-events-2ed89b6c6379caebda4e.svg";
// import { ThreeDots } from "react-loader-spinner";
// import { useDispatch, useSelector } from "react-redux";
// import { addMeetingData } from "./app-store/meetingSlice";

// const Meeting = () => {
//   const dispatch = useDispatch();
//   // const formatDateWithYear = (dateString: any) => {
//   //   const date = new Date(dateString);

//   //   return new Intl.DateTimeFormat("en-US", {
//   //     weekday: "long",
//   //     month: "short",
//   //     day: "numeric",
//   //     year: "numeric", // Include the year in the format
//   //   }).format(date);
//   // };
//   const [activeTab, setActiveTab] = useState("Upcoming");
//   const [allMeetings, setAllMeetings] = useState([]); // Store all meetings
//   const [filteredMeetings, setFilteredMeetings] = useState([]); // Store filtered meetings
//   const [loading, setLoading] = useState(false);
//   const [effect, setEffect] = useState(false);

//   // Fetch meeting data
//   const fetchBookingData = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get(`/events/meetings/data`);
//       dispatch(addMeetingData(response.data.data));
//       setAllMeetings(response.data.data);
//       // Assuming response.data.data contains the meetings array
//     } catch (error) {
//       console.error("Error fetching meeting data", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const meetingData = useSelector((state: any) => state.meeting.meetingData);
//   // Categorize meetings based on the active tab
//   const categorizeMeetings = () => {
//     const now = new Date(); // Current date and time

//     const categorizedMeetings = meetingData.filter((meeting: any) => {
//       const eventDate = new Date(meeting.eventDate); // Event date
//       const [hours, minutes] = meeting.eventStartTime
//         .split(":")
//         .map((val: any) => parseInt(val, 10));
//       const isPM = meeting.eventStartTime.includes("PM");
//       const eventStartTime = new Date(eventDate); // Start time with the date
//       eventStartTime.setHours(isPM ? hours + 12 : hours, minutes);

//       if (activeTab === "Upcoming") {
//         return (
//           meeting.meetingStatus === "confirmed" &&
//           new Date(meeting.eventDate) > new Date()
//         );
//       } else if (activeTab === "Past") {
//         return eventStartTime < now && meeting.meetingStatus !== "Cancelled"; // Past events, not cancelled
//       } else if (activeTab === "Cancelled") {
//         return meeting.meetingStatus === "cancelled"; // Only cancelled events
//       }
//       return false;
//     });

//     setFilteredMeetings(categorizedMeetings);
//   };

//   useEffect(() => {
//     fetchBookingData();
//   }, []);

//   useEffect(() => {
//     categorizeMeetings();
//   }, [effect, activeTab, allMeetings]);

//   // Handle tab change
//   const handleTabChange = (tab: any) => {
//     setActiveTab(tab);
//   };

//   // Get the appropriate message for each tab
//   const getNoEventsMessage = () => {
//     switch (activeTab) {
//       case "Upcoming":
//         return "No upcoming events";
//       case "Past":
//         return "No past events";
//       case "Cancelled":
//         return "No cancelled events";
//       default:
//         return "No events";
//     }
//   };

//   return (
//     <>
//       <div className="mt-12">
//         <span className="text-3xl font-bold">Meetings</span>
//       </div>

//       <div className="border mt-8 rounded-lg ">
//         <div className="border-b p-2 mb-3">
//           <ul className="flex m-3  mb-0 gap-4 rounded-lg cursor-pointer">
//             {["Upcoming", "Past", "Cancelled"].map((tab) => (
//               <li
//                 key={tab}
//                 onClick={() => handleTabChange(tab)}
//                 className={`${
//                   activeTab === tab
//                     ? "text-blue-500 border-b-2 border-blue-500"
//                     : "text-gray-600"
//                 } hover:border-b-2 hover:border-blue-500 transition duration-300 cursor-pointer`}
//               >
//                 {tab}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div
//           className={`m-2 ${
//             filteredMeetings.length > 0 ? "h-fit" : "min-h-[250px]"
//           }`}
//         >
//           {loading ? (
//             <div className="flex justify-center items-center h-full flex-col">
//               <div className="loader mt-6">
//                 <ThreeDots color="#3b82f6" />
//               </div>
//             </div>
//           ) : filteredMeetings.length === 0 ? (
//             <div className="flex justify-center items-center h-full flex-col">
//               <img src={zerocalendar} alt="No meetings" className="mt-8" />
//               <h1 className="ml-4 text-gray-600 font-bold text-xl">
//                 {getNoEventsMessage()}
//               </h1>
//             </div>
//           ) : (
//             filteredMeetings.map((meeting, index) => (
//               <BabelRow
//                 key={index}
//                 event={meeting}
//                 isPast={activeTab === "Past"}
//                 isCancelled={activeTab === "Cancelled"}
//                 activeTab={activeTab}
//                 setEffect={setEffect} // Pass down setEffect
//                 categorizeMeetings={categorizeMeetings} // Reorganize meetings
//                 handleTabChange={handleTabChange} // Update activeTab
//               />
//             ))
//           )}
//         </div>

//         <div className="border-t mb-12"></div>
//       </div>
//     </>
//   );
// };

// export default Meeting;

import { useEffect, useState } from "react";
import BabelRow from "./BabelRow";
import { axiosInstance } from "./config/http";
import zerocalendar from "../src/assets/images/no-events-2ed89b6c6379caebda4e.svg";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { addMeetingData } from "./app-store/meetingSlice";

const Meeting = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [filteredMeetings, setFilteredMeetings] = useState([]); // Filtered meetings
  const [loading, setLoading] = useState(false);

  const meetingData = useSelector((state: any) => state.meeting.meetingData);

  // Fetch meeting data
  const fetchBookingData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/events/meetings/data`);
      dispatch(addMeetingData(response.data.data)); // Update Redux state
    } catch (error) {
      console.error("Error fetching meeting data", error);
    } finally {
      setLoading(false);
    }
  };

  // Categorize meetings based on the active tab
  const categorizeMeetings = () => {
    const now = new Date();

    const categorizedMeetings = meetingData.filter((meeting: any) => {
      const eventDate = new Date(meeting.eventDate);
      const [hours, minutes] = meeting.eventStartTime
        .split(":")
        .map((val: any) => parseInt(val, 10));
      const isPM = meeting.eventStartTime.includes("PM");
      const eventStartTime = new Date(eventDate);
      eventStartTime.setHours(isPM ? hours + 12 : hours, minutes);

      if (activeTab === "Upcoming") {
        return (
          meeting.meetingStatus === "confirmed" &&
          new Date(meeting.eventDate) > now
        );
      } else if (activeTab === "Past") {
        return eventStartTime < now && meeting.meetingStatus !== "Cancelled";
      } else if (activeTab === "Cancelled") {
        return meeting.meetingStatus === "cancelled";
      }
      return false;
    });

    setFilteredMeetings(categorizedMeetings);
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchBookingData();
  }, []);

  // Re-categorize meetings on relevant state changes
  useEffect(() => {
    categorizeMeetings();
  }, [activeTab, meetingData]);

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Get the appropriate message for each tab
  const getNoEventsMessage = () => {
    switch (activeTab) {
      case "Upcoming":
        return "No upcoming events";
      case "Past":
        return "No past events";
      case "Cancelled":
        return "No cancelled events";
      default:
        return "No events";
    }
  };

  return (
    <>
      <div className="mt-12">
        <span className="text-3xl font-bold">Meetings</span>
      </div>

      <div className="border mt-8 rounded-lg">
        <div className="border-b p-2 mb-3">
          <ul className="flex m-3 gap-4 rounded-lg cursor-pointer">
            {["Upcoming", "Past", "Cancelled"].map((tab) => (
              <li
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`${
                  activeTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-600"
                } hover:border-b-2 hover:border-blue-500 transition duration-300 cursor-pointer`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`m-2 ${
            filteredMeetings.length > 0 ? "h-fit" : "min-h-[250px]"
          }`}
        >
          {loading ? (
            <div className="flex justify-center items-center h-full flex-col">
              <ThreeDots color="#3b82f6" />
            </div>
          ) : filteredMeetings.length === 0 ? (
            <div className="flex justify-center items-center h-full flex-col">
              <img src={zerocalendar} alt="No meetings" className="mt-8" />
              <h1 className="ml-4 text-gray-600 font-bold text-xl">
                {getNoEventsMessage()}
              </h1>
            </div>
          ) : (
            filteredMeetings.map((meeting, _index) => (
              <BabelRow
                event={meeting}
                activeTab={activeTab}
                categorizeMeetings={categorizeMeetings}
                handleTabChange={handleTabChange}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Meeting;
