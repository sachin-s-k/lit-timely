import { useState } from "react";
import "./BabelRow.css"; // Optional: Import CSS for styling
import CancelMeetingModal from "./Cancel";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./config/http";
import { addCancelData } from "./app-store/meetingSlice";

const BabelRow = ({ event, isPast, setEffect }: any) => {
  const userData = useSelector((state: any) => state.registration.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formatDateWithYear = (dateString: any) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric", // Include the year in the format
    }).format(date);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEventPage = (eventName: any, bookingId: any, eventId: any) => {
    navigate(
      `/${
        userData.personalUrl
      }/${eventName}?email=${"sachinksiby@gmail.com"}&bookingId=${bookingId}&name=${"sachin"}&eventId=${eventId}`
    );
  };
  const [meetingId, setMeetingId] = useState("");
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleCancel = async (data: any) => {
    console.log("Meeting canceled with data:", data);

    try {
      const updatedMeetingData = await axiosInstance.post(
        "/events/meetings/cancel",
        {
          notifyParticipants: data.notifyParticipants,
          cancelReason: data.customMessage,
          meetingId,
        }
      );

      console.log(updatedMeetingData, "rrrr");

      dispatch(addCancelData(updatedMeetingData.data.data));
      setEffect(true);
    } catch (error: any) {
      console.log(error);
    }
    // Perform cancellation logic here (e.g., API call)
  };

  // Determine if the event is upcoming
  const isUpcoming = new Date(event.eventDate) > new Date();

  return (
    <>
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
                      event.eventId.eventName,

                      event._id,
                      event.eventId._id
                    )
                  }
                >
                  Reschedule
                </button>
                <button
                  className="border rounded-md px-4 py-1"
                  onClick={() => {
                    setIsModalOpen(true), setMeetingId(event._id);
                  }}
                >
                  Cancel
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
      <CancelMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancel={handleCancel}
      />
    </>
  );
};

export default BabelRow;
