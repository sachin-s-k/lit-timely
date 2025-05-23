import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./config/http";
import { Plus } from "lucide-react";
import {
  addCategory,
  addEventData,
  clearCategories,
} from "./app-store/eventSlice";
import { useNavigate } from "react-router-dom";
import { addActiveNavState } from "./app-store/gloabalSlice";
import MeetingCard from "./MeetingCard";
import LinkPart from "./LinkPart";
import { ThreeDots } from "react-loader-spinner";

// Yup Validation Schema

const Events = () => {
  const navigate = useNavigate();
  const effectData = useSelector((state: any) => state.event.effectState);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.registration.userData);
  const eventData = useSelector((state: any) => state.event.eventData);

  const [searchTerm, setSearchTerm] = useState("");

  // Filtered Events
  const filteredEvents = eventData?.filter((event: any) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sendEventCategories = (data: any[]) => {
    // Extract `eventCategory` from the data array
    const eventCategories = data.map((item: any) => item.eventCategory);

    // Ensure categories are unique (optional)
    const uniqueCategories = Array.from(new Set(eventCategories));

    // Send the unique categories

    return uniqueCategories;
  };

  useEffect(() => {
    setLandingPageLoading(true);

    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(
          `/events/${userData.personalUrl}?isPublic=false`
        );
        dispatch(addEventData(response.data.data));
        setLandingPageLoading(false);
        const categoryData = sendEventCategories(response.data.data);

        dispatch(addCategory(categoryData));
      } catch (error) {}
    };
    fetchEvents();
  }, [effectData]);
  const handleSideBarNavigation = (index: any) => {
    // Dispatch the active navigation change
    if (index === 3) {
      dispatch(addActiveNavState(index));
      navigate("/events/types_list");
    }
  };

  const [landingPageLoading, setLandingPageLoading] = useState(false);
  // const userEventData = useSelector((state: any) => state.event.eventData);
  if (!eventData?.length) {
    dispatch(clearCategories());
  }

  return (
    <>
      {landingPageLoading ? (
        <div className="flex items-center justify-center h-screen">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#3b82f6"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      ) : (
        <>
          {eventData?.length >= 1 && (
            <div className="pt-6  p-0 pb-2 mt-20 pl-0">
              <header className="flex justify-between items-center w-full">
                <div>
                  {/* Welcome Message */}
                  <h2 className="text-2xl font-opensauce font-semibold text-gray-800">
                    {userData?.firstName
                      ? `Welcome, ${userData.firstName}!`
                      : "Welcome!"}
                  </h2>
                  {/* Personal URL Link */}
                  <a
                    href={`https://cal.litschool.in/${userData?.personalUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block font-opensauce text-blue-500 text-sm"
                  >
                    {`https://cal.litschool.in/${userData?.personalUrl}`}
                  </a>
                </div>

                {/* Search Bar - Adjusted to stretch properly */}
                <div className="relative flex items-center max-w-[300px] w-full border border-gray-300 rounded-md px-4 py-3.5 text-sm focus-within:ring-2 focus-within:ring-blue-500">
                  {/* Search Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1117.5 10.5 7.5 7.5 0 0116.65 16.65z"
                    />
                  </svg>
                  {/* Input Field */}
                  <input
                    type="text"
                    placeholder="Search by event name..."
                    className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </header>

              {/* Divider */}
              <hr className="my-6 border-t border-gray-300" />

              {/* Additional Component */}
              <LinkPart />
            </div>
          )}

          <div>
            {eventData?.length === 0 ? (
              // Centered content when no events exist
              <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center">
                <img
                  src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/application_resource/calendar.svg"
                  alt="calendar"
                  className="w-32 h-32 mb-4"
                />
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  Create scheduling links with event types
                </h1>
                <p className="text-gray-600 font-extralight">
                  Create event types for meetings you'll want to schedule
                  regularly, like product demos,
                </p>
                <p className="text-gray-600 mb-4 font-extralight">
                  customer calls, office hours, and more.
                </p>

                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-500"
                  onClick={() => {
                    handleSideBarNavigation(3);
                  }}
                >
                  <span className="flex gap-1 text-sm">
                    <Plus size={16} className="mt-0.5" /> New event type
                  </span>
                </button>
              </div>
            ) : (
              // Main content if events exist
              <>
                <div className="grid md:grid-cols-3 gap-6 w-full max-w-[1200px] mx-auto">
                  {filteredEvents?.length > 0 ? (
                    filteredEvents.map((event: any, index: any) => (
                      <MeetingCard key={index} events={event} />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-[calc(70vh-8rem)] ml-96 w-full text-center">
                      <p className="text-md text-gray-500">No results found.</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Events;
