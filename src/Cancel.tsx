import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";
const CancelMeetingModal = ({
  isOpen,
  onClose,
  onCancel,
  isSubmitting,
}: any) => {
  const [customMessage, setCustomMessage] = useState("");
  const [notifyParticipants, setNotifyParticipants] = useState(true);

  if (!isOpen) return null;

  const handleCancelClick = () => {
    onCancel({ customMessage, notifyParticipants });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto relative">
        <h2 className="text-lg font-bold mb-4">
          Your Booking Is Now Cancelled
        </h2>
        <p className="mb-4">
          Are you sure you want to cancel this meeting? This action will notify
          all participants and remove the meeting from their schedules.
        </p>

        <div className="mb-4">
          <input
            type="checkbox"
            id="notifyParticipants"
            checked={notifyParticipants}
            onChange={() => setNotifyParticipants(!notifyParticipants)}
            className="mr-2"
          />
          <label htmlFor="notifyParticipants" className="text-sm">
            Notify all participants.
          </label>
        </div>

        <textarea
          id="customMessage"
          rows={3}
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          placeholder="Optional message (e.g., Apologies for the inconvenience)."
          className="w-full border rounded p-2 mb-4"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
            disabled={isSubmitting}
          >
            Close
          </button>
          <button
            onClick={handleCancelClick}
            className={`px-6 py-2 border rounded-lg ${
              isSubmitting
                ? "bg-red-500  cursor-not-allowed"
                : "bg-red-500  text-white hover:bg-red-600"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ThreeDots height="16" width="112" color="white" visible={true} />
            ) : (
              "Cancel Meeting"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelMeetingModal;
