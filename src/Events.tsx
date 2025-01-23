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
  console.log(eventData, "event");

  const [searchTerm, setSearchTerm] = useState("");

  // Filtered Events
  const filteredEvents = eventData.filter((event: any) =>
    event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state
  // const [isSubmittings, setIsSubmitting] = useState(false);
  //const [events, setEvents] = useState([]); // State to store events
  // console.log(errorMessage, isSubmittings);

  // const handleSubmit = async (values: any) => {
  //   dispatch(effectAdd(false));
  //   setIsSubmitting(true);
  //   try {
  //     // Send data to backend using Axios
  //     const response = await axiosInstance.post("/events", values);
  //     console.log("Event created successfully:", response.data.data);
  //     //dispatch(addEventData(response.data.data));
  //     // Close the modal after successful creation

  //     setErrorMessage(null);
  //     setIsSubmitting(false);
  //     dispatch(effectAdd(true));

  //     // Clear error message if event creation was successful
  //   } catch (error) {
  //     console.error("Error creating event:", error);
  //     setIsSubmitting(false);
  //     // Set the error message to be displayed in the modal
  //     setErrorMessage(
  //       "An error occurred while creating the event. Please try again."
  //     );
  //   }
  // };

  const sendEventCategories = (data: any[]) => {
    // Extract `eventCategory` from the data array
    const eventCategories = data.map((item: any) => item.eventCategory);

    // Ensure categories are unique (optional)
    const uniqueCategories = Array.from(new Set(eventCategories));

    // Send the unique categories
    console.log("Event Categories to send:", uniqueCategories);

    return uniqueCategories;
  };

  useEffect(() => {
    console.log("called");
    setLandingPageLoading(true);

    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(
          `/events/${userData.personalUrl}`
        );

        dispatch(addEventData(response.data.data));
        setLandingPageLoading(false);
        //setEvents(response.data); // Assuming the response contains event data
        console.log(response, "eree");
        const categoryData = sendEventCategories(response.data.data);
        console.log(categoryData, "cateeeeeeee===================");

        dispatch(addCategory(categoryData));
      } catch (error) {
        console.error("Error fetching events", error);
      }
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
  const userEventData = useSelector((state: any) => state.event.eventData);
  if (!eventData.length) {
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
          {eventData.length >= 1 && (
            <div className="p-6 pb-2 mt-24 pl-0">
              {/* Welcome Message */}
              <header className="flex justify-between items-center mb-6 ">
                <h1 className="text-3xl font-bold text-gray-800">
                  {/* Welcome, {userData.firstName}! */}
                  Event Types
                </h1>
              </header>{" "}
              <div className="relative flex items-center w-60 border border-gray-300 rounded-md px-4 py-3.5 text-sm focus-within:ring-2 focus-within:ring-blue-400 mt-9">
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
                  placeholder="Filter..."
                  className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <LinkPart />
              {/* Search Bar */}
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
                <p className="text-gray-600  font-extralight">
                  Create event types for meetings you'll want to schedule
                  regularly,like product demos,
                </p>
                <p className="text-gray-600 mb-4  font-extralight">
                  customer calls, office hours, and more.
                </p>

                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-500"
                  onClick={() => {
                    handleSideBarNavigation(3);
                  }}
                >
                  <span className="flex gap-1 text-sm">
                    {" "}
                    <Plus size={16} className="mt-0.5" /> New event type
                  </span>
                </button>

                {/* Submit Button */}
              </div>
            ) : (
              // Main content if events exist
              <>
                <div>
                  <div className="grid md:grid-cols-3 gap-3">
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map((event: any, index: any) => (
                        <MeetingCard key={index} events={event} />
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 mt-4">
                        No results found.
                      </p>
                    )}
                  </div>
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
