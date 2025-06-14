import { useState } from "react";
import "./BabelRow.css";
import CancelMeetingModal from "./Cancel";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./config/http";
import { addCancelData } from "./app-store/meetingSlice";
import toast, { Toaster } from "react-hot-toast";

const BabelRow = ({ event, categorizeMeetings }: any) => {
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
    eventId: any,
    eventCategory: any,
    litApplicationUserId: any,
    cohortId: any
  ) => {
    if (eventCategory && litApplicationUserId && cohortId) {
      navigate(
        `/${userData.personalUrl}/${eventName}?email=${boookedPersonEmail}&bookingId=${bookingId}&name=${bookedPersonName}&eventId=${eventId}&eventCategory=${eventCategory}&litApplicationUserId=${litApplicationUserId}&cohortId=${cohortId}&ownerBooking=true`
      );
    } else {
      navigate(
        `/${userData.personalUrl}/${eventName}?email=${boookedPersonEmail}&bookingId=${bookingId}&name=${bookedPersonName}&eventId=${eventId}`
      );
    }
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

      dispatch(addCancelData(updatedMeetingData.data.data));
      categorizeMeetings();
      setIsSubmitting(false);
      closeModal(); //Refresh meeting data
      window.location.reload();
      // Switch to Cancelled tab
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false); // Stop the loader
      closeModal(); // Close the modal
    }
  };

  // Determine if the event is upcoming
  const isUpcoming = (() => {
    const now = new Date();
    const eventDate = new Date(event.eventDate);

    // Extract start time from event
    const [hours, minutes] = event.eventStartTime
      .split(":")
      .map((val: any) => parseInt(val, 10));

    const isPM = event.eventStartTime.includes("PM");
    const eventStartTime = new Date(eventDate);
    eventStartTime.setHours(isPM ? (hours % 12) + 12 : hours, minutes, 0, 0);

    return (
      eventDate > now ||
      (eventDate.toDateString() === now.toDateString() && eventStartTime > now)
    );
  })();
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
              Event Date: <strong>{formatDateWithYear(event.eventDate)}</strong>
            </div>
          </div>

          {/* Meeting link on the right */}
          {event.meetingStatus === "confirmed" && isUpcoming && !isExpanded && (
            <a
              href={event.meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="meeting-link hidden md:inline"
              onClick={(e) => e.stopPropagation()}
            >
              Join Meeting
            </a>
          )}

          {/* Solid Up/Down Arrow for Expand/Collapse */}
          <div className="expand-icon">
            {isExpanded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M5 12l5-5 5 5H5z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M5 8l5 5 5-5H5z" />
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
                      event.eventId._id,
                      event.eventCategory,
                      event.litApplicationUserId,
                      event.cohortId
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
                  disabled={isSubmitting}
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
                {event.meetingStatus === "confirmed" && isUpcoming ? (
                  <a
                    href={event.meetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    Join Meeting
                  </a>
                ) : (
                  <span className="text-gray-400 cursor-not-allowed">
                    Not Available
                  </span>
                )}
              </div>

              <div>
                <strong>Invitee Timezone:</strong> Indian Standard Time (IST)
              </div>
              <div>
                <strong>Questions:</strong> {event.question || "No questions"}
              </div>
              {event.meetingStatus === "cancelled" && (
                <div>
                  <strong>Cancellation Reason:</strong>{" "}
                  {event.cancelReason || "No reason provided"}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      <CancelMeetingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
      <Toaster />
    </>
  );
};

export default BabelRow;
