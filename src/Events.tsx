import { useEffect, useState } from "react";
import LinkPart from "./LinkPart";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "./config/http";
import { Plus } from "lucide-react";
import { effectAdd } from "./app-store/eventSlice";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./components/ui/dialog";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import * as Yup from "yup";
import { addEventData } from "./app-store/eventSlice";

// Yup Validation Schema
const validationSchema = Yup.object({
  eventTitle: Yup.string().required("Event Title is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.number()
    .required("Duration is required")
    .positive("Duration must be a positive number")
    .integer("Duration must be an integer"),
  eventPrivacy: Yup.string()
    .oneOf(
      ["public", "private"],
      "Event Privacy must be either 'public' or 'private'"
    )
    .required("Event Privacy is required"),
});
const Events = () => {
  const effectData = useSelector((state: any) => state.event.effectState);
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.registration.userData);
  const eventData = useSelector((state: any) => state.event.eventData);
  console.log(eventData, "event");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
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
      setIsModalOpen(false);
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
      {eventData.length === 0 ? (
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

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500">
                <span className="flex gap-1 text-sm">
                  {" "}
                  <Plus size={16} className="mt-0.5" /> New event type
                </span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] lg:w-1/2">
              <DialogHeader>
                <h2 className="text-center">Create Event</h2>
              </DialogHeader>
              <Formik
                initialValues={{
                  eventTitle: "",
                  description: "",
                  duration: "",
                  eventPrivacy: "public",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                  handleSubmit(values);
                }}
              >
                {({ isSubmitting }: any) => (
                  <Form>
                    <div className="grid gap-4 py-4">
                      {/* Event Title */}
                      <div>
                        <div>
                          <Label htmlFor="eventTitle" className="text-right">
                            Event Title
                          </Label>
                        </div>
                        <Field
                          id="eventTitle"
                          name="eventTitle"
                          type="text"
                          className="col-span-4 p-2 border rounded-md w-full"
                        />
                        <ErrorMessage
                          name="eventTitle"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      {/* Description */}

                      {/* Duration */}
                      <div>
                        <div>
                          <Label htmlFor="duration" className="text-right">
                            Duration (minutes)
                          </Label>
                        </div>
                        <Field
                          id="duration"
                          name="duration"
                          type="number"
                          className="w-full p-2 border rounded-md"
                        />
                        <ErrorMessage
                          name="duration"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>

                      {/* Event Privacy */}
                      <div>
                        <Label htmlFor="eventPrivacy" className="text-right">
                          Event Privacy
                        </Label>
                        <Field
                          as="select"
                          id="eventPrivacy"
                          name="eventPrivacy"
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="public">Public</option>
                          <option value="private">Private</option>
                        </Field>
                        <ErrorMessage
                          name="eventPrivacy"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                      <div>
                        <div>
                          <Label htmlFor="description" className="text-right">
                            Description
                          </Label>
                        </div>
                        <Field
                          id="description"
                          name="description"
                          as="textarea" // Use "textarea" to render a proper text area
                          className="w-full p-2 h-24 border rounded-md"
                        />
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <DialogFooter className="flex items-center">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 hover:bg-blue-500"
                      >
                        {isSubmitting ? "Submitting..." : "Create Event"}
                      </Button>
                    </DialogFooter>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        // Main content if events exist
        <>
          <div className="mt-16">
            <div className="flex justify-between">
              <header className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                  Welcome, {userData?.firstName}
                </h1>
              </header>
            </div>
            <div>
              {/* Add your main content here */}
              <p className="text-gray-500 font-semibold text-lg">
                Create your events,
              </p>
            </div>
            <LinkPart />
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
