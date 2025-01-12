import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Bind modal to your root element for accessibility

const CancelMeetingModal = ({ isOpen, onClose, onCancel }) => {
  const [customMessage, setCustomMessage] = useState("");
  const [notifyParticipants, setNotifyParticipants] = useState(true);

  const handleCancel = () => {
    onCancel({ customMessage, notifyParticipants });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20 z-60"
      overlayClassName="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div>
        <h2 className="text-lg font-bold mb-4">Cancel Meeting</h2>
        <p className="mb-2">
          Are you sure you want to cancel this meeting? This action will notify
          all participants and remove the meeting from their schedules.
        </p>

        {/* Notify Participants */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="notifyParticipants"
            checked={notifyParticipants}
            onChange={() => setNotifyParticipants(!notifyParticipants)}
            className="mr-2"
          />
          <label htmlFor="notifyParticipants" className="text-sm">
            Notify all participants about the cancellation.
          </label>
        </div>

        {/* Custom Message */}
        <div className="mb-4">
          <label htmlFor="customMessage" className="block text-sm mb-1">
            Add a custom message (optional):
          </label>
          <textarea
            id="customMessage"
            rows={3}
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="E.g., Apologies for the inconvenience. Let’s reschedule soon!"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-full bg-gray-100 hover:bg-gray-200"
          >
            Close
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 border rounded-full bg-red-500 text-white hover:bg-red-600"
          >
            Cancel Meeting
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CancelMeetingModal;
