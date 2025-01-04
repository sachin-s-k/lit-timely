import { useState } from "react";
import "./BabelRow.css"; // Optional: Import CSS for styling

const BabelRow = ({ event }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="babel-row">
      {/* Main Row */}
      <div className="babel-row-main" onClick={toggleExpand}>
        <div className="row-time">
          <span>{event.time}</span>
          <span
            className="event-marker"
            style={{ backgroundColor: event.markerColor }}
          ></span>
        </div>
        <div className="row-details">
          <strong>{event.name}</strong>
          <div>
            Event type: <strong>{event.type}</strong>
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
          <div className="expanded-controls flex gap-4">
            <button className="border rounded-md px-4 py-1 bg-blue-500 text-white">
              Reschedule
            </button>
            <button className="border rounded-md px-4 py-1">Cancel</button>
          </div>
          <div className="expanded-details">
            <div>
              <strong>Email:</strong> {event.email}
            </div>
            <div>
              <strong>Location:</strong> {event.location || "No location given"}
            </div>
            <div>
              <strong>Invitee Timezone:</strong> {event.timezone}
            </div>
            <div>
              <strong>Questions:</strong> {event.questions}
            </div>
            <div>
              <strong>Host:</strong> {event.host}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BabelRow;
