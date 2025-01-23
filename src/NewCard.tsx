import { useState } from "react";

function EventGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDeleteButton, setShowDeleteButton] = useState(false); // State for delete button visibility

  const handleModalOpen = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEvent(null), 300); // Delay for smooth exit animation
  };

  const toggleDeleteButton = () => {
    setShowDeleteButton((prev) => !prev); // Toggle delete button visibility
  };

  // Example event data
  const events = [
    {
      id: 1,
      name: "Event Title 1",
      type: "One-on-One",
      duration: "30 min",
      description: "This is the description of Event Title 1.",
    },
    {
      id: 2,
      name: "Event Title 2",
      type: "Team Meeting",
      duration: "60 min",
      description: "This is the description of Event Title 2.",
    },
    {
      id: 3,
      name: "Event Title 3",
      type: "Workshop",
      duration: "90 min",
      description: "This is the description of Event Title 3.",
    },
  ];

  return (
    <>
      {/* Event Grid */}
      <div className="grid grid-cols-3 gap-6 p-6 bg-gray-50">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative border border-gray-200 rounded-lg shadow-md p-4 bg-white transform transition-transform duration-200 hover:scale-105 hover:z-10 hover:shadow-lg"
          >
            <div className="flex justify-between items-center">
              {/* Checkbox */}
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />

              {/* Settings Button */}
              <button onClick={() => handleModalOpen(event)}>
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
            <h3 className="text-lg font-medium mt-2">{event.name}</h3>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-1">
              {event.duration}, {event.type}
            </p>

            {/* Link */}
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
            >
              View booking page
            </a>

            {/* Buttons */}
            <div className="mt-4 flex gap-2">
              <button
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                onClick={toggleDeleteButton}
              >
                Select
              </button>
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                Turn On
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
          <div
            className={`bg-white rounded-lg shadow-lg p-6 w-96 transform transition-all duration-300 ${
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
            <div className="space-y-4">
              {/* Event Name */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  Event Name
                </h3>
                <p className="text-sm text-gray-600">{selectedEvent.name}</p>
              </div>

              {/* Event Type */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  Event Type
                </h3>
                <p className="text-sm text-gray-600">{selectedEvent.type}</p>
              </div>

              {/* Duration */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  Duration
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedEvent.duration}
                </p>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700">
                  Description
                </h3>
                <p className="text-sm text-gray-600">
                  {selectedEvent.description}
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex justify-end">
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

      {/* Delete Button */}
      {showDeleteButton && (
        <div
          className={`fixed bottom-0  left-0 w-full bg- shadow-lg py-4 flex justify-center transition-transform duration-300 ${
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
      )}
    </>
  );
}

export default EventGrid;
