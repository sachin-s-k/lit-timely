import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SkeletonCard from "./SkeletonCard";
import axios from "axios";

const UserPage = () => {
  interface UserData {
    profileImageUrl?: string; // Optional (may not exist)
    firstName?: string;
    lastName?: string;
  }
  const [events, setEvents] = useState([]);
  const { id } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true); // Initialize as true (loading by default)
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://cal.litschool.in/api/events/${id}?eventId=${eventId}&isPublic=true`
        );
        setUserData(response.data.userData);
        setEvents(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch (success or error)
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
              {`${userData?.firstName?.[0]?.toUpperCase() || ""}${
                userData?.lastName?.[0]?.toUpperCase() || ""
              }`}
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
            "Name not available" // Only shows if fetch failed (loading=false & userData=null)
          )}
        </h1>

        {/* Description Section */}
        <p className="text-center text-gray-600 mt-2">
          {loading ? (
            <div className="w-96 h-4 bg-gray-300 animate-pulse rounded"></div>
          ) : userData ? (
            "Welcome to my scheduling page. Please select an event below to book a call with me."
          ) : (
            "Description not available" // Only shows if fetch failed
          )}
        </p>
      </div>

      {/* Events Section */}
      {loading ? (
        <SkeletonCard /> // Shows skeleton while loading
      ) : events.length === 0 ? (
        <div className="flex justify-center">
          <p className="text-center text-gray-500">
            No public events available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {events
            .filter((event: any) => event.isPublic)
            .map((event, index) => (
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
