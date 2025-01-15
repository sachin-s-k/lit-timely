// import React, { useState } from "react";

// const CancelMeetingModal = ({ isOpen, onClose, onCancel }: any) => {
//   const [customMessage, setCustomMessage] = useState("");
//   const [notifyParticipants, setNotifyParticipants] = useState(true);

//   if (!isOpen) return null; // If modal is not open, don't render anything

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto relative">
//         <h2 className="text-lg font-bold mb-4">Cancel Meeting</h2>
//         <p className="mb-2">
//           Are you sure you want to cancel this meeting? This action will notify
//           all participants and remove the meeting from their schedules.
//         </p>

//         {/* Notify Participants */}
//         <div className="flex items-center mb-4">
//           <input
//             type="checkbox"
//             id="notifyParticipants"
//             checked={notifyParticipants}
//             onChange={() => setNotifyParticipants(!notifyParticipants)}
//             className="mr-2"
//           />
//           <label htmlFor="notifyParticipants" className="text-sm">
//             Notify all participants about the cancellation.
//           </label>
//         </div>

//         {/* Custom Message */}
//         <div className="mb-4">
//           <label htmlFor="customMessage" className="block text-sm mb-1">
//             Add a custom message (optional):
//           </label>
//           <textarea
//             id="customMessage"
//             rows={3}
//             value={customMessage}
//             onChange={(e) => setCustomMessage(e.target.value)}
//             placeholder="E.g., Apologies for the inconvenience. Let’s reschedule soon!"
//             className="w-full border border-gray-300 rounded-lg p-2 focus:outline-blue-500"
//           />
//         </div>

//         {/* Actions */}
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={onClose} // Close the modal from the parent component
//             className="px-4 py-2 border rounded-full bg-gray-100 hover:bg-gray-200"
//           >
//             Close
//           </button>
//           <button
//             onClick={() => {
//               // Call the onCancel method passed from the parent
//               onCancel({ customMessage, notifyParticipants });
//             }}
//             className="px-4 py-2 border rounded-full bg-red-500 text-white hover:bg-red-600"
//           >
//             Cancel Meeting
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CancelMeetingModal;

// import React, { useState } from "react";
// import { ThreeDots } from "react-loader-spinner";

// const CancelMeetingModal = ({
//   isOpen,
//   onClose,
//   onCancel,
//   isSubmitting,
// }: any) => {
//   const [customMessage, setCustomMessage] = useState("");
//   const [notifyParticipants, setNotifyParticipants] = useState(true);
//   // const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state

//   if (!isOpen) return null;

//   const handleCancelClick = async () => {
//     //setIsSubmitting(true); // Show loader
//     //await onCancel({ customMessage, notifyParticipants });
//     // setIsSubmitting(false); // Hide loader after submission
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto relative">
//         <h2 className="text-lg font-bold mb-4">Cancel Meeting</h2>
//         <p className="mb-2">
//           Are you sure you want to cancel this meeting? This action will notify
//           all participants and remove the meeting from their schedules.
//         </p>
//         {/* Notify Participants */}
//         <div className="flex items-center mb-4">
//           <input
//             type="checkbox"
//             id="notifyParticipants"
//             checked={notifyParticipants}
//             onChange={() => setNotifyParticipants(!notifyParticipants)}
//             className="mr-2"
//           />
//           <label htmlFor="notifyParticipants" className="text-sm">
//             Notify all participants about the cancellation.
//           </label>
//         </div>
//         {/* Custom Message */}
//         <div className="mb-4">
//           <label htmlFor="customMessage" className="block text-sm mb-1">
//             Add a custom message (optional):
//           </label>
//           <textarea
//             id="customMessage"
//             rows={3}
//             value={customMessage}
//             onChange={(e) => setCustomMessage(e.target.value)}
//             placeholder="E.g., Apologies for the inconvenience. Let’s reschedule soon!"
//             className="w-full border border-gray-300 rounded-xl p-1 px-4 focus:outline-blue-500"
//           />
//         </div>
//         {/* Actions */}
//         <div className="flex justify-end gap-4">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 border rounded-full bg-gray-100 hover:bg-gray-200"
//             disabled={isSubmitting} // Disable during submission
//           >
//             Close
//           </button>
//           <button
//             onClick={handleCancelClick}
//             className={`px-4 py-2 border rounded-full ${
//               isSubmitting
//                 ? "bg-red-600 cursor-not-allowed"
//                 : "bg-red-500 text-white hover:bg-red-600"
//             }`}
//             disabled={isSubmitting} // Disable during submission
//           >
//             {isSubmitting ? (
//               <ThreeDots
//                 height="16" // Same height as the button
//                 width="110.5" // Same width as the button
//                 color="white" // Same color as the button text
//                 visible={true}
//                 ariaLabel="loading"
//               />
//             ) : (
//               "Cancel Meeting"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CancelMeetingModal;

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
