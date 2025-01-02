// const events = [
//   {
//     id: 1,
//     title: "Team Meeting",
//     description: "Discuss project updates and next steps.",
//     date: "2024-01-05",
//     time: "10:00 AM - 11:00 AM",
//     location: "Zoom",
//     link: "https://zoom.us/meeting/12345",
//   },
//   {
//     id: 2,
//     title: "Client Call",
//     description: "Review project requirements with the client.",
//     date: "2024-01-06",
//     time: "2:00 PM - 3:00 PM",
//     location: "Google Meet",
//     link: "https://meet.google.com/xyz123",
//   },
//   {
//     id: 3,
//     title: "Strategy Session",
//     description: "Plan the roadmap for Q1.",
//     date: "2024-01-10",
//     time: "1:00 PM - 3:00 PM",
//     location: "Microsoft Teams",
//     link: "https://teams.microsoft.com/l/12345",
//   },
// ];

// const EventCard = ({ event }) => {
//   return (
//     <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-xl rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-2xl">
//       <h3 className="text-xl font-bold mb-2">{event.title}</h3>
//       <p className="text-sm mb-4">{event.description}</p>
//       <div className="border-t border-white/20 pt-4">
//         <p className="text-sm">
//           <span className="font-semibold">📅 Date:</span> {event.date}
//         </p>
//         <p className="text-sm">
//           <span className="font-semibold">⏰ Time:</span> {event.time}
//         </p>
//         <p className="text-sm">
//           <span className="font-semibold">📍 Location:</span> {event.location}
//         </p>
//       </div>
//       <a
//         href={event.link}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="mt-4 inline-block bg-white text-blue-700 font-semibold py-2 px-4 rounded-md hover:bg-blue-100 transition-all duration-200"
//       >
//         Join Event
//       </a>
//     </div>
//   );
// };

// const EventsList = ({ events }) => {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
//       <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
//         Owner's Events
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map((event) => (
//           <EventCard key={event.id} event={event} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const Card = () => {
//   return <EventsList events={events} />;
// };

// export default Card;

// import React, { useState } from "react";

// const owners = [
//   {
//     id: 1,
//     name: "John Doe",
//     avatar: "https://via.placeholder.com/100",
//     bio: "Managing 10+ events across departments.",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     avatar: "https://via.placeholder.com/100",
//     bio: "Focused on client engagement and workshops.",
//   },
//   {
//     id: 3,
//     name: "Michael Johnson",
//     avatar: "https://via.placeholder.com/100",
//     bio: "Specialist in technology and innovation events.",
//   },
// ];

// const events = {
//   1: [
//     {
//       id: 1,
//       title: "Team Sync",
//       date: "2024-01-05",
//       time: "10:00 AM",
//       description: "Weekly team sync for project updates.",
//     },
//     {
//       id: 2,
//       title: "Workshop Planning",
//       date: "2024-01-08",
//       time: "2:00 PM",
//       description: "Plan Q1 workshops with stakeholders.",
//     },
//   ],
//   2: [
//     {
//       id: 1,
//       title: "Client Onboarding",
//       date: "2024-01-07",
//       time: "11:00 AM",
//       description: "Onboarding for new clients.",
//     },
//     {
//       id: 2,
//       title: "Feedback Session",
//       date: "2024-01-10",
//       time: "3:00 PM",
//       description: "Gather client feedback.",
//     },
//   ],
//   3: [
//     {
//       id: 1,
//       title: "Tech Conference",
//       date: "2024-01-12",
//       time: "9:00 AM",
//       description: "Presenting innovations in tech.",
//     },
//     {
//       id: 2,
//       title: "Hackathon Prep",
//       date: "2024-01-15",
//       time: "5:00 PM",
//       description: "Prepare for upcoming hackathon.",
//     },
//   ],
// };

// const OwnerCard = ({ owner, onClick }) => (
//   <div
//     className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white shadow-xl rounded-lg p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
//     onClick={() => onClick(owner.id)}
//   >
//     <img
//       src={owner.avatar}
//       alt={owner.name}
//       className="rounded-full w-24 h-24 mx-auto mb-4 border-4 border-white shadow-lg"
//     />
//     <h3 className="text-xl font-bold text-center">{owner.name}</h3>
//     <p className="text-sm text-center mt-2">{owner.bio}</p>
//   </div>
// );

// const EventCard = ({ event }) => (
//   <div className="bg-white shadow-lg rounded-lg p-6 text-gray-800 transform transition-all hover:scale-105 hover:shadow-2xl">
//     <h4 className="text-lg font-bold mb-2">{event.title}</h4>
//     <p className="text-sm mb-2">{event.description}</p>
//     <p className="text-sm">
//       <span className="font-semibold">📅 Date:</span> {event.date}
//     </p>
//     <p className="text-sm">
//       <span className="font-semibold">⏰ Time:</span> {event.time}
//     </p>
//   </div>
// );

// const OwnerEvents = ({ ownerId, onBack }) => {
//   const ownerEvents = events[ownerId] || [];
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
//       <button
//         onClick={onBack}
//         className="mb-6 text-blue-600 underline hover:text-blue-800"
//       >
//         ← Back to Owners
//       </button>
//       <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
//         Events for Owner {ownerId}
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {ownerEvents.map((event) => (
//           <EventCard key={event.id} event={event} />
//         ))}
//       </div>
//     </div>
//   );
// };

// const OwnersPage = () => {
//   const [selectedOwnerId, setSelectedOwnerId] = useState(null);

//   if (selectedOwnerId) {
//     return (
//       <OwnerEvents
//         ownerId={selectedOwnerId}
//         onBack={() => setSelectedOwnerId(null)}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
//       <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
//         Owner's List
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {owners.map((owner) => (
//           <OwnerCard
//             key={owner.id}
//             owner={owner}
//             onClick={setSelectedOwnerId}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   return <OwnersPage />;
// };

// export default App;
import { useState } from "react";

const owners = [
  { id: 1, name: "John Doe", bio: "Managing 10+ events across departments." },
  {
    id: 2,
    name: "Jane Smith",
    bio: "Focused on client engagement and workshops.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    bio: "Specialist in technology and innovation events.",
  },
  { id: 1, name: "John Doe", bio: "Managing 10+ events across departments." },
  {
    id: 2,
    name: "Jane Smith",
    bio: "Focused on client engagement and workshops.",
  },
  {
    id: 3,
    name: "Michael Johnson",
    bio: "Specialist in technology and innovation events.",
  },
];

const events: any = {
  1: [
    {
      id: 1,
      title: "Team Sync",
      date: "2024-01-05",
      time: "10:00 AM",
      description: "Weekly team sync for project updates.",
    },
    {
      id: 2,
      title: "Workshop Planning",
      date: "2024-01-08",
      time: "2:00 PM",
      description: "Plan Q1 workshops with stakeholders.",
    },
  ],
  2: [
    {
      id: 1,
      title: "Client Onboarding",
      date: "2024-01-07",
      time: "11:00 AM",
      description: "Onboarding for new clients.",
    },
    {
      id: 2,
      title: "Feedback Session",
      date: "2024-01-10",
      time: "3:00 PM",
      description: "Gather client feedback.",
    },
  ],
  3: [
    {
      id: 1,
      title: "Tech Conference",
      date: "2024-01-12",
      time: "9:00 AM",
      description: "Presenting innovations in tech.",
    },
    {
      id: 2,
      title: "Hackathon Prep",
      date: "2024-01-15",
      time: "5:00 PM",
      description: "Prepare for upcoming hackathon.",
    },
  ],
};

const getInitials = (name: any) => {
  const [firstName] = name.split(" ");
  return firstName.slice(0, 2).toUpperCase();
};

const OwnerCard = ({ owner, onClick }: any) => (
  <div
    className="bg-white text-gray-800 shadow-lg rounded-lg p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
    onClick={() => onClick(owner.id)}
  >
    <div className="bg-blue-400 text-white rounded-full w-24 h-24 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
      {getInitials(owner.name)}
    </div>
    <h3 className="text-xl font-bold text-center text-blue-500">
      {owner.name}
    </h3>
    <p className="text-sm text-center mt-2">{owner.bio}</p>
  </div>
);

const EventCard = ({ event }: any) => (
  <div className="bg-white shadow-lg rounded-lg p-6 text-gray-800 transform transition-all hover:scale-105 hover:shadow-2xl">
    <h4 className="text-lg font-bold mb-2 text-blue-500">{event.title}</h4>
    <p className="text-sm mb-2">{event.description}</p>
    <p className="text-sm">
      <span className="font-semibold text-blue-500">📅 Date:</span> {event.date}
    </p>
    <p className="text-sm">
      <span className="font-semibold text-blue-500">⏰ Time:</span> {event.time}
    </p>
  </div>
);

const OwnerEvents = ({ ownerId, onBack }: any) => {
  const ownerEvents: any = events[ownerId] || [];
  return (
    <div className="min-h-screen bg-white p-6">
      <button
        onClick={onBack}
        className="mb-6 text-blue-500 underline hover:text-blue-700"
      >
        ← Back to Owners
      </button>
      <h2 className="text-3xl font-bold text-blue-500 text-center mb-8">
        Events for Owner {ownerId}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ownerEvents.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

const OwnersPage = () => {
  const [selectedOwnerId, setSelectedOwnerId] = useState(null);

  if (selectedOwnerId) {
    return (
      <OwnerEvents
        ownerId={selectedOwnerId}
        onBack={() => setSelectedOwnerId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-blue-500 text-center mb-8">
        Interviewer's List
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {owners.map((owner) => (
          <OwnerCard
            key={owner.id}
            owner={owner}
            onClick={setSelectedOwnerId}
          />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return <OwnersPage />;
};

export default App;
