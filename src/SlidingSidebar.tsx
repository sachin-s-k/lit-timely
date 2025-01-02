import "react-day-picker/dist/style.css";
import { addDays } from "date-fns";
import { ThreeDots } from "react-loader-spinner";
import { ChevronLeft, Clock, FileText, Globe2Icon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useEffect, useState } from "react";
import Testing from "./Testing";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "./config/http";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EventScheduler = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  console.log(eventId);
  //const [eventData, setEventData] = useState([] as any);
  //let eventData;
  useEffect(() => {
    const fetchingEditData = async () => {
      const editEventdata = await axiosInstance.get(
        `/events/event-data/${eventId}`
      );
      console.log(editEventdata);
      setEventName(editEventdata.data.data.eventName);
      setEventDuration(editEventdata.data.data.eventDuration);
      setDescription(editEventdata.data.data.eventDescription);
      // setEventData(editEventdata.data.data.availability);

      console.log(editEventdata.data.data.availability, "eee&&&");

      //eventData = editEventdata.data.data.availability;
    };

    fetchingEditData();
  }, [eventId]);

  const userData = useSelector((state: any) => state.registration.userData);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loader state

  // const setEventDays = (updatedEventData) => {

  // };

  const eventData = [
    {
      isAvailable: false,
      timeSlots: [
        {
          start: "",
          end: "",
          error: "",
        },
      ],
    },
    {
      isAvailable: false,
      timeSlots: [
        {
          start: "9:00am",
          end: "5:00pm",
          error: "",
        },
      ],
    },
    {
      isAvailable: false,
      timeSlots: [
        {
          start: "9:00am",
          end: "5:00pm",
          error: "",
        },
      ],
    },
    {
      isAvailable: true,
      timeSlots: [
        {
          start: "9:00am",
          end: "5:00pm",
          error: "",
        },
      ],
    },
    {
      isAvailable: true,
      timeSlots: [
        {
          start: "9:00am",
          end: "5:00pm",
          error: "",
        },
      ],
    },
    {
      isAvailable: false,
      timeSlots: [
        {
          start: "",
          end: "",
          error: "",
        },
      ],
    },
    {
      isAvailable: true,
      timeSlots: [
        {
          start: "9:00am",
          end: "5:00pm",
          error: "",
        },
      ],
    },
  ];
  const slots = [
    "9:00am",
    "10:00am",
    "11:00am",
    "12:00am",
    "1:00am",
    "2:00am",
    "2:30am",
  ];
  const [availableDays, setAvailableDays] = useState([]);
  const [next30AvailableDays, setNext30AvailableDays] = useState([]);
  const [eventDatas, setEventDatas] = useState(eventData);

  // Function to update eventDatas and reflect changes on the calendar
  const setEventDays = (updatedEventData: any) => {
    setEventDatas([]);
    setLoading(true); // Show loader
    setTimeout(() => {
      console.log(updatedEventData, "updated eventData====");

      // Simulate a delay
      setEventDatas(updatedEventData); // Update calendar data
      setLoading(false); // Hide loader
    }, 1000);
  };

  // Calculate available weekdays based on eventDatas
  useEffect(() => {
    const daysMapping = eventDatas
      .map((event, index) => (event.isAvailable ? index : null))
      .filter((day) => day !== null); // Remove nulls
    setAvailableDays(daysMapping as any);
  }, [eventDatas]);

  // Calculate the next 30 available days
  useEffect(() => {
    const generateNext30AvailableDays = () => {
      const result: any = [];
      let currentDate: Date = new Date();

      while (result.length < 60) {
        if ((availableDays as any).includes(currentDate.getDay())) {
          result.push(new Date(currentDate)); // Add copy of the date
        }
        currentDate = addDays(currentDate, 1);
      }

      setNext30AvailableDays(result);
    };

    if (availableDays.length > 0) {
      generateNext30AvailableDays();
    } else {
      setNext30AvailableDays([]); // Reset if no available days
    }
  }, [availableDays]);

  const modifiers: any = {
    available: next30AvailableDays,
    today: new Date(),
    day: {
      color: "gray", // Set the color of all days to gray
    },
  };
  const styles = {
    day: {
      color: "#6b7280", // Tailwind 'gray-500' for unmodified dates
    },
  };
  const modifiersStyles = {
    available: {
      backgroundColor: "#dbeafe",
      color: "#3b82f6",
      borderRadius: "50%",
    },
    today: {
      color: "#1d4ed8",
      fontWeight: "",
    },
    day: {
      color: "gray", // Set the color of all days to gray
    },
  };

  // fotrm

  const [eventName, setEventName] = useState("");
  const [eventDuration, setEventDuration] = useState("");
  const [description, setDescription] = useState("");
  //const [eventDays, setEventDays] = useState([]);
  const [errors, setErrors] = useState({
    eventName: "",
    eventDuration: "",
    description: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      eventName: "",
      eventDuration: "",
      description: "",
    };

    // Validate Event Name
    if (!eventName.trim()) {
      newErrors.eventName = "Event Name is required";
      valid = false;
    }

    // Validate Event Duration
    if (!eventDuration.trim()) {
      newErrors.eventDuration = "Event Duration is required";
      valid = false;
    } else if (isNaN(eventDuration as any)) {
      newErrors.eventDuration = "Event Duration must be a valid number";
      valid = false;
    }

    // Validate Description
    if (!description.trim()) {
      newErrors.description = "Description is required";
      valid = false;
    }

    // Validate Weekdays
    // if (eventDays.length === 0) {
    //   newErrors.eventDays = "At least one day must be selected";
    //   valid = false;
    // }

    setErrors(newErrors);
    return valid;
  };

  const [currentISTTime, setCurrentISTTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();

      // Convert the current time to IST (GMT+5:30)
      const istOffset = 330; // IST is UTC+5:30 in minutes
      const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
      const istTime = new Date(utcTime + istOffset * 60000);

      // Format the IST time as hh:mm AM/PM
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formattedTime = istTime.toLocaleTimeString("en-IN", options as any);
      setCurrentISTTime(formattedTime);
    };

    // Call immediately to avoid lag
    updateTime();

    // Calculate delay to the next exact minute
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000;

    // Set a timeout for the first update at the next minute
    const timeout = setTimeout(() => {
      updateTime();

      // After the first update, set an interval to update every minute
      const interval = setInterval(updateTime, 60000);

      // Cleanup interval on unmount
      return () => clearInterval(interval);
    }, delay);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeout);
  }, []);

  //new test

  const [globalErrors, setGlobalErrors] = useState<string[]>([]);
  const [otherErrors, setOtherErrors] = useState<string[]>([]);

  // Callback function to handle errors from the Testing component
  const handleErrors = (errorList: string[], otherErrorList: any) => {
    setOtherErrors(otherErrorList);
    setGlobalErrors(errorList);
  };
  //new test

  // validation errors duration and availabilty

  const validateEventData = (data: any, duration: any) => {
    let errors: any = [];
    let isValid = true;

    data.forEach((day: any, dayIndex: any) => {
      if (!day.isAvailable) return; // Skip unavailable days

      day.timeSlots.forEach((slot: any, _slotIndex: any) => {
        const startMinutes = timeToMinutes(slot.start);
        const endMinutes = timeToMinutes(slot.end);

        if (endMinutes - startMinutes < duration) {
          isValid = false;
          errors.push(
            `Error: Slot from ${slot.start} to ${slot.end} on day ${
              dayIndex + 1
            } must be at least ${duration} minutes.`
          );
        }
      });
    });

    return { isValid, errors };
  };

  // Utility function to convert time to total minutes
  const timeToMinutes = (time: any) => {
    const [_, hours, minutes, meridian] = time.match(
      /(\d{1,2}):(\d{2})(am|pm)/
    );
    let totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
    if (meridian.toLowerCase() === "pm" && hours !== "12") {
      totalMinutes += 12 * 60;
    } else if (meridian.toLowerCase() === "am" && hours === "12") {
      totalMinutes -= 12 * 60;
    }
    return totalMinutes;
  };

  const [validationErrors, setValidationErrors] = useState([]);

  const handleValidation = () => {
    console.log("called");

    const { isValid, errors } = validateEventData(eventDatas, eventDuration);
    setValidationErrors(errors);
    return isValid; // Return true if valid, false otherwise
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (validateForm()) {
      if (globalErrors.length == 0) {
        console.log(otherErrors, "otherrrr");

        if (otherErrors.length == 0) {
          console.log("other");

          if (handleValidation()) {
            console.log("Form submitted", {
              eventName,
              eventDuration,
              description,
              eventDatas,
            });

            try {
              toast.loading("Your Event is Creating....");

              const response = await axiosInstance.post("/events/", {
                eventName,
                eventDuration,
                eventDescription: description,
                availability: eventDatas,
              });

              if (response.data.success) {
                toast.dismiss();
                toast.success("Your event was created successfully!", {});
                navigate("/events/user");
              } else {
                toast.dismiss();
                setTimeout(() => {
                  toast.error("There is an error!", {});
                }, 2000);
              }
            } catch (error: any) {}
          }
        }
      }
      // Submit form data
    }
  };
  return (
    <>
      <div
        className={`flex bg-gray-100  ${
          slots && slots.length > 0 ? "" : "justify-between gap-40"
        }`}
      >
        {/* Sidebar with Fixed Width */}
        <div className="w-[680px] h-screen overflow-y-scroll bg-white shadow-md p-6 flex flex-col  justify-between">
          {/* Form Header */}
          <div className="mt-2 mb-1 flex cursor-pointer">
            <ChevronLeft color="#3b82f6" size={17} className="mt-1" />
            <span
              className="font-semibold text-blue-500"
              onClick={() => {
                navigate("/events/user/");
              }}
            >
              {" "}
              Back
            </span>
          </div>
          <div className="flex justify-between items-center border-blue-500 pt-4 pb-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Create Your Event Type
            </h2>
          </div>

          {/* Form Content */}
          <div className="space-y-6 flex-grow">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Name
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter event name"
              />
              {errors.eventName && (
                <p className="text-red-500 text-sm">{errors.eventName}</p>
              )}
            </div>

            {/* Event Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Duration
              </label>
              <input
                type="text"
                value={eventDuration}
                onChange={(e) => setEventDuration(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter event duration in minutes"
              />
              {errors.eventDuration && (
                <p className="text-red-500 text-sm">{errors.eventDuration}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded-md"
                rows={4}
                placeholder="Enter event description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>

            {/* Weekday Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Select Weekdays
              </h3>
              <Testing
                update={false}
                eventDays={eventDatas}
                setEventDays={setEventDays}
                onError={handleErrors}
              />
              {/* {errors.eventDays && (
          <p className="text-red-500 text-sm">{errors.eventDays}</p>
        )} */}
            </div>
          </div>
          {/* Display only the global error for "at least one day" */}
          {globalErrors.length > 0 && (
            <div className="error-messages text-red-500">
              {globalErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          {/* Display only the global error for "at least one day" */}

          {/* time and duration validation errrors */}
          {validationErrors.length > 0 && (
            <div className="text-red-500 text-sm mt-4">
              {validationErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
          {/* Buttons */}
          <div className="flex gap-5 cursor-pointer mt-6">
            <button className="text-gray-600 py-2 rounded-full transition duration-200 w-full">
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white py-2 px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
            >
              Save and Close
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-screen w-full bg-gray-100 p-4 ">
          {/* Preview Section */}
          <div
            className={`transition-all duration-300 ${
              slots && slots.length > 0 ? "w-2/5" : "w-[356px]"
            } bg-white p-6 shadow-md rounded-l-md flex flex-col border-r border-gray-200`}
          >
            <h3 className="text-md font-semibold text-gray-500">
              {userData.firstName + " " + userData.lastName}
            </h3>
            <div className="mb-4 flex items-start">
              <h3 className="text-3xl font-semibold text-gray-700  break-words max-w-[360px]">
                {eventName || "Event Name here"}
              </h3>
            </div>
            <p className="mb-2 flex items-start">
              <div className="flex-shrink-0 mt-0.5">
                <Clock size={20} color="gray" />
              </div>
              <span className="ml-2 text-gray-500 break-words max-w-[320px]">
                {eventDuration ? `${eventDuration} min` : "Event Duration"}
              </span>
            </p>
            <h3 className="mb-2 text-md text-gray-500 flex items-start break-words">
              <div className="flex-shrink-0 mt-0.5">
                <FileText size={20} color="gray" className="text-gray-600" />
              </div>
              <span className="ml-2 text-gray-500 break-words max-w-[320px]">
                {description || "Event Description"}
              </span>
            </h3>
          </div>

          {/* Calendar Section */}
          <div
            className={`relative transition-all duration-300 ${
              slots && slots.length > 0 ? "w-3/5" : "w-fit"
            } bg-white p-6 shadow-md rounded-r-md flex flex-col border-gray-200`}
          >
            {loading && (
              <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-75 flex items-center justify-center z-10">
                <ThreeDots
                  height="80"
                  width="80"
                  radius="40"
                  color="gray"
                  ariaLabel="three-dots-loading"
                />
              </div>
            )}

            <div>
              <span className="font-bold text-xl text-gray-700">
                Select Date and Time
              </span>
            </div>

            {/* Calendar Component */}
            <div className="flex">
              <div>
                <DayPicker
                  modifiers={modifiers}
                  modifiersStyles={modifiersStyles}
                  styles={styles}
                />
                <div className="mt-6">
                  <div>
                    <span className="font-bold text-md">Time zone</span>
                  </div>
                  <div className="mt-1">
                    <span className="flex gap-1">
                      <Globe2Icon size={16} className="mt-1.5" />
                      <span className="text-sm font-sans mt-1">
                        Indian Standard Time ({currentISTTime})
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Slots Section */}
              {slots && slots.length > 0 && (
                <div className="m-3 flex-grow overflow-y-auto max-h-[calc(100vh-12rem)]">
                  {/* Add scroll and limit height */}
                  <div>
                    <span className="font-2xl text-gray-700">
                      Tuesday, December 14
                    </span>
                  </div>
                  {slots.map((slot, index) => {
                    return (
                      <div key={index} className="ml-1 w-44 mb-2 mr-4">
                        {" "}
                        {/* Added right margin */}
                        <div className="border border-blue-500 px-10 py-3 mt-4 flex flex-col items-center justify-center rounded-sm">
                          <div className="text-blue-600 font-semibold">
                            {slot}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",

          style: {
            background: "#fff",
            color: "#3b82f6",
            border: "",
            borderColor: "#3b82f6",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },
        }}
      />
    </>
  );
};

export default EventScheduler;
