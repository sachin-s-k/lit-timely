// import React from "react";
// import { FcGoogle } from "react-icons/fc"; // Google logo icon
// import { Calendar } from "lucide-react"; // Icon for calendar
// import { useParams } from "react-router-dom";

// const GoogleCalendarLinkingPage = () => {
//   const { id } = useParams();

//   const handleGoogleCalendarLinking = () => {
//     // Redirect the user to the backend route for Google Calendar linking
//     window.location.href = `http://localhost:8000/calendar/link/${id}`;
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
//       {/* Card Container */}
//       <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//         {/* Header */}
//         <div className="flex flex-col items-center text-center">
//           <Calendar className="text-blue-500 w-16 h-16 mb-4" />
//           <h1 className="text-2xl font-bold text-gray-800 mb-2">
//             Link Your Google Calendar
//           </h1>
//           <p className="text-gray-600 text-sm">
//             Connect your Google Calendar to seamlessly manage and sync events
//             across platforms.
//           </p>
//         </div>

//         {/* Instruction */}
//         <div className="mt-6 bg-blue-100 p-4 rounded-lg text-blue-900 text-sm">
//           <p className="mb-2 font-medium">Why link your Google Calendar?</p>
//           <ul className="list-disc list-inside space-y-1">
//             <li>Sync events and schedules automatically.</li>
//             <li>Provide reminders for upcoming appointments.</li>
//             <li>Ensure your events are always up-to-date.</li>
//           </ul>
//         </div>

//         {/* Button */}
//         <div className="mt-6">
//           <button
//             onClick={handleGoogleCalendarLinking}
//             className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
//           >
//             <FcGoogle className="mr-3 w-6 h-6" />
//             Link Google Calendar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GoogleCalendarLinkingPage;

import { useParams } from "react-router-dom";

const GoogleCalendarLinkingPage = () => {
  const { id } = useParams();

  const handleGoogleCalendarLinking = () => {
    // Redirect the user to the backend route for Google Calendar linking
    window.location.href = `http://localhost:8000/auth/google/${id}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Card Container */}
      <div className="bg-white shadow-xl border rounded-lg p-8 w-full max-w-md border-blue-50">
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" // Path to your SVG
            alt="Google Calendar Icon"
            className="w-16 h-16 mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Link Your Google Calendar
          </h1>
          <p className="text-gray-600 text-sm">
            Connect your Google Calendar to seamlessly manage and sync events
            across platforms.
          </p>
        </div>

        {/* Instruction */}
        <div className="mt-6 bg-blue-100 p-4 rounded-lg text-blue-700 text-sm">
          <p className="mb-2 font-medium">Why link your Google Calendar?</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Sync events and schedules automatically.</li>
            <li>Provide reminders for upcoming appointments.</li>
            <li>Ensure your events are always up-to-date.</li>
          </ul>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button
            onClick={handleGoogleCalendarLinking}
            className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-3 px-4 rounded-lg transition duration-150 ease-in-out"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg" // Reusing the SVG
              alt="Google Calendar"
              className="mr-3 w-6 h-6"
            />
            Link Google Calendar
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoogleCalendarLinkingPage;
