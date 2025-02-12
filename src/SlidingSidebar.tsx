import "react-day-picker/dist/style.css";
import { addDays, format } from "date-fns";
import { ColorRing, ThreeDots } from "react-loader-spinner";
import { ChevronLeft, Clock, FileText, Globe2Icon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useEffect, useState } from "react";
import Testing from "./Testing";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "./config/http";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addActiveNavState } from "./app-store/gloabalSlice";

const EventScheduler = () => {
  const [bookingGap, setBookingGap] = useState(0); // Stores the selected or custom gap
  const [isGapDropdownVisible, setGapDropdownVisible] = useState(false);
  const predefinedGaps = ["5", "10", "15"]; // Predefined gaps in minutes

  const handleGapInputChange = (value: any) => {
    setBookingGap(value); // Update bookingGap with custom input
  };

  const handleSelectGap = (gap: any) => {
    setBookingGap(gap); // Update bookingGap with selected value
    setDropdownVisible(false); // Hide dropdown after selection
  };
  // const categoryData: any = useSelector(
  //   (state: any) => state.event.categoryData
  // );

  // const predefinedCategories = [
  //   "General",
  //   "Litmus Test Review",
  //   "Application Test Review",
  //   "Seminar",
  //   "Workshop",
  //   "Networking",
  //   "Webinar",
  //   "Panel Discussion",
  //   "Training Session",
  //   "Product Launch",
  // ];
  // const uniquePredefinedCategories = predefinedCategories.filter(
  //   (category: any) =>
  //     category === "General" || !categoryData.includes(category)
  // );
  // const [eventCategory, setEventCategory] = useState("General"); // Holds both predefined and custom categories

  const categoryData: any = useSelector(
    (state: any) => state.event.categoryData
  );

  const predefinedCategories = [
    "General",
    "Litmus Test Review",
    "Application Test Review",
    "Webinar",
    "Panel Discussion",
    "Training Session",
  ];

  // Filter predefined categories based on categoryData
  const uniquePredefinedCategories = predefinedCategories.filter((category) => {
    // Show "Litmus Test Review" and "Application Test Review" only if they are NOT in categoryData
    if (
      category === "Litmus Test Review" ||
      category === "Application Test Review"
    ) {
      return !categoryData.includes(category);
    }
    // Include all other categories
    return true;
  });

  const [eventCategory, setEventCategory] = useState("General");
  console.log("rendering");
  const [isCatDropdownVisible, setCatDropdownVisible] = useState(false);

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const predefinedDurations = ["15", "30", "45", "60", "90", "120"];

  const [eventDuration, setEventDuration] = useState("");
  const [isSlotLoading, setSlotIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [orgSelectedDate, setOrgSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState([]);
  const [orgData, setOrgData] = useState([] as any);
  const dispatch = useDispatch();
  // const handleSlots = () => {
  //   console.log("enterrrr{{{{{{{");

  //   const timeSlots = selectedDate
  //     ? orgData.find(
  //         (day: any) => day.eventDate === format(selectedDate, "yyyy-MM-dd")
  //       )?.slots || []
  //     : [];

  //   setSlots(timeSlots);
  //   setOrgSelectedDate(selectedDate);
  //   setIsPreview(true);
  // };

  // const handleSlots = (clickedDate?: Date) => {
  //   console.log("Fetching slots for:handleSLots", clickedDate);
  //   console.log(orgData, "or");

  //   const timeSlots = clickedDate
  //     ? orgData.find((day: any) => {
  //         day.eventDate === format(clickedDate, "yyyy-MM-dd");
  //       })?.slots || []
  //     : [];
  //   // setSlots(timeSlots);
  //   // setSlotIsLoading(false);

  //   // setOrgSelectedDate(clickedDate || selectedDate);
  //   // setIsPreview(true);
  //   setTimeout(() => {
  //     setSlotIsLoading(false); // Stop loading
  //     setSlots(timeSlots); // Update slots
  //     setOrgSelectedDate(clickedDate || selectedDate);
  //     setIsPreview(true);
  //   }, 5000);
  // };
  const handleSlots = (clickedDate?: Date) => {
    // console.log("Fetching slots for:", clickedDate);
    // console.log(orgData, "orgData=======>");
    // if (!orgData || orgData.length === 0) {
    //   console.log("Waiting for orgData to be loaded...");
    //   return; // Prevent further execution if orgData is not loaded
    // }
    const timeSlots = clickedDate
      ? orgData.find(
          (day: any) => day.eventDate === format(clickedDate, "yyyy-MM-dd")
        )?.slots || []
      : [];

    // setSlotIsLoading(false); // Start the loading indicator

    // Simulating the loading delay and then updating the state
    // setTimeout(() => {
    //   setSlotIsLoading(false); // Stop the loader
    //   setSlots(timeSlots); // Update the slots
    //   setOrgSelectedDate(clickedDate || selectedDate);
    //   setIsPreview(true);
    // }, 2000);

    setSlotIsLoading(false); // Stop the loader
    setSlots(timeSlots); // Update the slots
    setOrgSelectedDate(clickedDate || selectedDate);
    setIsPreview(true);
  };
  const [restrictedCategory, setRestrictedCategory] = useState("");
  // let eventData = [
  //   {
  //     isAvailable: true,
  //     timeSlots: [
  //       {
  //         start: "",
  //         end: "",
  //         error: "",
  //       },
  //     ],
  //   },
  //   {
  //     isAvailable: false,
  //     timeSlots: [
  //       {
  //         start: "9:00am",
  //         end: "5:00pm",
  //         error: "",
  //       },
  //     ],
  //   },
  //   {
  //     isAvailable: false,
  //     timeSlots: [
  //       {
  //         start: "9:00am",
  //         end: "5:00pm",
  //         error: "",
  //       },
  //     ],
  //   },
  //   {
  //     isAvailable: true,
  //     timeSlots: [
  //       {
  //         start: "9:00am",
  //         end: "5:00pm",
  //         error: "",
  //       },
  //     ],
  //   },
  //   {
  //     isAvailable: true,
  //     timeSlots: [
  //       {
  //         start: "9:00am",
  //         end: "5:00pm",
  //         error: "",
  //       },
  //     ],
  //   },
  //   {
  //     isAvailable: false,
  //     timeSlots: [
  //       {
  //         start: "",
  //         end: "",
  //         error: "",
  //       },
  //     ],
  //   },
  //   {
  //     isAvailable: true,
  //     timeSlots: [
  //       {
  //         start: "9:00am",
  //         end: "5:00pm",
  //         error: "",
  //       },
  //     ],
  //   },
  // ];
  // const slots = ["dd"];

  // const [eventData, setEventData] = useState([]);
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  //const [editEventDays, setEditEventDays] = useState();
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
      setEventCategory(editEventdata.data.data.eventCategory);
      setRestrictedCategory(editEventdata.data.data.eventCategory);
      setBookingGap(editEventdata.data.data.meetingGap);

      // setEventData(editEventdata.data.data.availability);
      //setEditEventDays(editEventdata.data.data.availability);
      //console.log(editEventdata.data.data.availability, "eee&&&");
      //dispatch(addCategory([]));
      // eventData = editEventdata.data.data.availability;
      //setEventData(editEventdata.data.data.availability);
      //eventData = editEventdata.data.data.availability;
      console.log(eventData, "here");
    };

    fetchingEditData();
  }, [eventId]);

  const userData = useSelector((state: any) => state.registration.userData);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loader state

  // const setEventDays = (updatedEventData) => {

  // };

  let eventData = [
    {
      isAvailable: true,
      timeSlots: [
        {
          start: "10:30am",
          end: "6:00pm",
          error: "",
        },
      ],
    },
    {
      isAvailable: true,
      timeSlots: [
        {
          start: "10:30am",
          end: "6:00pm",
          error: "",
        },
      ],
    },
    {
      isAvailable: true,
      timeSlots: [
        {
          start: "10:30am",
          end: "6:00pm",
          error: "",
        },
      ],
    },
    {
      isAvailable: true,
      timeSlots: [
        {
          start: "10:30am",
          end: "6:00pm",
          error: "",
        },
      ],
    },
    {
      isAvailable: true,
      timeSlots: [
        {
          start: "10:30am",
          end: "6:00pm",
          error: "",
        },
      ],
    },
    {
      isAvailable: true,
      timeSlots: [
        {
          start: "10:30am",
          end: "6:00pm",
          error: "",
        },
      ],
    },
    {
      isAvailable: true,
      timeSlots: [
        {
          start: "10:30am",
          end: "6:00pm",
          error: "",
        },
      ],
    },
  ];

  const [availableDays, setAvailableDays] = useState([]);
  const [next30AvailableDays, setNext30AvailableDays] = useState([]);
  const [eventDatas, setEventDatas] = useState(eventData);

  // Function to update eventDatas and reflect changes on the calendar
  const setEventDays = (updatedEventData: any) => {
    setSlots([]);
    setSlotIsLoading(false);
    setIsPreview(false);
    setOrgSelectedDate(null);
    setEventDatas([]);
    setLoading(true); // Show loader
    setTimeout(() => {
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
  }, [eventDatas, eventDuration]);

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

  const [description, setDescription] = useState("");
  //const [eventDays, setEventDays] = useState([]);
  const [errors, setErrors] = useState({
    eventName: "",
    eventDuration: "",
    description: "",
    gap: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      eventName: "",
      eventDuration: "",
      description: "",
      gap: "",
    };

    // Validate Event Name
    if (!eventName.trim()) {
      newErrors.eventName = "Event Name is required";
      valid = false;
      setIsPreview(false);
    }

    // Validate Event Duration
    console.log(eventDuration, "eve");

    if (!eventDuration) {
      newErrors.eventDuration = "Event Duration is required";
      valid = false;
    } else if (isNaN(eventDuration as any) || (eventDuration as any) <= 0) {
      newErrors.eventDuration =
        "Event Duration must be a valid positive number";
      valid = false;
      setIsPreview(false);
    } else if ((eventDuration as any) < 10) {
      newErrors.eventDuration = "Event Duration must be at least 10 minutes";
      valid = false;
      setIsPreview(false);
    } else if ((eventDuration as any) > 1439) {
      newErrors.eventDuration = "Event Duration must not exceed 1439 minutes";
      valid = false;
      setIsPreview(false);
    }

    // Validate Description
    if (bookingGap > 15) {
      newErrors.gap = "The booking gap must be less than 15";
      valid = false;
      setIsPreview(false);
    }
    if (description.split(/\s+/).filter(Boolean).length > 60) {
      newErrors.description = "The description must have 60 words or fewer.";
      valid = false;
      setIsPreview(false);
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

  // const validateEventData = (data: any, duration: any) => {
  //   console.log("calledddd");

  //   let errors: any = [];
  //   let isValid = true;

  //   data.forEach((day: any, dayIndex: any) => {
  //     if (!day.isAvailable) return; // Skip unavailable days

  //     day.timeSlots.forEach((slot: any, _slotIndex: any) => {
  //       const startMinutes: any = timeToMinutes(slot.start);
  //       const endMinutes: any = timeToMinutes(slot.end);
  //       console.log(startMinutes, endMinutes);

  //       console.log(endMinutes - startMinutes < duration, "conditionnnnnn");

  //       if (endMinutes - startMinutes < duration) {
  //         isValid = false;
  //         errors.push(
  //           `Error: Slot from ${slot.start} to ${slot.end} on day ${
  //             dayIndex + 1
  //           } must be at least ${duration} minutes.`
  //         );
  //       }
  //     });
  //   });

  //   return { isValid, errors };
  // };

  const validateEventData = (eventData: any, requiredDuration: any) => {
    let isValid = true;
    const errors: string[] = [];

    eventData.forEach((day: any, dayIndex: number) => {
      if (!day.isAvailable) {
        return; // Skip unavailable days
      }

      day.timeSlots.forEach((slot: any, slotIndex: number) => {
        const startMinutes: any = timeToMinutes(slot.start);
        const endMinutes: any = timeToMinutes(slot.end);

        // Check if start or end times are empty
        if (!slot.start || !slot.end) {
          isValid = false;
          errors.push(
            `Error: Missing start or end time for slot ${
              slotIndex + 1
            } on day ${dayIndex + 1}.`
          );
          slot.error = "Start and end times are required.";
          return;
        }

        // Validate start time within 12:00am to 11:59pm range
        if (startMinutes < 0 || startMinutes >= 1440) {
          isValid = false;
          errors.push(
            `Error: Start time ${slot.start} for slot ${slotIndex + 1} on day ${
              dayIndex + 1
            } is out of bounds.`
          );
          slot.error = "Start time must be between 12:00am and 11:59pm.";
        }

        // Validate end time within 12:00am to 12:00am of the next day
        if (endMinutes <= 0 || endMinutes > 1440) {
          isValid = false;
          errors.push(
            `Error: End time ${slot.end} for slot ${slotIndex + 1} on day ${
              dayIndex + 1
            } is out of bounds.`
          );
          slot.error = "End time must be between 12:00am and 11:59pm.";
        }

        // Ensure end time is after start time
        if (endMinutes <= startMinutes) {
          isValid = false;
          errors.push(
            `Error: End time ${slot.end} must be greater than start time ${
              slot.start
            } for slot ${slotIndex + 1} on day ${dayIndex + 1}.`
          );
          slot.error = "End time must be greater than start time.";
        }

        // Check if the slot duration meets the required duration
        const slotDuration = endMinutes - startMinutes;
        if (slotDuration < requiredDuration) {
          isValid = false;
          errors.push(
            `Error: Slot from ${slot.start} to ${slot.end} on day ${
              dayIndex + 1
            } must be at least ${requiredDuration} minutes.`
          );
          slot.error = `Slot duration is less than ${requiredDuration} minutes.`;
        }

        // Clear the error if the slot is valid
        if (isValid) {
          slot.error = "";
        }
      });
    });

    return { isValid, errors };
  };

  // Utility function to convert time to total minutes
  const timeToMinutes = (time: any) => {
    console.log(time, "+++++++");

    if (time) {
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
    }
  };

  const [validationErrors, setValidationErrors] = useState([]);

  const handleValidation = () => {
    console.log("handlevaliation");

    const { isValid, errors }: any = validateEventData(
      eventDatas,
      eventDuration
    );

    setValidationErrors(errors);
    return isValid; // Return true if valid, false otherwise
  };

  const handleInputChange = (value: any) => {
    setEventDuration(value); // Directly update eventDuration with the custom input

    // Validation for numeric custom duration
    if (value && !/^\d+$/.test(value)) {
      setErrors({
        eventDuration: "Please enter a valid number for duration.",
      } as any);
    } else if (value && Number(value) <= 0) {
      setErrors({ eventDuration: "Duration must be greater than 0." } as any);
    } else {
      setErrors({ eventDuration: "" } as any);
    }
  };

  const handleSelectDuration = (value: any) => {
    setEventDuration(value); // Update eventDuration with the selected value
    setDropdownVisible(false); // Hide the dropdown
    setErrors({ eventDuration: "" } as any); // Clear errors for valid selection
  };

  // const handleCategoryInputChange = (value: any) => {
  //   setEventCategory(value); // Directly update eventCategory with the custom input

  //   // Validation for custom category (optional)
  //   if (value && value.length > 50) {
  //     setErrors({
  //       eventCategory: "Category name must be less than 50 characters.",
  //     } as any);
  //   } else {
  //     setErrors({ eventCategory: "" } as any);
  //   }
  // };

  const handleSelectCategory = (value: any) => {
    setEventCategory(value); // Update eventCategory with the selected value
    setDropdownVisible(false); // Hide the dropdown
    setErrors({ eventCategory: "" } as any); // Clear errors for valid selection
  };

  const handleSubmit = async (
    edit: boolean,
    clickedDate?: any,
    dataSubmit?: boolean
  ) => {
    console.log("handle submit");
    const index: any = 0;
    if (validateForm()) {
      if (globalErrors.length === 0 && otherErrors.length === 0) {
        if (handleValidation()) {
          console.log("Form submitted", {
            eventName,
            eventDuration,
            description,
            eventDatas,
            eventId,
          });

          try {
            let response;
            if (dataSubmit) {
              toast.loading("Your Event is Creating....");
              response = await axiosInstance.post("/events?preview=false", {
                eventName,
                eventDuration,
                eventDescription: description,
                eventDatas,
                eventId,
                meetingGap: bookingGap,
                eventCategory: eventCategory,
              });
            } else {
              console.log("previewwwwwww tryeeeee");

              response = await axiosInstance.post("/events?preview=true", {
                eventName,
                eventDuration,
                eventDescription: description,
                eventDatas,
                eventId,
                meetingGap: bookingGap,
                eventCategory: eventCategory,
              });
            }

            if (response.data.success) {
              console.log(response.data);

              if (edit) {
                setSlotIsLoading(true);
                setOrgSelectedDate(clickedDate as any);
                // Pass the date directly
                setOrgData(response.data.data);
                // setTimeout(() => {
                //   handleSlots(clickedDate);
                // }, 2000);
              }
              if (dataSubmit) {
                navigate("/events/user/me");
                toast.dismiss();
                toast.success("Your event was created successfully!");

                dispatch(addActiveNavState(index));
              }
            } else {
              toast.dismiss();
              setTimeout(() => {
                toast.error("There is an error!");
              }, 2000);
            }
          } catch (error: any) {
            // console.error("Error:", error);
          }
        }
      }
    }
  };
  useEffect(() => {
    // This useEffect will monitor changes in orgData and selectedDate
    if (orgData && orgData.length > 0) {
      setTimeout(() => {
        handleSlots(selectedDate as any);
      }, 3000); // Call handleSlots once orgData and selectedDate are available
    }
  }, [orgData]);

  useEffect(() => {
    setOrgSelectedDate(null);
    setSlots([]);
    setSlotIsLoading(false);
    setIsPreview(false);
  }, [eventDuration, bookingGap]);

  const isRestricted = [
    "Litmus Test Review",
    "Application Test Review",
  ].includes(restrictedCategory);

  return (
    <>
      <div
        className={`flex bg-gray-100  ${
          orgSelectedDate ? "" : "justify-between gap-40"
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
                navigate("/events/user/me");
              }}
            >
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
            {/* <div>
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
            </div> */}

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Category
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={eventCategory}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => setCatDropdownVisible(true)}
                  onBlur={() => {
                    setTimeout(() => setCatDropdownVisible(false), 200); // Delay to handle selection
                  }}
                  placeholder="Enter or select a category"
                  className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {isCatDropdownVisible && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
                    {uniquePredefinedCategories?.map((category) => (
                      <li
                        key={category}
                        onClick={() => handleSelectCategory(category)}
                        className="p-2 cursor-pointer hover:bg-blue-100"
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {errors.eventCategory && (
                <p className="text-red-500 text-sm">{errors.eventCategory}</p>
              )}
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Category
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={eventCategory}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => setCatDropdownVisible(true)}
                  onBlur={() => {
                    setTimeout(() => setCatDropdownVisible(false), 200); // Delay to handle selection
                  }}
                  placeholder="Enter or select a category"
                  className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                {/* Message below the input box */}
                {isRestricted && (
                  <p className="mt-1 text-sm text-red-500">
                    This category is exclusive and cannot be changed.
                  </p>
                )}
                {isCatDropdownVisible && !isRestricted && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
                    {uniquePredefinedCategories?.map((category) => (
                      <li
                        key={category}
                        onClick={() => handleSelectCategory(category)}
                        className="p-2 cursor-pointer hover:bg-blue-100"
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Duration
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={eventDuration}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onFocus={() => setDropdownVisible(true)}
                  onBlur={() => {
                    setTimeout(() => setDropdownVisible(false), 200); // Delay to handle selection
                  }}
                  placeholder="Enter or select duration (minutes)"
                  className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {isDropdownVisible && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
                    {predefinedDurations.map((duration) => (
                      <li
                        key={duration}
                        onClick={() => handleSelectDuration(duration)}
                        className="p-2 cursor-pointer hover:bg-blue-100"
                      >
                        {duration} minutes
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {errors.eventDuration && (
                <p className="text-red-500 text-sm">{errors.eventDuration}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Gap
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={bookingGap}
                  onChange={(e) => handleGapInputChange(e.target.value)}
                  onFocus={() => setGapDropdownVisible(true)}
                  onBlur={() => {
                    setTimeout(() => setGapDropdownVisible(false), 200); // Delay to handle dropdown click
                  }}
                  placeholder="Enter or select gap (minutes)"
                  className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

                {isGapDropdownVisible && (
                  <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
                    {predefinedGaps.map((gap) => (
                      <li
                        key={gap}
                        onClick={() => handleSelectGap(gap)}
                        className="p-2 cursor-pointer hover:bg-blue-100"
                      >
                        {gap} minutes
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {errors.gap && (
                <p className="text-red-500 text-sm">{errors.gap}</p>
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
                eventId={eventId}
                update={false}
                eventDays={eventData}
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
              onClick={() => {
                handleSubmit(false, "", true);
              }}
              className="bg-blue-600 text-white py-2 px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
            >
              Save and Close
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex  min-h-[80vh] h-fit w-full bg-gray-100 p-4 ">
          {/* Preview Section */}
          <div
            className={`transition-all duration-300 border-gray-400  border-r-[0px]   border-t-5 ${
              slots && slots.length > 0 ? "w-2/5" : "w-[356px]"
            } bg-white p-6 rounded-l-md flex flex-col border-r border-gray-200`}
          >
            <h3 className="text-md font-semibold text-gray-500">
              {userData.firstName + " " + userData.lastName}
            </h3>
            <div className="mb-4 flex items-start">
              <h3 className="text-3xl font-semibold text-gray-700  break-words max-w-[360px]">
                {eventName || "Event Name "}
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
            className={`relative transition-all border-gray-400  border-l-[.5px]   border-t-5  duration-300 ${
              slots && slots.length > 0 ? "w-3/5" : "w-fit"
            } bg-white p-6  rounded-r-md flex flex-col border-gray-200`}
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
                  disabled={[
                    { before: new Date() },
                    (date) => {
                      const targetDate = new Date(date).setHours(0, 0, 0, 0);
                      return !next30AvailableDays.some(
                        (availableDate: any) =>
                          new Date(availableDate).setHours(0, 0, 0, 0) ===
                          targetDate
                      );
                    },
                  ]}
                  onSelect={(date: Date | undefined) => {
                    if (!date) return;
                    setSelectedDate(date); // Update the selected date
                    if (!isPreview) {
                      console.log("callleeeddddd");

                      setSlotIsLoading(true);
                      handleSubmit(true, date, false); // Pass the clicked date to handleSubmit
                    } else {
                      handleSlots(date); // Pass the clicked date to handleSlots
                    }
                  }}
                  mode="single"
                  selected={selectedDate as any}
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
              {orgSelectedDate && (
                <div className="m-3 flex-grow overflow-y-auto max-h-[calc(100vh-12rem)]">
                  {/* Add scroll and limit height */}
                  <div>
                    <span className="font-3xl font-bold text-gray-700">
                      {orgSelectedDate.toLocaleDateString("en-US", {
                        weekday: "long", // Full weekday name (e.g., "Thursday")
                        month: "long", // Full month name (e.g., "January")
                        day: "numeric", // Day of the month (e.g., "9")
                      })}
                    </span>
                  </div>

                  {/* Display loader or slots */}
                  {isSlotLoading ? (
                    // <div className="flex justify-center items-center mt-8">

                    // </div>

                    <div className="ml-1 w-44 mb-2 mr-4">
                      {/* Slot Card */}
                      <div className="  px-10 py-3 mt-4 flex flex-col items-center justify-center rounded-sm">
                        <div className="text-blue-600 font-semibold">
                          <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={[
                              "#3b82f6",
                              "#3b82f6",
                              "#3b82f6",
                              "#3b82f6",
                              "#3b82f6",
                            ]}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    slots?.map((slot: any, index: any) => (
                      <div key={index} className="ml-1 w-44 mb-2 mr-4">
                        {/* Slot Card */}
                        <div className="border border-blue-500 px-10 py-3 mt-4 flex flex-col items-center justify-center rounded-sm">
                          <div className="text-blue-600 font-semibold">
                            {slot}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
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
