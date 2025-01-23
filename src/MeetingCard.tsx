import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addDeleteEventIds,
  removeDeleteEventIds,
} from "./app-store/eventSlice";

const MeetingCard = ({ events }: any) => {
  const dispatch = useDispatch();

  const selectedEvents = useSelector(
    (state: any) => state.event.deleteEventIds
  );

  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  const userData = useSelector((state: any) => state.registration.userData);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${userData.personalUrl}/${events.eventName}?eventId=${events._id}`
      );
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (error: any) {
      console.error("Error copying URL:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null as any);
  // const [showDeleteButton, setShowDeleteButton] = useState(false ); // State for delete button visibility

  const handleModalOpen = (eventData: any) => {
    console.log("event");

    setSelectedEvent(eventData);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300); // Delay for smooth exit animation
  };

  // const [onLoading, setOnLoading] = useState(false);

  // const handleOpenAndClose:any = (value: any) => {
  //   setOnLoading(value);
  // };
  // console.log(onLoading);

  const handleCheckboxChange = (eventId: any, checked: any) => {
    console.log("called");

    if (checked) {
      dispatch(addDeleteEventIds(eventId)); // Add to selected events
    } else {
      dispatch(removeDeleteEventIds(eventId)); // Remove from selected events
    }
  };

  const isChecked = selectedEvents?.includes(events._id);

  return (
    <>
      {/* Card */}
      <div className="border-t-5   rounded-t-md  shadow-md bg-white relative  border-gray-400    transform transition-transform duration-200 hover:scale-105 hover:z-10 hover:shadow-lg">
        {/* Top border */}

        <div className="p-4">
          <div className="flex justify-between items-center">
            {/* Checkbox */}
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={isChecked}
              onChange={(e) =>
                handleCheckboxChange(events._id, e.target.checked)
              }
            />

            {/* Settings Icon */}
            <button
              onClick={() => {
                handleModalOpen(events);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 hover:text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12c0-4.971-4.029-9-9-9s-9 4.029-9 9 4.029 9 9 9 9-4.029 9-9z"
                />
              </svg>
            </button>
          </div>

          {/* Title */}
          <h3 className="text-lg font-medium mt-2">{events.eventName}</h3>

          {/* Description */}
          <p className="text-sm text-gray-500 mt-1">
            {events.eventDuration} min, One-on-One
          </p>

          <p className="text-sm text-gray-500 mt-1">{events.eventCategory}</p>
          {/* Link */}
          <a
            href={`${window.location.origin}/${userData.personalUrl}/${events.eventName}?eventId=${events._id}`}
            className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
            target="_blank" // Opens the link in a new tab or window
            rel="noopener noreferrer" // Security best practice when using target="_blank"
          >
            View booking page
            {/* Link text or content */}
          </a>
        </div>

        {/* Bottom border under "Copy link" */}
        <div className="border-t border-gray-200"></div>

        {/* Buttons */}
        <div className="p-4 flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            {copied ? "Copied" : "Copy link"}
          </button>

          <button
            onClick={() => navigate(`/create/new-events?eventId=${events._id}`)}
            className="flex-1 flex justify-center items-center px-3 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Edit
          </button>
        </div>
      </div>

      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div
            className={`bg-white rounded-lg h-96 shadow-lg p-6 w-96 flex flex-col transform transition-all duration-300 ${
              isModalOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Event Details</h2>
              <button
                onClick={handleModalClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-grow overflow-y-auto space-y-4">
              {/* Event Name */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  Event Name
                </h3>
                <p className="text-sm text-gray-600 break-words">
                  {selectedEvent.eventName}
                </p>
              </div>

              {/* Event Type */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  Event Type
                </h3>
                <p className="text-sm text-gray-600">One-on-one</p>
              </div>

              {/* Duration */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  Duration
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedEvent.eventDuration}
                </p>
              </div>

              {/* Category */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  Category
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedEvent.eventCategory}
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  Description
                </h3>
                <p className="text-sm text-gray-600 break-words">
                  {selectedEvent.eventDescription}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Button
      {showDeleteButton && (
        <div
          className={`fixed bottom-0  left-0 w-full overflow-hidden bg-gray-300  shadow-lg py-4 flex justify-center transition-transform duration-300 ${
            showDeleteButton ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <button
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={() => alert("Delete action triggered!")}
          >
            Delete
          </button>
        </div>
      )} */}

      {/* Duplicate this card structure for more cards */}
    </>
  );
};

export default MeetingCard;
