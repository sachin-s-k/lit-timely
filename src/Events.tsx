import { useEffect, useState } from "react";

import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./config/http";
import { Plus } from "lucide-react";
import { effectAdd } from "./app-store/eventSlice";

import { addEventData } from "./app-store/eventSlice";
import { useNavigate } from "react-router-dom";

// Yup Validation Schema

const Events = () => {
  const navigate = useNavigate();
  const effectData = useSelector((state: any) => state.event.effectState);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.registration.userData);
  const eventData = useSelector((state: any) => state.event.eventData);
  console.log(eventData, "event");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message state
  const [isSubmittings, setIsSubmitting] = useState(false);
  //const [events, setEvents] = useState([]); // State to store events
  console.log(errorMessage, isSubmittings);

  const handleSubmit = async (values: any) => {
    dispatch(effectAdd(false));
    setIsSubmitting(true);
    try {
      // Send data to backend using Axios
      const response = await axiosInstance.post("/events", values);
      console.log("Event created successfully:", response.data.data);
      //dispatch(addEventData(response.data.data));
      // Close the modal after successful creation

      setErrorMessage(null);
      setIsSubmitting(false);
      dispatch(effectAdd(true));

      // Clear error message if event creation was successful
    } catch (error) {
      console.error("Error creating event:", error);
      setIsSubmitting(false);
      // Set the error message to be displayed in the modal
      setErrorMessage(
        "An error occurred while creating the event. Please try again."
      );
    }
  };

  useEffect(() => {
    console.log("called");

    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(
          `/events/${userData.personalUrl}`
        );
        dispatch(addEventData(response.data.data));

        //setEvents(response.data); // Assuming the response contains event data
        console.log(response, "eree");
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };
    fetchEvents();
  }, [effectData]);

  return (
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
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500"
            onClick={() => {
              navigate("/create/new-events");
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
              {eventData?.map((event: any, index: any) => (
                <EventCard key={index} event={event} isPublicPage={false} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Events;
