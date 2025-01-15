// import { useState } from "react";
// import "./BabelRow.css"; // Optional: Import CSS for styling
// import CancelMeetingModal from "./Cancel";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { axiosInstance } from "./config/http";
// import { addCancelData } from "./app-store/meetingSlice";

// const BabelRow = ({
//   event,
//   isPast,
//   setEffect,
//   categorizeMeetings,
//   handleTabChange,
// }: any) => {
//   const userData = useSelector((state: any) => state.registration.userData);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const formatDateWithYear = (dateString: any) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-US", {
//       weekday: "long",
//       month: "short",
//       day: "numeric",
//       year: "numeric", // Include the year in the format
//     }).format(date);
//   };

//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleEventPage = (eventName: any, bookingId: any, eventId: any) => {
//     navigate(
//       `/${
//         userData.personalUrl
//       }/${eventName}?email=${"sachinksiby@gmail.com"}&bookingId=${bookingId}&name=${"sachin"}&eventId=${eventId}`
//     );
//   };
//   const [meetingId, setMeetingId] = useState("");
//   const toggleExpand = () => {
//     setIsExpanded((prev) => !prev);
//   };

//   // const handleCancel = async (data: any) => {
//   //   console.log("Meeting canceled with data:", data);

//   //   try {
//   //     const updatedMeetingData = await axiosInstance.post(
//   //       "/events/meetings/cancel",
//   //       {
//   //         notifyParticipants: data.notifyParticipants,
//   //         cancelReason: data.customMessage,
//   //         meetingId,
//   //       }
//   //     );

//   //     console.log(updatedMeetingData, "rrrr");

//   //     dispatch(addCancelData(updatedMeetingData.data.data));
//   //     categorizeMeetings();
//   //     handleTabChange("Cancelled");
//   //   } catch (error: any) {
//   //     console.log(error);
//   //   }
//   //   // Perform cancellation logic here (e.g., API call)
//   // };
//   // const handleCancel = async (data: any) => {
//   //   console.log("Meeting canceled with data:", data);

//   //   try {
//   //     const updatedMeetingData = await axiosInstance.post(
//   //       "/events/meetings/cancel",
//   //       {
//   //         notifyParticipants: data.notifyParticipants,
//   //         cancelReason: data.customMessage,
//   //         meetingId,
//   //       }
//   //     );

//   //     console.log(updatedMeetingData, "Cancellation Response");

//   //     window.location.reload();
//   //     dispatch(addCancelData(updatedMeetingData.data.data));

//   //     categorizeMeetings(); // Reorganize meetings immediately
//   //     //handleTabChange("Cancelled"); // Switch to the Cancelled tab
//   //     setEffect((prevEffect: boolean) => !prevEffect); // Trigger the parent component's useEffect
//   //   } catch (error: any) {
//   //     console.error("Error canceling meeting:", error);
//   //   }
//   // };

//   // Function to open the modal
//   const openModal = () => setIsModalOpen(true);

//   // Function to close the modal
//   const closeModal = () => setIsModalOpen(false);

//   // Function to handle the cancellation
//   const handleCancel = async ({ customMessage, notifyParticipants }: any) => {
//     // Do something with the cancel data
//     console.log("Meeting canceled with message:", customMessage);
//     console.log("Notify participants:", notifyParticipants);
//     // Close the modal after handling the cancellation

//     try {
//       console.log(meetingId, "meetign ID");

//       const updatedMeetingData = await axiosInstance.post(
//         "/events/meetings/cancel",
//         {
//           notifyParticipants: notifyParticipants,
//           cancelReason: customMessage,
//           meetingId,
//         }
//       );

//       console.log(updatedMeetingData, "Cancellation Response");

//       //window.location.reload();
//       dispatch(addCancelData(updatedMeetingData.data.data));
//       categorizeMeetings();
//       closeModal();
//       handleTabChange("Cancelled");

//       // Reorganize meetings immediately
//       //handleTabChange("Cancelled"); // Switch to the Cancelled tab
//       //setEffect((prevEffect: boolean) => !prevEffect); // Trigger the parent component's useEffect
//     } catch (error: any) {
//       console.error("Error canceling meeting:", error);
//     }
//     // closeModal();
//   };
//   // Determine if the event is upcoming
//   const isUpcoming = new Date(event.eventDate) > new Date();

//   return (
//     <>
//       <div className="babel-row">
//         {/* Main Row */}
//         <div className="babel-row-main" onClick={toggleExpand}>
//           <div className="row-time">
//             <span>
//               {event.eventStartTime}-{event.eventEndTime}
//             </span>
//             <span
//               className="event-marker"
//               style={{ backgroundColor: "rgb(130, 71, 245)" }}
//             ></span>
//           </div>
//           <div className="row-details">
//             <strong>{event.eventId?.eventName}</strong>
//             <div>
//               Event Date:{" "}
//               <strong> {formatDateWithYear(event.eventDate)}</strong>
//             </div>
//           </div>
//           <div className="expand-icon">
//             {isExpanded ? (
//               <svg
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M10 15l-6-6h12l-6 6z" fill="currentColor" />
//               </svg>
//             ) : (
//               <svg
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M10 5l6 6H4l6-6z" fill="currentColor" />
//               </svg>
//             )}
//           </div>
//         </div>

//         {/* Expanded Row */}
//         {isExpanded && (
//           <div className="babel-row-expanded">
//             {event.meetingStatus === "confirmed" && isUpcoming && (
//               <div className="expanded-controls flex gap-4">
//                 <button
//                   className="border rounded-md px-4 py-1 bg-blue-500 text-white"
//                   onClick={() =>
//                     handleEventPage(
//                       event.eventId.eventName,

//                       event._id,
//                       event.eventId._id
//                     )
//                   }
//                 >
//                   Reschedule
//                 </button>
//                 {/* <button
//                   className="border rounded-md px-4 py-1"
//                   onClick={() => {
//                     setIsModalOpen(true), setMeetingId(event._id);
//                   }}
//                 >
//                   Cancel
//                 </button> */}

//                 <button
//                   onClick={() => {
//                     openModal(), setMeetingId(event._id);
//                   }}
//                   className="px-4 py-1 bg-red-500 text-white rounded"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}

//             <div className="expanded-details">
//               <div>
//                 <strong>Event Type:</strong> One-on-One
//               </div>
//               <div>
//                 <strong>Email:</strong> {event.bookedPersonEmail}
//               </div>
//               <div>
//                 <strong>Location: </strong>
//                 {!isPast ? (
//                   <a
//                     href={
//                       event.meetingStatus !== "cancelled"
//                         ? event.meetingUrl
//                         : "#"
//                     }
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`${
//                       event.meetingStatus !== "cancelled"
//                         ? "underline text-blue-500 hover:text-blue-700 cursor-pointer"
//                         : "cursor-not-allowed text-gray-400"
//                     }`}
//                   >
//                     Join Meeting
//                   </a>
//                 ) : (
//                   <span className="text-gray-400 cursor-not-allowed">
//                     Join Meeting
//                   </span>
//                 )}
//               </div>
//               <div>
//                 <strong>Invitee Timezone:</strong> Indian Standard Time (IST)
//               </div>
//               <div>
//                 <strong>Questions:</strong> {event.question || "No questions"}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//       <CancelMeetingModal
//         isOpen={isModalOpen}
//         onClose={closeModal} // Closing handled here in BabelRow
//         onCancel={handleCancel} // Passing the cancel handler to the modal
//       />
//     </>
//   );
// };

// export default BabelRow;

// import { useState } from "react";
// import "./BabelRow.css";
// import CancelMeetingModal from "./Cancel";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { axiosInstance } from "./config/http";
// import { addCancelData } from "./app-store/meetingSlice";

// const BabelRow = ({
//   event,
//   isPast,
//   setEffect,
//   categorizeMeetings,
//   handleTabChange,
// }: any) => {
//   const userData = useSelector((state: any) => state.registration.userData);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const formatDateWithYear = (dateString: any) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-US", {
//       weekday: "long",
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//     }).format(date);
//   };

//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // Loading state for cancel button
//   const [meetingId, setMeetingId] = useState("");

//   const toggleExpand = () => {
//     setIsExpanded((prev) => !prev);
//   };

//   const handleEventPage = (eventName: any, bookingId: any, eventId: any) => {
//     navigate(
//       `/${
//         userData.personalUrl
//       }/${eventName}?email=${"sachinksiby@gmail.com"}&bookingId=${bookingId}&name=${"sachin"}&eventId=${eventId}`
//     );
//   };

//   // Function to open the modal
//   const openModal = (id: string) => {
//     setMeetingId(id);
//     setIsModalOpen(true);
//   };

//   // Function to close the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setIsLoading(false); // Reset loading state when modal is closed
//   };

//   // Function to handle cancellation
//   const handleCancel = async ({ customMessage, notifyParticipants }: any) => {
//     setIsSubmitting(true); // Start the loader when cancellation begins
//     try {
//       // const updatedMeetingData = await axiosInstance.post(
//       //   "/events/meetings/cancel",
//       //   {
//       //     notifyParticipants: notifyParticipants,
//       //     cancelReason: customMessage,
//       //     meetingId,
//       //   }
//       // );
//       // console.log(updatedMeetingData, "Cancellation Response");
//       // dispatch(addCancelData(updatedMeetingData.data.data));
//       // categorizeMeetings();
//       // handleTabChange("Cancelled"); // Update to Cancelled tab
//     } catch (error: any) {
//       console.error("Error canceling meeting:", error);
//     } finally {
//       setIsLoading(false); // Stop the loader
//       closeModal(); // Close the modal
//     }
//   };

//   // Determine if the event is upcoming
//   const isUpcoming = new Date(event.eventDate) > new Date();

//   return (
//     <>
//       <div className="babel-row">
//         {/* Main Row */}
//         <div className="babel-row-main" onClick={toggleExpand}>
//           <div className="row-time">
//             <span>
//               {event.eventStartTime}-{event.eventEndTime}
//             </span>
//             <span
//               className="event-marker"
//               style={{ backgroundColor: "rgb(130, 71, 245)" }}
//             ></span>
//           </div>
//           <div className="row-details">
//             <strong>{event.eventId?.eventName}</strong>
//             <div>
//               Event Date:{" "}
//               <strong> {formatDateWithYear(event.eventDate)}</strong>
//             </div>
//           </div>
//           <div className="expand-icon">
//             {isExpanded ? (
//               <svg
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M10 15l-6-6h12l-6 6z" fill="currentColor" />
//               </svg>
//             ) : (
//               <svg
//                 viewBox="0 0 20 20"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path d="M10 5l6 6H4l6-6z" fill="currentColor" />
//               </svg>
//             )}
//           </div>
//         </div>

//         {/* Expanded Row */}
//         {isExpanded && (
//           <div className="babel-row-expanded">
//             {event.meetingStatus === "confirmed" && isUpcoming && (
//               <div className="expanded-controls flex gap-4">
//                 <button
//                   className="border rounded-md px-4 py-1 bg-blue-500 text-white"
//                   onClick={() =>
//                     handleEventPage(
//                       event.eventId.eventName,
//                       event._id,
//                       event.eventId._id
//                     )
//                   }
//                 >
//                   Reschedule
//                 </button>

//                 <button
//                   onClick={() => openModal(event._id)}
//                   className={`px-4 py-1 ${
//                     isLoading
//                       ? "bg-red-300 cursor-not-allowed"
//                       : "bg-red-500 text-white hover:bg-red-600"
//                   } rounded`}
//                   disabled={isLoading} // Disable the button when loading
//                 >
//                   {isLoading ? "Processing..." : "Cancel"}
//                 </button>
//               </div>
//             )}

//             <div className="expanded-details">
//               <div>
//                 <strong>Event Type:</strong> One-on-One
//               </div>
//               <div>
//                 <strong>Email:</strong> {event.bookedPersonEmail}
//               </div>
//               <div>
//                 <strong>Location: </strong>
//                 {!isPast ? (
//                   <a
//                     href={
//                       event.meetingStatus !== "cancelled"
//                         ? event.meetingUrl
//                         : "#"
//                     }
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className={`${
//                       event.meetingStatus !== "cancelled"
//                         ? "underline text-blue-500 hover:text-blue-700 cursor-pointer"
//                         : "cursor-not-allowed text-gray-400"
//                     }`}
//                   >
//                     Join Meeting
//                   </a>
//                 ) : (
//                   <span className="text-gray-400 cursor-not-allowed">
//                     Join Meeting
//                   </span>
//                 )}
//               </div>
//               <div>
//                 <strong>Invitee Timezone:</strong> Indian Standard Time (IST)
//               </div>
//               <div>
//                 <strong>Questions:</strong> {event.question || "No questions"}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Cancel Modal */}
//       <CancelMeetingModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onCancel={handleCancel}
//         isSubmitting={isSubmitting} // Pass state to modal
//       />
//     </>
//   );
// };

// export default BabelRow;

// import { useState } from "react";
// import "./BabelRow.css";
// import CancelMeetingModal from "./Cancel";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { axiosInstance } from "./config/http";
// import { addCancelData } from "./app-store/meetingSlice";

// const BabelRow = ({
//   event,
//   isPast,
//   setEffect,
//   categorizeMeetings,
//   handleTabChange,
// }: any) => {
//   const userData = useSelector((state: any) => state.registration.userData);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false); // Moved loading state here
//   const [meetingId, setMeetingId] = useState("");

//   const toggleExpand = () => {
//     setIsExpanded((prev) => !prev);
//   };

//   const openModal = (id: string) => {
//     setMeetingId(id);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setIsSubmitting(false); // Reset loader when modal is closed
//   };

//   const handleCancel = async ({ customMessage, notifyParticipants }: any) => {
//     setIsSubmitting(true); // Start loader
//     try {
//       // Example API call (uncomment when integrated)
//       const response = await axiosInstance.post("/events/meetings/cancel", {
//         notifyParticipants,
//         cancelReason: customMessage,
//         meetingId,
//       });
//       console.log("Cancellation Response:", response);

//       // Dispatch updated data to Redux store (if applicable)
//       dispatch(addCancelData(response.data.data));
//       categorizeMeetings();
//       //handleTabChange("Cancelled");
//       setIsSubmitting(false);
//       window.location.reload();
//     } catch (error: any) {
//       console.error("Error cancelling meeting:", error);
//     } finally {
//       setIsSubmitting(false); // Stop loader after server response
//       closeModal(); // Close modal
//     }
//   };

//   return (
//     <>
//       <div className="babel-row">
//         <div className="babel-row-main" onClick={toggleExpand}>
//           <div className="row-time">
//             <span>
//               {event.eventStartTime}-{event.eventEndTime}
//             </span>
//           </div>
//           <div className="row-details">
//             <strong>{event.eventId?.eventName}</strong>
//           </div>
//         </div>

//         {isExpanded && (
//           <div className="babel-row-expanded">
//             {event.meetingStatus === "confirmed" && (
//               <div className="expanded-controls">
//                 <button
//                   onClick={() => openModal(event._id)}
//                   className="bg-red-500 text-white px-4 py-1 rounded"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <CancelMeetingModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onCancel={handleCancel}
//         isSubmitting={isSubmitting} // Pass state to modal
//       />
//     </>
//   );
// };

//export default BabelRow;

import { useState } from "react";
import "./BabelRow.css";
import CancelMeetingModal from "./Cancel";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./config/http";
import { addCancelData } from "./app-store/meetingSlice";

const BabelRow = ({
  event,
  isPast,

  categorizeMeetings,
}: any) => {
  const userData = useSelector((state: any) => state.registration.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [meetingId, setMeetingId] = useState("");

  const formatDateWithYear = (dateString: any) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleEventPage = (
    boookedPersonEmail: any,
    bookedPersonName: any,
    eventName: any,
    bookingId: any,
    eventId: any
  ) => {
    navigate(
      `/${userData.personalUrl}/${eventName}?email=${boookedPersonEmail}&bookingId=${bookingId}&name=${bookedPersonName}&eventId=${eventId}`
    );
  };

  // Function to open the modal
  const openModal = (id: string) => {
    setMeetingId(id);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  // Function to handle cancellation
  const handleCancel = async ({ customMessage, notifyParticipants }: any) => {
    setIsSubmitting(true); // Start the loader when cancellation begins
    try {
      const updatedMeetingData = await axiosInstance.post(
        "/events/meetings/cancel",
        {
          notifyParticipants,
          cancelReason: customMessage,
          meetingId,
        }
      );

      console.log(updatedMeetingData, "Cancellation Response");
      dispatch(addCancelData(updatedMeetingData.data.data));
      categorizeMeetings();
      setIsSubmitting(false);
      closeModal(); //Refresh meeting data
      window.location.reload();
      // Switch to Cancelled tab
    } catch (error: any) {
      console.error("Error canceling meeting:", error);
    } finally {
      // setIsSubmitting(false); // Stop the loader
      // closeModal(); // Close the modal
    }
  };

  // Determine if the event is upcoming
  const isUpcoming = new Date(event.eventDate) > new Date();

  return (
    <>
      {console.log(event, "even")}
      <div className="babel-row">
        {/* Main Row */}
        <div className="babel-row-main" onClick={toggleExpand}>
          <div className="row-time">
            <span>
              {event.eventStartTime}-{event.eventEndTime}
            </span>
            <span
              className="event-marker"
              style={{ backgroundColor: "rgb(130, 71, 245)" }}
            ></span>
          </div>
          <div className="row-details">
            <strong>{event.eventId?.eventName}</strong>
            <div>
              Event Date:{" "}
              <strong> {formatDateWithYear(event.eventDate)}</strong>
            </div>
          </div>
          <div className="expand-icon">
            {isExpanded ? (
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 15l-6-6h12l-6 6z" fill="currentColor" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 5l6 6H4l6-6z" fill="currentColor" />
              </svg>
            )}
          </div>
        </div>

        {/* Expanded Row */}
        {isExpanded && (
          <div className="babel-row-expanded">
            {event.meetingStatus === "confirmed" && isUpcoming && (
              <div className="expanded-controls flex gap-4">
                <button
                  className="border rounded-md px-4 py-1 bg-blue-500 text-white"
                  onClick={() =>
                    handleEventPage(
                      event.bookedPersonEmail,
                      event.bookedPersonName,
                      event.eventId.eventName,
                      event._id,
                      event.eventId._id
                    )
                  }
                >
                  Reschedule
                </button>

                <button
                  onClick={() => openModal(event._id)}
                  className={`px-4 py-1 ${
                    isSubmitting
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  } rounded`}
                  disabled={isSubmitting} // Disable the button when submitting
                >
                  {isSubmitting ? "Processing..." : "Cancel"}
                </button>
              </div>
            )}

            <div className="expanded-details">
              <div>
                <strong>Event Type:</strong> One-on-One
              </div>
              <div>
                <strong>Email:</strong> {event.bookedPersonEmail}
              </div>
              <div>
                <strong>Location: </strong>
                {!isPast ? (
                  <a
                    href={
                      event.meetingStatus !== "cancelled"
                        ? event.meetingUrl
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${
                      event.meetingStatus !== "cancelled"
                        ? "underline text-blue-500 hover:text-blue-700 cursor-pointer"
                        : "cursor-not-allowed text-gray-400"
                    }`}
                  >
                    Join Meeting
                  </a>
                ) : (
                  <span className="text-gray-400 cursor-not-allowed">
                    Join Meeting
                  </span>
                )}
              </div>
              <div>
                <strong>Invitee Timezone:</strong> Indian Standard Time (IST)
              </div>
              <div>
                <strong>Questions:</strong> {event.question || "No questions"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      <CancelMeetingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCancel={handleCancel}
        isSubmitting={isSubmitting} // Pass state to modal
      />
    </>
  );
};

export default BabelRow;
