// import { useEffect, useState } from "react";

// import { axiosInstance } from "./config/http";
// import EventCard from "./EventCard";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import SkeletonCard from "./SkeletonCard";

// const UserPage = () => {
//   const [events, setEvents] = useState([]); // State to store events
//   const { id } = useParams();
//   const [userData, setUserData] = useState({} as any);

//   console.log("idd", id);
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   console.log(searchParams, "sear");
//   const eventId = searchParams.get("eventId");
//   console.log(eventId, "eveve");

//   const email = searchParams.get("email");
//   const userId = searchParams.get("userId");
//   const name = searchParams.get("name");
//   console.log(email, userId, name, "nameeeee");
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     console.log("called");

//     const fetchEvents = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get(
//           `/events/${id}?eventId=${eventId}`
//         );
//         // dispatch(addEventData(response.data.data));
//         console.log(response.data.userData);
//         setUserData(response.data.userData);

//         setEvents(response.data.data);
//         setLoading(false);
//         //setEvents(response.data); // Assuming the response contains event data
//         //console.log(response, "eree");
//       } catch (error) {
//         console.error("Error fetching events", error);
//       }
//     };
//     fetchEvents();
//   }, []);

//   const handleEventPage = (eventId: any, eventName: string) => {
//     console.log(eventId, "eventId");
//     navigate(
//       `/${id}/${eventName}?email=${"sachinksibymuttar@gmail.com"}&userId=${1234444}&name=${"John Doe"}&eventId=${eventId}`
//     );
//   };

//   return (
//     <>
//       <div className="container mx-auto px-4 py-10">
//         {/* User Info Section */}
//         <div className="flex flex-col items-center mb-8">
//           {/* Profile Image Section */}
//           <div className="w-28 h-28 rounded-full overflow-hidden mb-4 bg-gray-50 flex items-center justify-center">
//             {userData ? (
//               userData.profileImageUrl ? (
//                 <img
//                   src={userData.profileImageUrl}
//                   className="w-full h-full object-cover"
//                   alt="Profile"
//                 />
//               ) : (
//                 <div className="text-gray-800 text-2xl font-bold">
//                   {userData.firstName?.slice(0, 2).toUpperCase() || ""}
//                 </div>
//               )
//             ) : (
//               <div className="w-28 h-28 rounded-full bg-gray-300 animate-pulse"></div>
//             )}
//           </div>

//           {/* Name Section */}
//           <h1 className="text-xl font-semibold text-gray-800">
//             {userData ? (
//               `${userData.firstName
//                 ?.charAt(0)
//                 .toUpperCase()}${userData.firstName
//                 ?.slice(1)
//                 .toLowerCase()} ${userData.lastName
//                 ?.charAt(0)
//                 .toUpperCase()}${userData.lastName?.slice(1).toLowerCase()}`
//             ) : (
//               <div className="w-40 h-6 bg-gray-300 animate-pulse rounded"></div>
//             )}
//           </h1>

//           {/* Description Section */}
//           <p className="text-center text-gray-600 mt-2">
//             {userData ? (
//               "Welcome to my scheduling page. Please select an event below to book a call with me."
//             ) : (
//               <div className="w-96 h-4 bg-gray-300 animate-pulse rounded"></div>
//             )}
//           </p>
//         </div>

//         {/* Events Section */}
//         {loading ? (
//           <SkeletonCard />
//         ) : events ? (
//           events.length === 0 ? (
//             <div className="flex justify-center">
//               <p className="text-center text-gray-500">
//                 No public events available
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
//               {events.map((event, index) => (
//                 <EventCard
//                   key={index}
//                   event={event}
//                   isPublicPage={true}
//                   handleEventPage={handleEventPage}
//                 />
//               ))}
//             </div>
//           )
//         ) : (
//           <div className="w-full text-center text-gray-500">
//             Loading events...
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default UserPage;

import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";
import axios from "axios";

const UserPage = () => {
  const [events, setEvents] = useState([]); // State to store events
  const { id } = useParams();
  const [userData, setUserData] = useState(null as any); // Initialize as null for better handling
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const eventId = searchParams.get("eventId");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://dev.cal.litschool.in/events/${id}?eventId=${eventId}`
        );
        setUserData(response.data.userData);
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [id, eventId]);

  const handleEventPage = (eventId: any, eventName: string) => {
    navigate(`/${id}/${eventName}?&userId=${1234444}&eventId=${eventId}`);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {/* User Info Section */}
      <div className="flex flex-col items-center mb-8">
        {/* Profile Image Section */}
        <div className="w-28 h-28 rounded-full overflow-hidden mb-4 bg-gray-50 flex items-center justify-center">
          {loading ? (
            <div className="w-28 h-28 rounded-full bg-gray-300 animate-pulse"></div>
          ) : userData?.profileImageUrl ? (
            <img
              src={userData.profileImageUrl}
              className="w-full h-full object-cover"
              alt="Profile"
            />
          ) : (
            <div className="text-gray-800 text-2xl font-bold">
              {userData?.firstName?.slice(0, 2).toUpperCase() || ""}
            </div>
          )}
        </div>

        {/* Name Section */}
        <h1 className="text-xl font-semibold text-gray-800">
          {loading ? (
            <div className="w-40 h-6 bg-gray-300 animate-pulse rounded"></div>
          ) : userData ? (
            `${userData.firstName?.charAt(0).toUpperCase()}${userData.firstName
              ?.slice(1)
              .toLowerCase()} ${userData.lastName
              ?.charAt(0)
              .toUpperCase()}${userData.lastName?.slice(1).toLowerCase()}`
          ) : (
            "Name not available"
          )}
        </h1>

        {/* Description Section */}
        <p className="text-center text-gray-600 mt-2">
          {loading ? (
            <div className="w-96 h-4 bg-gray-300 animate-pulse rounded"></div>
          ) : userData ? (
            "Welcome to my scheduling page. Please select an event below to book a call with me."
          ) : (
            "Description not available"
          )}
        </p>
      </div>

      {/* Events Section */}
      {loading ? (
        <SkeletonCard />
      ) : events.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-center text-gray-500">
            No public events available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {events.map((event, index) => (
            <EventCard
              key={index}
              event={event}
              isPublicPage={true}
              handleEventPage={handleEventPage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
