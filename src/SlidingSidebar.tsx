// import "react-day-picker/dist/style.css";
// import { addDays, format } from "date-fns";
// import { ColorRing, ThreeDots } from "react-loader-spinner";
// import { ChevronLeft, Clock, FileText, Globe2Icon } from "lucide-react";
// import { DayPicker } from "react-day-picker";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { axiosInstance } from "./config/http";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addActiveNavState } from "./app-store/gloabalSlice";
// import Testing from "./Testing";

// const EventScheduler = () => {
//   const [bookingGap, setBookingGap] = useState(0); // Stores the selected or custom gap
//   const [isGapDropdownVisible, setGapDropdownVisible] = useState(false);
//   const predefinedGaps = ["5", "10", "15"]; // Predefined gaps in minutes

//   const handleGapInputChange = (value: any) => {
//     setBookingGap(value); // Update bookingGap with custom input
//   };

//   const handleSelectGap = (gap: any) => {
//     setBookingGap(gap); // Update bookingGap with selected value
//     setDropdownVisible(false); // Hide dropdown after selection
//   };

//   const categoryData: any = useSelector(
//     (state: any) => state.event.categoryData
//   );

//   const predefinedCategories = [
//     "General",
//     "Litmus Test Interview",
//     "Application Test Interview",
//     "Webinar",
//     "Panel Discussion",
//     "Training Session",
//   ];

//   // Filter predefined categories based on categoryData
//   const uniquePredefinedCategories = predefinedCategories.filter((category) => {
//     // Show "Litmus Test Review" and "Application Test Review" only if they are NOT in categoryData
//     if (
//       category === "Litmus Test Interview" ||
//       category === "Application Test Interview"
//     ) {
//       return !categoryData.includes(category);
//     }
//     // Include all other categories
//     return true;
//   });

//   const [eventCategory, setEventCategory] = useState("General");
//   const [isCatDropdownVisible, setCatDropdownVisible] = useState(false);

//   const [isDropdownVisible, setDropdownVisible] = useState(false);

//   const predefinedDurations = ["2", "15", "30", "45", "60", "90", "120"];

//   const [eventDuration, setEventDuration] = useState("");
//   const [isSlotLoading, setSlotIsLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [isPreview, setIsPreview] = useState(false);
//   const [orgSelectedDate, setOrgSelectedDate] = useState<Date | null>(null);
//   const [slots, setSlots] = useState([]);
//   const [orgData, setOrgData] = useState([] as any);
//   const dispatch = useDispatch();

//   const handleSlots = (clickedDate?: Date) => {
//     const timeSlots = clickedDate
//       ? orgData.find(
//           (day: any) => day.eventDate === format(clickedDate, "yyyy-MM-dd")
//         )?.slots || []
//       : [];

//     setSlotIsLoading(false); // Stop the loader
//     setSlots(timeSlots); // Update the slots
//     setOrgSelectedDate(clickedDate || selectedDate);
//     setIsPreview(true);
//   };
//   const [restrictedCategory, setRestrictedCategory] = useState("");

//   // const [eventData, setEventData] = useState([]);
//   const [searchParams] = useSearchParams();
//   const eventId = searchParams.get("eventId");
//   //const [editEventDays, setEditEventDays] = useState();
//   //const [eventData, setEventData] = useState([] as any);
//   //let eventData;
//   useEffect(() => {
//     const fetchingEditData = async () => {
//       const editEventdata = await axiosInstance.get(
//         `/events/event-data/${eventId}`
//       );
//       setEventName(editEventdata.data.data.eventName);
//       setEventDuration(editEventdata.data.data.eventDuration);
//       setDescription(editEventdata.data.data.eventDescription);
//       setEventCategory(editEventdata.data.data.eventCategory);
//       setRestrictedCategory(editEventdata.data.data.eventCategory);
//       setBookingGap(editEventdata.data.data.meetingGap);
//     };

//     fetchingEditData();
//   }, [eventId]);

//   const userData = useSelector((state: any) => state.registration.userData);

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false); // Loader state

//   // const setEventDays = (updatedEventData) => {

//   // };

//   let eventData = [
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//   ];

//   const [availableDays, setAvailableDays] = useState([]);
//   const [next30AvailableDays, setNext30AvailableDays] = useState([]);
//   const [eventDatas, setEventDatas] = useState(eventData);

//   // Function to update eventDatas and reflect changes on the calendar
//   const setEventDays = (updatedEventData: any) => {
//     setSlots([]);
//     setSlotIsLoading(false);
//     setIsPreview(false);
//     setOrgSelectedDate(null);
//     setEventDatas([]);
//     setLoading(true); // Show loader
//     setTimeout(() => {
//       // Simulate a delay
//       setEventDatas(updatedEventData); // Update calendar data
//       setLoading(false); // Hide loader
//     }, 1000);
//   };

//   // Calculate available weekdays based on eventDatas
//   useEffect(() => {
//     const daysMapping = eventDatas
//       .map((event, index) => (event.isAvailable ? index : null))
//       .filter((day) => day !== null); // Remove nulls
//     setAvailableDays(daysMapping as any);
//   }, [eventDatas, eventDuration]);

//   // Calculate the next 30 available days
//   useEffect(() => {
//     const generateNext30AvailableDays = () => {
//       const result: any = [];
//       let currentDate: Date = new Date();
//       //HERE Chnagedd
//       while (result.length < 7) {
//         if ((availableDays as any).includes(currentDate.getDay())) {
//           result.push(new Date(currentDate)); // Add copy of the date
//         }
//         currentDate = addDays(currentDate, 1);
//       }

//       setNext30AvailableDays(result);
//     };

//     if (availableDays.length > 0) {
//       generateNext30AvailableDays();
//     } else {
//       setNext30AvailableDays([]); // Reset if no available days
//     }
//   }, [availableDays]);

//   const modifiers: any = {
//     available: next30AvailableDays,
//     today: new Date(),
//     day: {
//       color: "gray", // Set the color of all days to gray
//     },
//   };
//   const styles = {
//     day: {
//       color: "#6b7280", // Tailwind 'gray-500' for unmodified dates
//     },
//   };
//   const modifiersStyles = {
//     available: {
//       backgroundColor: "#dbeafe",
//       color: "#3b82f6",
//       borderRadius: "50%",
//     },
//     today: {
//       color: "#1d4ed8",
//       fontWeight: "",
//     },
//     day: {
//       color: "gray", // Set the color of all days to gray
//     },
//   };

//   // fotrm

//   const [eventName, setEventName] = useState("");

//   const [description, setDescription] = useState("");
//   //const [eventDays, setEventDays] = useState([]);
//   const [errors, setErrors] = useState({
//     eventName: "",
//     eventDuration: "",
//     description: "",
//     gap: "",
//   });

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {
//       eventName: "",
//       eventDuration: "",
//       description: "",
//       gap: "",
//     };

//     // Validate Event Name
//     if (!eventName.trim()) {
//       newErrors.eventName = "Event Name is required";
//       valid = false;
//       setIsPreview(false);
//     }

//     // Validate Event Duration

//     if (!eventDuration) {
//       newErrors.eventDuration = "Event Duration is required";
//       valid = false;
//     } else if (isNaN(eventDuration as any) || (eventDuration as any) <= 0) {
//       newErrors.eventDuration =
//         "Event Duration must be a valid positive number";
//       valid = false;
//       setIsPreview(false);
//     } else if ((eventDuration as any) < 2) {
//       newErrors.eventDuration = "Event Duration must be at least 2 minutes";
//       valid = false;
//       setIsPreview(false);
//     } else if ((eventDuration as any) > 1439) {
//       newErrors.eventDuration = "Event Duration must not exceed 1439 minutes";
//       valid = false;
//       setIsPreview(false);
//     }

//     // Validate Description
//     if (bookingGap > 15) {
//       newErrors.gap = "The booking gap must be less than 15";
//       valid = false;
//       setIsPreview(false);
//     }
//     if (description.split(/\s+/).filter(Boolean).length > 60) {
//       newErrors.description = "The description must have 60 words or fewer.";
//       valid = false;
//       setIsPreview(false);
//     }
//     // Validate Weekdays
//     // if (eventDays.length === 0) {
//     //   newErrors.eventDays = "At least one day must be selected";
//     //   valid = false;
//     // }

//     setErrors(newErrors);
//     return valid;
//   };

//   const [currentISTTime, setCurrentISTTime] = useState("");

//   useEffect(() => {
//     const updateTime = () => {
//       const date = new Date();

//       // Convert the current time to IST (GMT+5:30)
//       const istOffset = 330; // IST is UTC+5:30 in minutes
//       const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
//       const istTime = new Date(utcTime + istOffset * 60000);

//       // Format the IST time as hh:mm AM/PM
//       const options = {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       };
//       const formattedTime = istTime.toLocaleTimeString("en-IN", options as any);
//       setCurrentISTTime(formattedTime);
//     };

//     // Call immediately to avoid lag
//     updateTime();

//     // Calculate delay to the next exact minute
//     const now = new Date();
//     const delay = (60 - now.getSeconds()) * 1000;

//     // Set a timeout for the first update at the next minute
//     const timeout = setTimeout(() => {
//       updateTime();

//       // After the first update, set an interval to update every minute
//       const interval = setInterval(updateTime, 60000);

//       // Cleanup interval on unmount
//       return () => clearInterval(interval);
//     }, delay);

//     // Cleanup timeout on unmount
//     return () => clearTimeout(timeout);
//   }, []);

//   //new test

//   const [globalErrors, setGlobalErrors] = useState<string[]>([]);
//   const [otherErrors, setOtherErrors] = useState<string[]>([]);

//   // Callback function to handle errors from the Testing component
//   const handleErrors = (errorList: string[], otherErrorList: any) => {
//     setOtherErrors(otherErrorList);
//     setGlobalErrors(errorList);
//   };
//   //new test

//   const validateEventData = (eventData: any, requiredDuration: any) => {
//     let isValid = true;
//     const errors: string[] = [];

//     eventData.forEach((day: any, dayIndex: number) => {
//       if (!day.isAvailable) {
//         return; // Skip unavailable days
//       }

//       day.timeSlots.forEach((slot: any, slotIndex: number) => {
//         const startMinutes: any = timeToMinutes(slot.start);
//         const endMinutes: any = timeToMinutes(slot.end);

//         // Check if start or end times are empty
//         if (!slot.start || !slot.end) {
//           isValid = false;
//           errors.push(
//             `Error: Missing start or end time for slot ${
//               slotIndex + 1
//             } on day ${dayIndex + 1}.`
//           );
//           slot.error = "Start and end times are required.";
//           return;
//         }

//         // Validate start time within 12:00am to 11:59pm range
//         if (startMinutes < 0 || startMinutes >= 1440) {
//           isValid = false;
//           errors.push(
//             `Error: Start time ${slot.start} for slot ${slotIndex + 1} on day ${
//               dayIndex + 1
//             } is out of bounds.`
//           );
//           slot.error = "Start time must be between 12:00am and 11:59pm.";
//         }

//         // Validate end time within 12:00am to 12:00am of the next day
//         if (endMinutes <= 0 || endMinutes > 1440) {
//           isValid = false;
//           errors.push(
//             `Error: End time ${slot.end} for slot ${slotIndex + 1} on day ${
//               dayIndex + 1
//             } is out of bounds.`
//           );
//           slot.error = "End time must be between 12:00am and 11:59pm.";
//         }

//         // Ensure end time is after start time
//         if (endMinutes <= startMinutes) {
//           isValid = false;
//           errors.push(
//             `Error: End time ${slot.end} must be greater than start time ${
//               slot.start
//             } for slot ${slotIndex + 1} on day ${dayIndex + 1}.`
//           );
//           slot.error = "End time must be greater than start time.";
//         }

//         // Check if the slot duration meets the required duration
//         const slotDuration = endMinutes - startMinutes;
//         if (slotDuration < requiredDuration) {
//           isValid = false;
//           errors.push(
//             `Error: Slot from ${slot.start} to ${slot.end} on day ${
//               dayIndex + 1
//             } must be at least ${requiredDuration} minutes.`
//           );
//           slot.error = `Slot duration is less than ${requiredDuration} minutes.`;
//         }

//         // Clear the error if the slot is valid
//         if (isValid) {
//           slot.error = "";
//         }
//       });
//     });

//     return { isValid, errors };
//   };

//   // Utility function to convert time to total minutes
//   const timeToMinutes = (time: any) => {
//     if (time) {
//       const [_, hours, minutes, meridian] = time.match(
//         /(\d{1,2}):(\d{2})(am|pm)/
//       );
//       let totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
//       if (meridian.toLowerCase() === "pm" && hours !== "12") {
//         totalMinutes += 12 * 60;
//       } else if (meridian.toLowerCase() === "am" && hours === "12") {
//         totalMinutes -= 12 * 60;
//       }
//       return totalMinutes;
//     }
//   };

//   const [validationErrors, setValidationErrors] = useState([]);

//   const handleValidation = () => {
//     const { isValid, errors }: any = validateEventData(
//       eventDatas,
//       eventDuration
//     );

//     setValidationErrors(errors);
//     return isValid; // Return true if valid, false otherwise
//   };

//   const handleInputChange = (value: any) => {
//     setEventDuration(value); // Directly update eventDuration with the custom input

//     // Validation for numeric custom duration
//     if (value && !/^\d+$/.test(value)) {
//       setErrors({
//         eventDuration: "Please enter a valid number for duration.",
//       } as any);
//     } else if (value && Number(value) <= 0) {
//       setErrors({ eventDuration: "Duration must be greater than 0." } as any);
//     } else {
//       setErrors({ eventDuration: "" } as any);
//     }
//   };

//   const handleSelectDuration = (value: any) => {
//     setEventDuration(value); // Update eventDuration with the selected value
//     setDropdownVisible(false); // Hide the dropdown
//     setErrors({ eventDuration: "" } as any); // Clear errors for valid selection
//   };

//   const handleSelectCategory = (value: any) => {
//     setEventCategory(value); // Update eventCategory with the selected value
//     setDropdownVisible(false); // Hide the dropdown
//     setErrors({ eventCategory: "" } as any); // Clear errors for valid selection
//   };

//   const handleSubmit = async (
//     edit: boolean,
//     clickedDate?: any,
//     dataSubmit?: boolean
//   ) => {
//     const index: any = 0;
//     if (validateForm()) {
//       if (globalErrors.length === 0 && otherErrors.length === 0) {
//         if (handleValidation()) {
//           try {
//             let response;
//             if (dataSubmit) {
//               toast.loading("Your Event is Creating....");
//               response = await axiosInstance.post("/events?preview=false", {
//                 eventName,
//                 eventDuration,
//                 eventDescription: description,
//                 eventDatas,
//                 eventId,
//                 meetingGap: bookingGap,
//                 eventCategory: eventCategory,
//               });
//             } else {
//               response = await axiosInstance.post("/events?preview=true", {
//                 eventName,
//                 eventDuration,
//                 eventDescription: description,
//                 eventDatas,
//                 eventId,
//                 meetingGap: bookingGap,
//                 eventCategory: eventCategory,
//               });
//             }

//             if (response.data.success) {
//               if (edit) {
//                 setSlotIsLoading(true);
//                 setOrgSelectedDate(clickedDate as any);
//                 // Pass the date directly
//                 setOrgData(response.data.data);
//                 // setTimeout(() => {
//                 //   handleSlots(clickedDate);
//                 // }, 2000);
//               }
//               if (dataSubmit) {
//                 navigate("/events/user/me");
//                 toast.dismiss();
//                 toast.success("Your event was created successfully!");

//                 dispatch(addActiveNavState(index));
//               }
//             } else {
//               toast.dismiss();
//               setTimeout(() => {
//                 toast.error("There is an error!");
//               }, 2000);
//             }
//           } catch (error: any) {
//             // console.error("Error:", error);
//           }
//         }
//       }
//     }
//   };
//   useEffect(() => {
//     // This useEffect will monitor changes in orgData and selectedDate
//     if (orgData && orgData.length > 0) {
//       setTimeout(() => {
//         handleSlots(selectedDate as any);
//       }, 3000); // Call handleSlots once orgData and selectedDate are available
//     }
//   }, [orgData]);

//   useEffect(() => {
//     setOrgSelectedDate(null);
//     setSlots([]);
//     setSlotIsLoading(false);
//     setIsPreview(false);
//   }, [eventDuration, bookingGap]);

//   const isRestricted = [
//     "Litmus Test Interview",
//     "Application Test Interview",
//   ].includes(restrictedCategory);

//   return (
//     <>
//       <div
//         className={`flex bg-gray-100  ${
//           orgSelectedDate ? "" : "justify-between gap-40"
//         }`}
//       >
//         {/* Sidebar with Fixed Width */}
//         <div className="w-[680px] h-screen overflow-y-scroll bg-white shadow-md p-6 flex flex-col  justify-between">
//           {/* Form Header */}
//           <div className="mt-2 mb-1 flex cursor-pointer">
//             <ChevronLeft color="#3b82f6" size={17} className="mt-1" />
//             <span
//               className="font-semibold text-blue-500"
//               onClick={() => {
//                 navigate("/events/user/me");
//               }}
//             >
//               Back
//             </span>
//           </div>
//           <div className="flex justify-between items-center border-blue-500 pt-4 pb-4">
//             <h2 className="text-2xl font-semibold text-gray-800">
//               Create Your Event Type
//             </h2>
//           </div>

//           {/* Form Content */}
//           <div className="space-y-6 flex-grow">
//             {/* Event Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Event Name
//               </label>
//               <input
//                 type="text"
//                 value={eventName}
//                 onChange={(e) => setEventName(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//                 placeholder="Enter event name"
//               />
//               {errors.eventName && (
//                 <p className="text-red-500 text-sm">{errors.eventName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Event Category
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={eventCategory}
//                   onChange={(e) => handleInputChange(e.target.value)}
//                   onFocus={() => setCatDropdownVisible(true)}
//                   onBlur={() => {
//                     setTimeout(() => setCatDropdownVisible(false), 200); // Delay to handle selection
//                   }}
//                   placeholder="Enter or select a category"
//                   className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {/* Message below the input box */}
//                 {isRestricted && (
//                   <p className="mt-1 text-sm text-red-500">
//                     This category is exclusive and cannot be changed.
//                   </p>
//                 )}
//                 {isCatDropdownVisible && !isRestricted && (
//                   <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
//                     {uniquePredefinedCategories?.map((category) => (
//                       <li
//                         key={category}
//                         onClick={() => handleSelectCategory(category)}
//                         className="p-2 cursor-pointer hover:bg-blue-100"
//                       >
//                         {category}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Event Duration
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={eventDuration}
//                   onChange={(e) => handleInputChange(e.target.value)}
//                   onFocus={() => setDropdownVisible(true)}
//                   onBlur={() => {
//                     setTimeout(() => setDropdownVisible(false), 200); // Delay to handle selection
//                   }}
//                   placeholder="Enter or select duration (minutes)"
//                   className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />

//                 {isDropdownVisible && (
//                   <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
//                     {predefinedDurations.map((duration) => (
//                       <li
//                         key={duration}
//                         onClick={() => handleSelectDuration(duration)}
//                         className="p-2 cursor-pointer hover:bg-blue-100"
//                       >
//                         {duration} minutes
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>

//               {errors.eventDuration && (
//                 <p className="text-red-500 text-sm">{errors.eventDuration}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Meeting Gap
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={bookingGap}
//                   onChange={(e) => handleGapInputChange(e.target.value)}
//                   onFocus={() => setGapDropdownVisible(true)}
//                   onBlur={() => {
//                     setTimeout(() => setGapDropdownVisible(false), 200); // Delay to handle dropdown click
//                   }}
//                   placeholder="Enter or select gap (minutes)"
//                   className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />

//                 {isGapDropdownVisible && (
//                   <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
//                     {predefinedGaps.map((gap) => (
//                       <li
//                         key={gap}
//                         onClick={() => handleSelectGap(gap)}
//                         className="p-2 cursor-pointer hover:bg-blue-100"
//                       >
//                         {gap} minutes
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//               {errors.gap && (
//                 <p className="text-red-500 text-sm">{errors.gap}</p>
//               )}
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Description
//               </label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//                 rows={4}
//                 placeholder="Enter event description"
//               />
//               {errors.description && (
//                 <p className="text-red-500 text-sm">{errors.description}</p>
//               )}
//             </div>

//             {/* Weekday Selection */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 Select Weekdays
//               </h3>
//               <Testing
//                 eventId={eventId}
//                 update={false}
//                 eventDays={eventData}
//                 setEventDays={setEventDays}
//                 onError={handleErrors}
//               />
//               {/* {errors.eventDays && (
//           <p className="text-red-500 text-sm">{errors.eventDays}</p>
//         )} */}
//             </div>
//           </div>
//           {/* Display only the global error for "at least one day" */}
//           {globalErrors.length > 0 && (
//             <div className="error-messages text-red-500">
//               {globalErrors.map((error, index) => (
//                 <div key={index}>{error}</div>
//               ))}
//             </div>
//           )}
//           {/* Display only the global error for "at least one day" */}

//           {/* time and duration validation errrors */}
//           {validationErrors.length > 0 && (
//             <div className="text-red-500 text-sm mt-4">
//               {validationErrors.map((error, index) => (
//                 <div key={index}>{error}</div>
//               ))}
//             </div>
//           )}
//           {/* Buttons */}
//           <div className="flex gap-5 cursor-pointer mt-6">
//             <button className="text-gray-600 py-2 rounded-full transition duration-200 w-full">
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 handleSubmit(false, "", true);
//               }}
//               className="bg-blue-600 text-white py-2 px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
//             >
//               Save and Close
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex  min-h-[80vh] h-fit w-full bg-gray-100 p-4 mt-20 ">
//           {/* Preview Section */}
//           <div
//             className={`transition-all duration-300 border-gray-400  border-r-[0px]   border-t-5 ${
//               slots && slots.length > 0 ? "w-2/5" : "w-[356px]"
//             } bg-white p-6 rounded-l-md flex flex-col border-r border-gray-200`}
//           >
//             <h3 className="text-md font-semibold text-gray-500">
//               {userData.firstName + " " + userData.lastName}
//             </h3>
//             <div className="mb-4 flex items-start">
//               <h3 className="text-3xl font-semibold text-gray-700  break-words max-w-[360px]">
//                 {eventName || "Event Name "}
//               </h3>
//             </div>
//             <p className="mb-2 flex items-start">
//               <div className="flex-shrink-0 mt-0.5">
//                 <Clock size={20} color="gray" />
//               </div>
//               <span className="ml-2 text-gray-500 break-words max-w-[320px]">
//                 {eventDuration ? `${eventDuration} min` : "Event Duration"}
//               </span>
//             </p>
//             <h3 className="mb-2 text-md text-gray-500 flex items-start break-words">
//               <div className="flex-shrink-0 mt-0.5">
//                 <FileText size={20} color="gray" className="text-gray-600" />
//               </div>
//               <span className="ml-2 text-gray-500 break-words max-w-[320px]">
//                 {description || "Event Description"}
//               </span>
//             </h3>
//           </div>

//           {/* Calendar Section */}
//           <div
//             className={`relative transition-all border-gray-400  border-l-[.5px]   border-t-5  duration-300 ${
//               slots && slots.length > 0 ? "w-3/5" : "w-fit"
//             } bg-white p-6  rounded-r-md flex flex-col border-gray-200`}
//           >
//             {loading && (
//               <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-75 flex items-center justify-center z-10">
//                 <ThreeDots
//                   height="80"
//                   width="80"
//                   radius="40"
//                   color="gray"
//                   ariaLabel="three-dots-loading"
//                 />
//               </div>
//             )}

//             <div>
//               <span className="font-bold text-xl text-gray-700">
//                 Select Date and Time
//               </span>
//             </div>

//             {/* Calendar Component */}
//             <div className="flex">
//               <div>
//                 <DayPicker
//                   modifiers={modifiers}
//                   modifiersStyles={modifiersStyles}
//                   styles={styles}
//                   disabled={[
//                     { before: new Date() },
//                     (date) => {
//                       const targetDate = new Date(date).setHours(0, 0, 0, 0);
//                       return !next30AvailableDays.some(
//                         (availableDate: any) =>
//                           new Date(availableDate).setHours(0, 0, 0, 0) ===
//                           targetDate
//                       );
//                     },
//                   ]}
//                   onSelect={(date: Date | undefined) => {
//                     if (!date) return;
//                     setSelectedDate(date); // Update the selected date
//                     if (!isPreview) {
//                       setSlotIsLoading(true);
//                       handleSubmit(true, date, false); // Pass the clicked date to handleSubmit
//                     } else {
//                       handleSlots(date); // Pass the clicked date to handleSlots
//                     }
//                   }}
//                   mode="single"
//                   selected={selectedDate as any}
//                 />

//                 <div className="mt-6">
//                   <div>
//                     <span className="font-bold text-md">Time zone</span>
//                   </div>
//                   <div className="mt-1">
//                     <span className="flex gap-1">
//                       <Globe2Icon size={16} className="mt-1.5" />
//                       <span className="text-sm font-sans mt-1">
//                         Indian Standard Time ({currentISTTime})
//                       </span>
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Slots Section */}
//               {orgSelectedDate && (
//                 <div className="m-3 flex-grow overflow-y-auto max-h-[calc(100vh-12rem)]">
//                   {/* Add scroll and limit height */}
//                   <div>
//                     <span className="font-3xl font-bold text-gray-700">
//                       {orgSelectedDate.toLocaleDateString("en-US", {
//                         weekday: "long", // Full weekday name (e.g., "Thursday")
//                         month: "long", // Full month name (e.g., "January")
//                         day: "numeric", // Day of the month (e.g., "9")
//                       })}
//                     </span>
//                   </div>

//                   {/* Display loader or slots */}
//                   {isSlotLoading ? (
//                     // <div className="flex justify-center items-center mt-8">

//                     // </div>

//                     <div className="ml-1 w-44 mb-2 mr-4">
//                       {/* Slot Card */}
//                       <div className="  px-10 py-3 mt-4 flex flex-col items-center justify-center rounded-sm">
//                         <div className="text-blue-600 font-semibold">
//                           <ColorRing
//                             visible={true}
//                             height="80"
//                             width="80"
//                             ariaLabel="color-ring-loading"
//                             wrapperStyle={{}}
//                             wrapperClass="color-ring-wrapper"
//                             colors={[
//                               "#3b82f6",
//                               "#3b82f6",
//                               "#3b82f6",
//                               "#3b82f6",
//                               "#3b82f6",
//                             ]}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     slots?.map((slot: any, index: any) => (
//                       <div key={index} className="ml-1 w-44 mb-2 mr-4">
//                         {/* Slot Card */}
//                         <div className="border border-blue-500 px-10 py-3 mt-4 flex flex-col items-center justify-center rounded-sm">
//                           <div className="text-blue-600 font-semibold">
//                             {slot}
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//         gutter={8}
//         containerClassName=""
//         containerStyle={{}}
//         toastOptions={{
//           // Define default options
//           className: "",

//           style: {
//             background: "#fff",
//             color: "#3b82f6",
//             border: "",
//             borderColor: "#3b82f6",
//           },

//           // Default options for specific types
//           success: {
//             duration: 3000,
//             iconTheme: {
//               primary: "green",
//               secondary: "white",
//             },
//           },
//         }}
//       />
//     </>
//   );
// };

// export default EventScheduler;

// import "react-day-picker/dist/style.css";
// import { addDays, format } from "date-fns";
// import { ColorRing, ThreeDots } from "react-loader-spinner";
// import { ChevronLeft, Clock, FileText, Globe2Icon } from "lucide-react";
// import { DayPicker } from "react-day-picker";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { axiosInstance } from "./config/http";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addActiveNavState } from "./app-store/gloabalSlice";
// import Testing from "./Testing";

// const EventScheduler = () => {
//   const [bookingGap, setBookingGap] = useState(0);
//   const [isGapDropdownVisible, setGapDropdownVisible] = useState(false);
//   const predefinedGaps = ["5", "10", "15"];

//   const handleGapInputChange = (value: any) => {
//     setBookingGap(value);
//   };

//   const handleSelectGap = (gap: any) => {
//     setBookingGap(gap);
//     setDropdownVisible(false);
//   };

//   const categoryData: any = useSelector(
//     (state: any) => state.event.categoryData
//   );

//   const predefinedCategories = [
//     "General",
//     "Litmus Test Interview",
//     "Application Test Interview",
//     "Webinar",
//     "Panel Discussion",
//     "Training Session",
//   ];

//   const uniquePredefinedCategories = predefinedCategories.filter((category) => {
//     if (
//       category === "Litmus Test Interview" ||
//       category === "Application Test Interview"
//     ) {
//       return !categoryData.includes(category);
//     }
//     return true;
//   });

//   const [eventCategory, setEventCategory] = useState("General");
//   const [isCatDropdownVisible, setCatDropdownVisible] = useState(false);
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const predefinedDurations = ["2", "15", "30", "45", "60", "90", "120"];
//   const [eventDuration, setEventDuration] = useState("");
//   const [isSlotLoading, setSlotIsLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [isPreview, setIsPreview] = useState(false);
//   const [orgSelectedDate, setOrgSelectedDate] = useState<Date | null>(null);
//   const [slots, setSlots] = useState([]);
//   const [orgData, setOrgData] = useState([] as any);
//   const dispatch = useDispatch();

//   const handleSlots = (clickedDate?: Date) => {
//     const timeSlots = clickedDate
//       ? orgData.find(
//           (day: any) => day.eventDate === format(clickedDate, "yyyy-MM-dd")
//         )?.slots || []
//       : [];

//     setSlotIsLoading(false);
//     setSlots(timeSlots);
//     setOrgSelectedDate(clickedDate || selectedDate);
//     setIsPreview(true);
//   };

//   const [restrictedCategory, setRestrictedCategory] = useState("");
//   const [searchParams] = useSearchParams();
//   const eventId = searchParams.get("eventId");

//   useEffect(() => {
//     const fetchingEditData = async () => {
//       const editEventdata = await axiosInstance.get(
//         `/events/event-data/${eventId}`
//       );
//       setEventName(editEventdata.data.data.eventName);
//       setEventDuration(editEventdata.data.data.eventDuration);
//       setDescription(editEventdata.data.data.eventDescription);
//       setEventCategory(editEventdata.data.data.eventCategory);
//       setRestrictedCategory(editEventdata.data.data.eventCategory);
//       setBookingGap(editEventdata.data.data.meetingGap);
//     };

//     fetchingEditData();
//   }, [eventId]);

//   const userData = useSelector((state: any) => state.registration.userData);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   let eventData = [
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//   ];

//   const [availableDays, setAvailableDays] = useState([]);
//   const [next30AvailableDays, setNext30AvailableDays] = useState([]);
//   const [eventDatas, setEventDatas] = useState(eventData);

//   const setEventDays = (updatedEventData: any) => {
//     setSlots([]);
//     setSlotIsLoading(false);
//     setIsPreview(false);
//     setOrgSelectedDate(null);
//     setEventDatas([]);
//     setLoading(true);
//     setTimeout(() => {
//       setEventDatas(updatedEventData);
//       setLoading(false);
//     }, 1000);
//   };

//   useEffect(() => {
//     const daysMapping = eventDatas
//       .map((event, index) => (event.isAvailable ? index : null))
//       .filter((day) => day !== null);
//     setAvailableDays(daysMapping as any);
//   }, [eventDatas, eventDuration]);

//   useEffect(() => {
//     const generateNext30AvailableDays = () => {
//       const result: any = [];
//       let currentDate: Date = new Date();
//       while (result.length < 7) {
//         if ((availableDays as any).includes(currentDate.getDay())) {
//           result.push(new Date(currentDate));
//         }
//         currentDate = addDays(currentDate, 1);
//       }
//       setNext30AvailableDays(result);
//     };

//     if (availableDays.length > 0) {
//       generateNext30AvailableDays();
//     } else {
//       setNext30AvailableDays([]);
//     }
//   }, [availableDays]);

//   const modifiers: any = {
//     available: next30AvailableDays,
//     today: new Date(),
//     day: {
//       color: "gray",
//     },
//   };

//   const styles = {
//     day: {
//       color: "#6b7280",
//     },
//   };

//   const modifiersStyles = {
//     available: {
//       backgroundColor: "#dbeafe",
//       color: "#3b82f6",
//       borderRadius: "50%",
//     },
//     today: {
//       color: "#1d4ed8",
//       fontWeight: "",
//     },
//     day: {
//       color: "gray",
//     },
//   };

//   const [eventName, setEventName] = useState("");
//   const [description, setDescription] = useState("");
//   const [errors, setErrors] = useState({
//     eventName: "",
//     eventDuration: "",
//     description: "",
//     gap: "",
//   });

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {
//       eventName: "",
//       eventDuration: "",
//       description: "",
//       gap: "",
//     };

//     if (!eventName.trim()) {
//       newErrors.eventName = "Event Name is required";
//       valid = false;
//       setIsPreview(false);
//     }

//     if (!eventDuration) {
//       newErrors.eventDuration = "Event Duration is required";
//       valid = false;
//     } else if (isNaN(eventDuration as any) || (eventDuration as any) <= 0) {
//       newErrors.eventDuration =
//         "Event Duration must be a valid positive number";
//       valid = false;
//       setIsPreview(false);
//     } else if ((eventDuration as any) < 2) {
//       newErrors.eventDuration = "Event Duration must be at least 2 minutes";
//       valid = false;
//       setIsPreview(false);
//     } else if ((eventDuration as any) > 1439) {
//       newErrors.eventDuration = "Event Duration must not exceed 1439 minutes";
//       valid = false;
//       setIsPreview(false);
//     }

//     if (bookingGap > 15) {
//       newErrors.gap = "The booking gap must be less than 15";
//       valid = false;
//       setIsPreview(false);
//     }
//     if (description.split(/\s+/).filter(Boolean).length > 60) {
//       newErrors.description = "The description must have 60 words or fewer.";
//       valid = false;
//       setIsPreview(false);
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const [currentISTTime, setCurrentISTTime] = useState("");

//   useEffect(() => {
//     const updateTime = () => {
//       const date = new Date();
//       const istOffset = 330;
//       const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
//       const istTime = new Date(utcTime + istOffset * 60000);
//       const options = {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       };
//       const formattedTime = istTime.toLocaleTimeString("en-IN", options as any);
//       setCurrentISTTime(formattedTime);
//     };

//     updateTime();
//     const now = new Date();
//     const delay = (60 - now.getSeconds()) * 1000;
//     const timeout = setTimeout(() => {
//       updateTime();
//       const interval = setInterval(updateTime, 60000);
//       return () => clearInterval(interval);
//     }, delay);
//     return () => clearTimeout(timeout);
//   }, []);

//   const [globalErrors, setGlobalErrors] = useState<string[]>([]);
//   const [otherErrors, setOtherErrors] = useState<string[]>([]);

//   const handleErrors = (errorList: string[], otherErrorList: any) => {
//     setOtherErrors(otherErrorList);
//     setGlobalErrors(errorList);
//   };

//   const validateEventData = (eventData: any, requiredDuration: any) => {
//     let isValid = true;
//     const errors: string[] = [];

//     eventData.forEach((day: any, dayIndex: number) => {
//       if (!day.isAvailable) {
//         return;
//       }

//       day.timeSlots.forEach((slot: any, slotIndex: number) => {
//         const startMinutes: any = timeToMinutes(slot.start);
//         const endMinutes: any = timeToMinutes(slot.end);

//         if (!slot.start || !slot.end) {
//           isValid = false;
//           errors.push(
//             `Error: Missing start or end time for slot ${
//               slotIndex + 1
//             } on day ${dayIndex + 1}.`
//           );
//           slot.error = "Start and end times are required.";
//           return;
//         }

//         if (startMinutes < 0 || startMinutes >= 1440) {
//           isValid = false;
//           errors.push(
//             `Error: Start time ${slot.start} for slot ${slotIndex + 1} on day ${
//               dayIndex + 1
//             } is out of bounds.`
//           );
//           slot.error = "Start time must be between 12:00am and 11:59pm.";
//         }

//         if (endMinutes <= 0 || endMinutes > 1440) {
//           isValid = false;
//           errors.push(
//             `Error: End time ${slot.end} for slot ${slotIndex + 1} on day ${
//               dayIndex + 1
//             } is out of bounds.`
//           );
//           slot.error = "End time must be between 12:00am and 11:59pm.";
//         }

//         if (endMinutes <= startMinutes) {
//           isValid = false;
//           errors.push(
//             `Error: End time ${slot.end} must be greater than start time ${
//               slot.start
//             } for slot ${slotIndex + 1} on day ${dayIndex + 1}.`
//           );
//           slot.error = "End time must be greater than start time.";
//         }

//         const slotDuration = endMinutes - startMinutes;
//         if (slotDuration < requiredDuration) {
//           isValid = false;
//           errors.push(
//             `Error: Slot from ${slot.start} to ${slot.end} on day ${
//               dayIndex + 1
//             } must be at least ${requiredDuration} minutes.`
//           );
//           slot.error = `Slot duration is less than ${requiredDuration} minutes.`;
//         }

//         if (isValid) {
//           slot.error = "";
//         }
//       });
//     });

//     return { isValid, errors };
//   };

//   const timeToMinutes = (time: any) => {
//     if (time) {
//       const [_, hours, minutes, meridian] = time.match(
//         /(\d{1,2}):(\d{2})(am|pm)/
//       );
//       let totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
//       if (meridian.toLowerCase() === "pm" && hours !== "12") {
//         totalMinutes += 12 * 60;
//       } else if (meridian.toLowerCase() === "am" && hours === "12") {
//         totalMinutes -= 12 * 60;
//       }
//       return totalMinutes;
//     }
//   };

//   const [validationErrors, setValidationErrors] = useState([]);

//   const handleValidation = () => {
//     const { isValid, errors }: any = validateEventData(
//       eventDatas,
//       eventDuration
//     );

//     setValidationErrors(errors);
//     return isValid;
//   };

//   const handleInputChange = (value: any) => {
//     setEventDuration(value);
//     if (value && !/^\d+$/.test(value)) {
//       setErrors({
//         eventDuration: "Please enter a valid number for duration.",
//       } as any);
//     } else if (value && Number(value) <= 0) {
//       setErrors({ eventDuration: "Duration must be greater than 0." } as any);
//     } else {
//       setErrors({ eventDuration: "" } as any);
//     }
//   };

//   const handleSelectDuration = (value: any) => {
//     setEventDuration(value);
//     setDropdownVisible(false);
//     setErrors({ eventDuration: "" } as any);
//   };

//   const handleSelectCategory = (value: any) => {
//     setEventCategory(value);
//     setDropdownVisible(false);
//     setErrors({ eventCategory: "" } as any);
//   };

//   const handleSubmit = async (
//     edit: boolean,
//     clickedDate?: any,
//     dataSubmit?: boolean
//   ) => {
//     const index: any = 0;
//     if (validateForm()) {
//       if (globalErrors.length === 0 && otherErrors.length === 0) {
//         if (handleValidation()) {
//           try {
//             let response;
//             if (dataSubmit) {
//               toast.loading("Your Event is Creating....");
//               response = await axiosInstance.post("/events?preview=false", {
//                 eventName,
//                 eventDuration,
//                 eventDescription: description,
//                 eventDatas,
//                 eventId,
//                 meetingGap: bookingGap,
//                 eventCategory: eventCategory,
//               });
//             } else {
//               response = await axiosInstance.post("/events?preview=true", {
//                 eventName,
//                 eventDuration,
//                 eventDescription: description,
//                 eventDatas,
//                 eventId,
//                 meetingGap: bookingGap,
//                 eventCategory: eventCategory,
//               });
//             }

//             if (response.data.success) {
//               if (edit) {
//                 setSlotIsLoading(true);
//                 setOrgSelectedDate(clickedDate as any);
//                 setOrgData(response.data.data);
//               }
//               if (dataSubmit) {
//                 navigate("/events/user/me");
//                 toast.dismiss();
//                 toast.success("Your event was created successfully!");
//                 dispatch(addActiveNavState(index));
//               }
//             } else {
//               toast.dismiss();
//               setTimeout(() => {
//                 toast.error("There is an error!");
//               }, 2000);
//             }
//           } catch (error: any) {
//             console.error("Error:", error);
//           }
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     if (orgData && orgData.length > 0) {
//       setTimeout(() => {
//         handleSlots(selectedDate as any);
//       }, 3000);
//     }
//   }, [orgData]);

//   useEffect(() => {
//     setOrgSelectedDate(null);
//     setSlots([]);
//     setSlotIsLoading(false);
//     setIsPreview(false);
//   }, [eventDuration, bookingGap]);

//   const isRestricted = [
//     "Litmus Test Interview",
//     "Application Test Interview",
//   ].includes(restrictedCategory);

//   // Responsive breakpoints
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const isMobile = windowWidth <= 768;
//   const isTablet = windowWidth > 768 && windowWidth <= 1024;

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   return (
//     <>
//       <div
//         className={`flex flex-col md:flex-row bg-gray-100 min-h-screen ${
//           orgSelectedDate ? "" : "md:justify-between md:gap-40"
//         }`}
//       >
//         {/* Sidebar - Mobile: Full width, Desktop: Fixed width */}
//         <div
//           className={`w-full ${
//             isMobile ? "" : "md:w-[680px]"
//           } h-auto md:h-screen overflow-y-auto bg-white shadow-md p-4 md:p-6 flex flex-col justify-between`}
//         >
//           {/* Form Header */}
//           <div className="mt-2 mb-1 flex cursor-pointer">
//             <ChevronLeft color="#3b82f6" size={17} className="mt-1" />
//             <span
//               className="font-semibold text-blue-500"
//               onClick={() => {
//                 navigate("/events/user/me");
//               }}
//             >
//               Back
//             </span>
//           </div>
//           <div className="flex justify-between items-center border-blue-500 pt-2 md:pt-4 pb-2 md:pb-4">
//             <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
//               Create Your Event Type
//             </h2>
//           </div>

//           {/* Form Content */}
//           <div className="space-y-4 md:space-y-6 flex-grow">
//             {/* Event Name */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
//                 Event Name
//               </label>
//               <input
//                 type="text"
//                 value={eventName}
//                 onChange={(e) => setEventName(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//                 placeholder="Enter event name"
//               />
//               {errors.eventName && (
//                 <p className="text-red-500 text-sm">{errors.eventName}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
//                 Event Category
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={eventCategory}
//                   onChange={(e) => handleInputChange(e.target.value)}
//                   onFocus={() => setCatDropdownVisible(true)}
//                   onBlur={() => {
//                     setTimeout(() => setCatDropdownVisible(false), 200);
//                   }}
//                   placeholder="Enter or select a category"
//                   className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//                 {isRestricted && (
//                   <p className="mt-1 text-sm text-red-500">
//                     This category is exclusive and cannot be changed.
//                   </p>
//                 )}
//                 {isCatDropdownVisible && !isRestricted && (
//                   <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
//                     {uniquePredefinedCategories?.map((category) => (
//                       <li
//                         key={category}
//                         onClick={() => handleSelectCategory(category)}
//                         className="p-2 cursor-pointer hover:bg-blue-100"
//                       >
//                         {category}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
//                 Event Duration
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={eventDuration}
//                   onChange={(e) => handleInputChange(e.target.value)}
//                   onFocus={() => setDropdownVisible(true)}
//                   onBlur={() => {
//                     setTimeout(() => setDropdownVisible(false), 200);
//                   }}
//                   placeholder="Enter or select duration (minutes)"
//                   className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />

//                 {isDropdownVisible && (
//                   <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
//                     {predefinedDurations.map((duration) => (
//                       <li
//                         key={duration}
//                         onClick={() => handleSelectDuration(duration)}
//                         className="p-2 cursor-pointer hover:bg-blue-100"
//                       >
//                         {duration} minutes
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>

//               {errors.eventDuration && (
//                 <p className="text-red-500 text-sm">{errors.eventDuration}</p>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
//                 Meeting Gap
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   value={bookingGap}
//                   onChange={(e) => handleGapInputChange(e.target.value)}
//                   onFocus={() => setGapDropdownVisible(true)}
//                   onBlur={() => {
//                     setTimeout(() => setGapDropdownVisible(false), 200);
//                   }}
//                   placeholder="Enter or select gap (minutes)"
//                   className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />

//                 {isGapDropdownVisible && (
//                   <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
//                     {predefinedGaps.map((gap) => (
//                       <li
//                         key={gap}
//                         onClick={() => handleSelectGap(gap)}
//                         className="p-2 cursor-pointer hover:bg-blue-100"
//                       >
//                         {gap} minutes
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//               {errors.gap && (
//                 <p className="text-red-500 text-sm">{errors.gap}</p>
//               )}
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
//                 Description
//               </label>
//               <textarea
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//                 rows={4}
//                 placeholder="Enter event description"
//               />
//               {errors.description && (
//                 <p className="text-red-500 text-sm">{errors.description}</p>
//               )}
//             </div>

//             {/* Weekday Selection */}
//             <div>
//               <h3 className="text-lg font-semibold text-gray-800 mb-1 md:mb-2">
//                 Select Weekdays
//               </h3>
//               <Testing
//                 eventId={eventId}
//                 update={false}
//                 eventDays={eventData}
//                 setEventDays={setEventDays}
//                 onError={handleErrors}
//               />
//             </div>
//           </div>

//           {globalErrors.length > 0 && (
//             <div className="error-messages text-red-500 mt-2 md:mt-4">
//               {globalErrors.map((error, index) => (
//                 <div key={index}>{error}</div>
//               ))}
//             </div>
//           )}

//           {validationErrors.length > 0 && (
//             <div className="text-red-500 text-sm mt-2 md:mt-4">
//               {validationErrors.map((error, index) => (
//                 <div key={index}>{error}</div>
//               ))}
//             </div>
//           )}

//           {/* Buttons */}
//           <div className="flex gap-2 md:gap-5 cursor-pointer mt-4 md:mt-6">
//             <button className="text-gray-600 py-2 rounded-full transition duration-200 w-full">
//               Cancel
//             </button>
//             <button
//               onClick={() => {
//                 handleSubmit(false, "", true);
//               }}
//               className="bg-blue-600 text-white py-2 px-4 md:px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
//             >
//               Save and Close
//             </button>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div
//           className={`flex flex-col ${
//             isMobile ? "" : "md:flex-row"
//           } min-h-[80vh] h-fit w-full bg-gray-100 p-2 md:p-4 mt-4 md:mt-20`}
//         >
//           {/* Preview Section */}
//           <div
//             className={`transition-all duration-300 border-gray-400 border-t-5 ${
//               isMobile
//                 ? "w-full"
//                 : slots && slots.length > 0
//                 ? "md:w-2/5"
//                 : "md:w-[356px]"
//             } bg-white p-4 md:p-6 rounded-t-md md:rounded-l-md md:rounded-tr-none flex flex-col border-b md:border-b-0 md:border-r border-gray-200`}
//           >
//             <h3 className="text-md font-semibold text-gray-500">
//               {userData.firstName + " " + userData.lastName}
//             </h3>
//             <div className="mb-2 md:mb-4 flex items-start">
//               <h3 className="text-xl md:text-3xl font-semibold text-gray-700 break-words max-w-full">
//                 {eventName || "Event Name "}
//               </h3>
//             </div>
//             <p className="mb-1 md:mb-2 flex items-start">
//               <div className="flex-shrink-0 mt-0.5">
//                 <Clock size={20} color="gray" />
//               </div>
//               <span className="ml-2 text-gray-500 break-words max-w-full">
//                 {eventDuration ? `${eventDuration} min` : "Event Duration"}
//               </span>
//             </p>
//             <h3 className="mb-1 md:mb-2 text-md text-gray-500 flex items-start break-words">
//               <div className="flex-shrink-0 mt-0.5">
//                 <FileText size={20} color="gray" className="text-gray-600" />
//               </div>
//               <span className="ml-2 text-gray-500 break-words max-w-full">
//                 {description || "Event Description"}
//               </span>
//             </h3>
//           </div>

//           {/* Calendar Section */}
//           <div
//             className={`relative transition-all duration-300 ${
//               isMobile
//                 ? "w-full"
//                 : slots && slots.length > 0
//                 ? "md:w-3/5"
//                 : "md:w-fit"
//             } bg-white p-4 md:p-6 rounded-b-md md:rounded-r-md flex flex-col border-gray-200`}
//           >
//             {loading && (
//               <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-75 flex items-center justify-center z-10">
//                 <ThreeDots
//                   height="80"
//                   width="80"
//                   radius="40"
//                   color="gray"
//                   ariaLabel="three-dots-loading"
//                 />
//               </div>
//             )}

//             <div>
//               <span className="font-bold text-lg md:text-xl text-gray-700">
//                 Select Date and Time
//               </span>
//             </div>

//             {/* Calendar Component */}
//             <div className={`flex ${isMobile ? "flex-col" : "flex-row"}`}>
//               <div className={`${isMobile ? "w-full" : ""}`}>
//                 <DayPicker
//                   modifiers={modifiers}
//                   modifiersStyles={modifiersStyles}
//                   styles={styles}
//                   disabled={[
//                     { before: new Date() },
//                     (date) => {
//                       const targetDate = new Date(date).setHours(0, 0, 0, 0);
//                       return !next30AvailableDays.some(
//                         (availableDate: any) =>
//                           new Date(availableDate).setHours(0, 0, 0, 0) ===
//                           targetDate
//                       );
//                     },
//                   ]}
//                   onSelect={(date: Date | undefined) => {
//                     if (!date) return;
//                     setSelectedDate(date);
//                     if (!isPreview) {
//                       setSlotIsLoading(true);
//                       handleSubmit(true, date, false);
//                     } else {
//                       handleSlots(date);
//                     }
//                   }}
//                   mode="single"
//                   selected={selectedDate as any}
//                 />

//                 <div className="mt-4 md:mt-6">
//                   <div>
//                     <span className="font-bold text-sm md:text-md">
//                       Time zone
//                     </span>
//                   </div>
//                   <div className="mt-1">
//                     <span className="flex gap-1">
//                       <Globe2Icon size={16} className="mt-1.5" />
//                       <span className="text-sm font-sans mt-1">
//                         Indian Standard Time ({currentISTTime})
//                       </span>
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Slots Section */}
//               {orgSelectedDate && (
//                 <div
//                   className={`${
//                     isMobile ? "mt-4 w-full" : "m-3"
//                   } flex-grow overflow-y-auto max-h-[calc(100vh-12rem)]`}
//                 >
//                   <div>
//                     <span className="font-2xl md:font-3xl font-bold text-gray-700">
//                       {orgSelectedDate.toLocaleDateString("en-US", {
//                         weekday: "long",
//                         month: "long",
//                         day: "numeric",
//                       })}
//                     </span>
//                   </div>

//                   {isSlotLoading ? (
//                     <div
//                       className={`${
//                         isMobile ? "w-full" : "ml-1 w-44"
//                       } mb-2 mr-0 md:mr-4`}
//                     >
//                       <div className="px-10 py-3 mt-4 flex flex-col items-center justify-center rounded-sm">
//                         <div className="text-blue-600 font-semibold">
//                           <ColorRing
//                             visible={true}
//                             height="80"
//                             width="80"
//                             ariaLabel="color-ring-loading"
//                             wrapperStyle={{}}
//                             wrapperClass="color-ring-wrapper"
//                             colors={[
//                               "#3b82f6",
//                               "#3b82f6",
//                               "#3b82f6",
//                               "#3b82f6",
//                               "#3b82f6",
//                             ]}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div
//                       className={`grid ${
//                         isMobile ? "grid-cols-2" : "grid-cols-1"
//                       } gap-2`}
//                     >
//                       {slots?.map((slot: any, index: any) => (
//                         <div
//                           key={index}
//                           className={`${
//                             isMobile ? "w-full" : "ml-1 w-44"
//                           } mb-2 mr-0 md:mr-4`}
//                         >
//                           <div className="border border-blue-500 px-4 md:px-10 py-3 mt-2 md:mt-4 flex flex-col items-center justify-center rounded-sm">
//                             <div className="text-blue-600 font-semibold">
//                               {slot}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Toaster
//         position={isMobile ? "bottom-center" : "top-center"}
//         reverseOrder={false}
//         gutter={8}
//         containerClassName=""
//         containerStyle={{}}
//         toastOptions={{
//           className: "",
//           style: {
//             background: "#fff",
//             color: "#3b82f6",
//             border: "",
//             borderColor: "#3b82f6",
//           },
//           success: {
//             duration: 3000,
//             iconTheme: {
//               primary: "green",
//               secondary: "white",
//             },
//           },
//         }}
//       />
//     </>
//   );
// };

// export default EventScheduler;

// import "react-day-picker/dist/style.css";
// import { addDays, format } from "date-fns";
// import { ColorRing, ThreeDots } from "react-loader-spinner";
// import {
//   ChevronLeft,
//   Clock,
//   FileText,
//   Globe2Icon,
//   ArrowLeft,
// } from "lucide-react";
// import { DayPicker } from "react-day-picker";
// import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import { axiosInstance } from "./config/http";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addActiveNavState } from "./app-store/gloabalSlice";
// import Testing from "./Testing";

// const EventScheduler = () => {
//   const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

//   const [bookingGap, setBookingGap] = useState(0);
//   const [isGapDropdownVisible, setGapDropdownVisible] = useState(false);
//   const predefinedGaps = ["5", "10", "15"];

//   const handleGapInputChange = (value: any) => {
//     setBookingGap(value);
//   };

//   const handleSelectGap = (gap: any) => {
//     setBookingGap(gap);
//     setDropdownVisible(false);
//   };

//   const categoryData: any = useSelector(
//     (state: any) => state.event.categoryData
//   );

//   const predefinedCategories = [
//     "General",
//     "Litmus Test Interview",
//     "Application Test Interview",
//     "Webinar",
//     "Panel Discussion",
//     "Training Session",
//   ];

//   const uniquePredefinedCategories = predefinedCategories.filter((category) => {
//     if (
//       category === "Litmus Test Interview" ||
//       category === "Application Test Interview"
//     ) {
//       return !categoryData.includes(category);
//     }
//     return true;
//   });

//   const [eventCategory, setEventCategory] = useState("General");
//   const [isCatDropdownVisible, setCatDropdownVisible] = useState(false);
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const predefinedDurations = ["2", "15", "30", "45", "60", "90", "120"];
//   const [eventDuration, setEventDuration] = useState("");
//   const [isSlotLoading, setSlotIsLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [isPreview, setIsPreview] = useState(false);
//   const [orgSelectedDate, setOrgSelectedDate] = useState<Date | null>(null);
//   const [slots, setSlots] = useState([]);
//   const [orgData, setOrgData] = useState([] as any);
//   const dispatch = useDispatch();

//   // Mobile flow state
//   const [mobileStep, setMobileStep] = useState(1); // 1: form, 2: calendar/preview

//   const handleSlots = (clickedDate?: Date) => {
//     const timeSlots = clickedDate
//       ? orgData.find(
//           (day: any) => day.eventDate === format(clickedDate, "yyyy-MM-dd")
//         )?.slots || []
//       : [];

//     setSlotIsLoading(false);
//     setSlots(timeSlots);
//     setOrgSelectedDate(clickedDate || selectedDate);
//     setIsPreview(true);
//   };

//   const [restrictedCategory, setRestrictedCategory] = useState("");
//   const [searchParams] = useSearchParams();
//   const eventId = searchParams.get("eventId");

//   useEffect(() => {
//     const fetchingEditData = async () => {
//       const editEventdata = await axiosInstance.get(
//         `/events/event-data/${eventId}`
//       );
//       setEventName(editEventdata.data.data.eventName);
//       setEventDuration(editEventdata.data.data.eventDuration);
//       setDescription(editEventdata.data.data.eventDescription);
//       setEventCategory(editEventdata.data.data.eventCategory);
//       setRestrictedCategory(editEventdata.data.data.eventCategory);
//       setBookingGap(editEventdata.data.data.meetingGap);
//     };

//     fetchingEditData();
//   }, [eventId]);

//   const userData = useSelector((state: any) => state.registration.userData);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   let eventData = [
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [
//         {
//           start: "10:30am",
//           end: "6:00pm",
//           error: "",
//         },
//       ],
//     },
//   ];

//   const [availableDays, setAvailableDays] = useState([]);
//   const [next30AvailableDays, setNext30AvailableDays] = useState([]);
//   const [eventDatas, setEventDatas] = useState(eventData);

//   const setEventDays = (updatedEventData: any) => {
//     setSlots([]);
//     setSlotIsLoading(false);
//     setIsPreview(false);
//     setOrgSelectedDate(null);
//     setEventDatas([]);
//     setLoading(true);
//     setTimeout(() => {
//       setEventDatas(updatedEventData);
//       setLoading(false);
//     }, 1000);
//   };

//   useEffect(() => {
//     const daysMapping = eventDatas
//       .map((event, index) => (event.isAvailable ? index : null))
//       .filter((day) => day !== null);
//     setAvailableDays(daysMapping as any);
//   }, [eventDatas, eventDuration]);

//   useEffect(() => {
//     const generateNext30AvailableDays = () => {
//       const result: any = [];
//       let currentDate: Date = new Date();
//       while (result.length < 7) {
//         if ((availableDays as any).includes(currentDate.getDay())) {
//           result.push(new Date(currentDate));
//         }
//         currentDate = addDays(currentDate, 1);
//       }
//       setNext30AvailableDays(result);
//     };

//     if (availableDays.length > 0) {
//       generateNext30AvailableDays();
//     } else {
//       setNext30AvailableDays([]);
//     }
//   }, [availableDays]);

//   const modifiers: any = {
//     available: next30AvailableDays,
//     today: new Date(),
//     day: {
//       color: "gray",
//     },
//   };

//   const styles = {
//     day: {
//       color: "#6b7280",
//     },
//   };

//   const modifiersStyles = {
//     available: {
//       backgroundColor: "#dbeafe",
//       color: "#3b82f6",
//       borderRadius: "50%",
//     },
//     today: {
//       color: "#1d4ed8",
//       fontWeight: "",
//     },
//     day: {
//       color: "gray",
//     },
//   };

//   const [eventName, setEventName] = useState("");
//   const [description, setDescription] = useState("");
//   const [errors, setErrors] = useState({
//     eventName: "",
//     eventDuration: "",
//     description: "",
//     gap: "",
//   });

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {
//       eventName: "",
//       eventDuration: "",
//       description: "",
//       gap: "",
//     };

//     if (!eventName.trim()) {
//       newErrors.eventName = "Event Name is required";
//       valid = false;
//       setIsPreview(false);
//     }

//     if (!eventDuration) {
//       newErrors.eventDuration = "Event Duration is required";
//       valid = false;
//     } else if (isNaN(eventDuration as any) || (eventDuration as any) <= 0) {
//       newErrors.eventDuration =
//         "Event Duration must be a valid positive number";
//       valid = false;
//       setIsPreview(false);
//     } else if ((eventDuration as any) < 2) {
//       newErrors.eventDuration = "Event Duration must be at least 2 minutes";
//       valid = false;
//       setIsPreview(false);
//     } else if ((eventDuration as any) > 1439) {
//       newErrors.eventDuration = "Event Duration must not exceed 1439 minutes";
//       valid = false;
//       setIsPreview(false);
//     }

//     if (bookingGap > 15) {
//       newErrors.gap = "The booking gap must be less than 15";
//       valid = false;
//       setIsPreview(false);
//     }
//     if (description.split(/\s+/).filter(Boolean).length > 60) {
//       newErrors.description = "The description must have 60 words or fewer.";
//       valid = false;
//       setIsPreview(false);
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const [currentISTTime, setCurrentISTTime] = useState("");

//   useEffect(() => {
//     const updateTime = () => {
//       const date = new Date();
//       const istOffset = 330;
//       const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
//       const istTime = new Date(utcTime + istOffset * 60000);
//       const options = {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       };
//       const formattedTime = istTime.toLocaleTimeString("en-IN", options as any);
//       setCurrentISTTime(formattedTime);
//     };

//     updateTime();
//     const now = new Date();
//     const delay = (60 - now.getSeconds()) * 1000;
//     const timeout = setTimeout(() => {
//       updateTime();
//       const interval = setInterval(updateTime, 60000);
//       return () => clearInterval(interval);
//     }, delay);
//     return () => clearTimeout(timeout);
//   }, []);

//   const [globalErrors, setGlobalErrors] = useState<string[]>([]);
//   const [otherErrors, setOtherErrors] = useState<string[]>([]);

//   const handleErrors = (errorList: string[], otherErrorList: any) => {
//     setOtherErrors(otherErrorList);
//     setGlobalErrors(errorList);
//   };

//   const validateEventData = (eventData: any, requiredDuration: any) => {
//     let isValid = true;
//     const errors: string[] = [];

//     eventData.forEach((day: any, dayIndex: number) => {
//       if (!day.isAvailable) {
//         return;
//       }

//       day.timeSlots.forEach((slot: any, slotIndex: number) => {
//         const startMinutes: any = timeToMinutes(slot.start);
//         const endMinutes: any = timeToMinutes(slot.end);

//         if (!slot.start || !slot.end) {
//           isValid = false;
//           errors.push(
//             `Error: Missing start or end time for slot ${
//               slotIndex + 1
//             } on day ${dayIndex + 1}.`
//           );
//           slot.error = "Start and end times are required.";
//           return;
//         }

//         if (startMinutes < 0 || startMinutes >= 1440) {
//           isValid = false;
//           errors.push(
//             `Error: Start time ${slot.start} for slot ${slotIndex + 1} on day ${
//               dayIndex + 1
//             } is out of bounds.`
//           );
//           slot.error = "Start time must be between 12:00am and 11:59pm.";
//         }

//         if (endMinutes <= 0 || endMinutes > 1440) {
//           isValid = false;
//           errors.push(
//             `Error: End time ${slot.end} for slot ${slotIndex + 1} on day ${
//               dayIndex + 1
//             } is out of bounds.`
//           );
//           slot.error = "End time must be between 12:00am and 11:59pm.";
//         }

//         if (endMinutes <= startMinutes) {
//           isValid = false;
//           errors.push(
//             `Error: End time ${slot.end} must be greater than start time ${
//               slot.start
//             } for slot ${slotIndex + 1} on day ${dayIndex + 1}.`
//           );
//           slot.error = "End time must be greater than start time.";
//         }

//         const slotDuration = endMinutes - startMinutes;
//         if (slotDuration < requiredDuration) {
//           isValid = false;
//           errors.push(
//             `Error: Slot from ${slot.start} to ${slot.end} on day ${
//               dayIndex + 1
//             } must be at least ${requiredDuration} minutes.`
//           );
//           slot.error = `Slot duration is less than ${requiredDuration} minutes.`;
//         }

//         if (isValid) {
//           slot.error = "";
//         }
//       });
//     });

//     return { isValid, errors };
//   };

//   const timeToMinutes = (time: any) => {
//     if (time) {
//       const [_, hours, minutes, meridian] = time.match(
//         /(\d{1,2}):(\d{2})(am|pm)/
//       );
//       let totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
//       if (meridian.toLowerCase() === "pm" && hours !== "12") {
//         totalMinutes += 12 * 60;
//       } else if (meridian.toLowerCase() === "am" && hours === "12") {
//         totalMinutes -= 12 * 60;
//       }
//       return totalMinutes;
//     }
//   };

//   const [validationErrors, setValidationErrors] = useState([]);

//   const handleValidation = () => {
//     const { isValid, errors }: any = validateEventData(
//       eventDatas,
//       eventDuration
//     );

//     setValidationErrors(errors);
//     return isValid;
//   };

//   const handleInputChange = (value: any) => {
//     setEventDuration(value);
//     if (value && !/^\d+$/.test(value)) {
//       setErrors({
//         eventDuration: "Please enter a valid number for duration.",
//       } as any);
//     } else if (value && Number(value) <= 0) {
//       setErrors({ eventDuration: "Duration must be greater than 0." } as any);
//     } else {
//       setErrors({ eventDuration: "" } as any);
//     }
//   };

//   const handleSelectDuration = (value: any) => {
//     setEventDuration(value);
//     setDropdownVisible(false);
//     setErrors({ eventDuration: "" } as any);
//   };

//   const handleSelectCategory = (value: any) => {
//     setEventCategory(value);
//     setDropdownVisible(false);
//     setErrors({ eventCategory: "" } as any);
//   };

//   const handleSubmit = async (
//     edit: boolean,
//     clickedDate?: any,
//     dataSubmit?: boolean
//   ) => {
//     const index: any = 0;
//     if (validateForm()) {
//       if (globalErrors.length === 0 && otherErrors.length === 0) {
//         if (handleValidation()) {
//           try {
//             let response;
//             if (dataSubmit) {
//               toast.loading("Your Event is Creating....");
//               response = await axiosInstance.post("/events?preview=false", {
//                 eventName,
//                 eventDuration,
//                 eventDescription: description,
//                 eventDatas,
//                 eventId,
//                 meetingGap: bookingGap,
//                 eventCategory: eventCategory,
//               });
//             } else {
//               response = await axiosInstance.post("/events?preview=true", {
//                 eventName,
//                 eventDuration,
//                 eventDescription: description,
//                 eventDatas,
//                 eventId,
//                 meetingGap: bookingGap,
//                 eventCategory: eventCategory,
//               });
//             }

//             if (response.data.success) {
//               if (edit) {
//                 setSlotIsLoading(true);
//                 setOrgSelectedDate(clickedDate as any);
//                 setOrgData(response.data.data);
//               }
//               if (dataSubmit) {
//                 navigate("/events/user/me");
//                 toast.dismiss();
//                 toast.success("Your event was created successfully!");
//                 dispatch(addActiveNavState(index));
//               }
//             } else {
//               toast.dismiss();
//               setTimeout(() => {
//                 toast.error("There is an error!");
//               }, 2000);
//             }
//           } catch (error: any) {
//             console.error("Error:", error);
//           }
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     if (orgData && orgData.length > 0) {
//       setTimeout(() => {
//         handleSlots(selectedDate as any);
//       }, 3000);
//     }
//   }, [orgData]);

//   useEffect(() => {
//     setOrgSelectedDate(null);
//     setSlots([]);
//     setSlotIsLoading(false);
//     setIsPreview(false);
//   }, [eventDuration, bookingGap]);

//   const isRestricted = [
//     "Litmus Test Interview",
//     "Application Test Interview",
//   ].includes(restrictedCategory);

//   // Responsive breakpoints
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//   const isMobile = windowWidth <= 768;

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Mobile flow handlers
//   const handleNextStep = () => {
//     if (
//       validateForm() &&
//       globalErrors.length === 0 &&
//       otherErrors.length === 0 &&
//       handleValidation()
//     ) {
//       setMobileStep(2);
//     }
//   };

//   const handleBackToForm = () => {
//     setMobileStep(1);
//   };

//   return (
//     <>
//       <div
//         className={`flex flex-col md:flex-row bg-gray-100 min-h-screen ${
//           orgSelectedDate ? "" : "md:justify-between md:gap-40"
//         }`}
//       >
//         {/* Form Section - Always visible on desktop, conditionally on mobile */}
//         {(mobileStep === 1 || !isMobile) && (
//           <div
//             className={`w-full ${
//               isMobile ? "" : "md:w-[680px]"
//             } h-auto md:h-screen overflow-y-auto bg-white shadow-md p-4 md:p-6 flex flex-col justify-between`}
//           >
//             <div className="mt-2 mb-1 flex cursor-pointer">
//               <ChevronLeft color="#3b82f6" size={17} className="mt-1" />
//               <span
//                 className="font-semibold text-blue-500"
//                 onClick={() => {
//                   navigate("/events/user/me");
//                 }}
//               >
//                 Back
//               </span>
//             </div>
//             <div className="flex justify-between items-center border-blue-500 pt-2 md:pt-4 pb-2 md:pb-4">
//               <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
//                 Create Your Event Type
//               </h2>
//             </div>

//             <div className="space-y-4 md:space-y-6 flex-grow">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
//                   Event Name
//                 </label>
//                 <input
//                   type="text"
//                   value={eventName}
//                   onChange={(e) => setEventName(e.target.value)}
//                   className="w-full p-2 border rounded-md"
//                   placeholder="Enter event name"
//                 />
//                 {errors.eventName && (
//                   <p className="text-red-500 text-sm">{errors.eventName}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
//                   Event Category
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={eventCategory}
//                     onChange={(e) => handleInputChange(e.target.value)}
//                     onFocus={() => setCatDropdownVisible(true)}
//                     onBlur={() => {
//                       setTimeout(() => setCatDropdownVisible(false), 200);
//                     }}
//                     placeholder="Enter or select a category"
//                     className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                   {isRestricted && (
//                     <p className="mt-1 text-sm text-red-500">
//                       This category is exclusive and cannot be changed.
//                     </p>
//                   )}
//                   {isCatDropdownVisible && !isRestricted && (
//                     <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
//                       {uniquePredefinedCategories?.map((category) => (
//                         <li
//                           key={category}
//                           onClick={() => handleSelectCategory(category)}
//                           className="p-2 cursor-pointer hover:bg-blue-100"
//                         >
//                           {category}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
//                   Event Duration
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={eventDuration}
//                     onChange={(e) => handleInputChange(e.target.value)}
//                     onFocus={() => setDropdownVisible(true)}
//                     onBlur={() => {
//                       setTimeout(() => setDropdownVisible(false), 200);
//                     }}
//                     placeholder="Enter or select duration (minutes)"
//                     className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />

//                   {isDropdownVisible && (
//                     <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
//                       {predefinedDurations.map((duration) => (
//                         <li
//                           key={duration}
//                           onClick={() => handleSelectDuration(duration)}
//                           className="p-2 cursor-pointer hover:bg-blue-100"
//                         >
//                           {duration} minutes
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>

//                 {errors.eventDuration && (
//                   <p className="text-red-500 text-sm">{errors.eventDuration}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
//                   Meeting Gap
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={bookingGap}
//                     onChange={(e) => handleGapInputChange(e.target.value)}
//                     onFocus={() => setGapDropdownVisible(true)}
//                     onBlur={() => {
//                       setTimeout(() => setGapDropdownVisible(false), 200);
//                     }}
//                     placeholder="Enter or select gap (minutes)"
//                     className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />

//                   {isGapDropdownVisible && (
//                     <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-40 overflow-y-auto">
//                       {predefinedGaps.map((gap) => (
//                         <li
//                           key={gap}
//                           onClick={() => handleSelectGap(gap)}
//                           className="p-2 cursor-pointer hover:bg-blue-100"
//                         >
//                           {gap} minutes
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 {errors.gap && (
//                   <p className="text-red-500 text-sm">{errors.gap}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full p-2 border rounded-md"
//                   rows={4}
//                   placeholder="Enter event description"
//                 />
//                 {errors.description && (
//                   <p className="text-red-500 text-sm">{errors.description}</p>
//                 )}
//               </div>

//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800 mb-1 md:mb-2">
//                   Select Weekdays
//                 </h3>
//                 <Testing
//                   eventId={eventId}
//                   update={false}
//                   eventDays={eventData}
//                   setEventDays={setEventDays}
//                   onError={handleErrors}
//                 />
//               </div>
//             </div>

//             {globalErrors.length > 0 && (
//               <div className="error-messages text-red-500 mt-2 md:mt-4">
//                 {globalErrors.map((error, index) => (
//                   <div key={index}>{error}</div>
//                 ))}
//               </div>
//             )}

//             {validationErrors.length > 0 && (
//               <div className="text-red-500 text-sm mt-2 md:mt-4">
//                 {validationErrors.map((error, index) => (
//                   <div key={index}>{error}</div>
//                 ))}
//               </div>
//             )}

//             {/* Buttons - Show Next on mobile, Save and Close on desktop */}
//             {/* <div className="flex gap-2 md:gap-5 cursor-pointer mt-4 md:mt-6">
//               <button className="text-gray-600 py-2 rounded-full transition duration-200 w-full">
//                 Cancel
//               </button>
//               {isMobile ? (
//                 <button
//                   onClick={handleNextStep}
//                   className="bg-blue-600 text-white py-2 px-4 md:px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     handleSubmit(false, "", true);
//                   }}
//                   className="bg-blue-600 text-white py-2 px-4 md:px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
//                 >
//                   Save and Close
//                 </button>
//               )}
//             </div> */}
//             <div className="flex gap-2 md:gap-5 cursor-pointer mt-4 md:mt-6">
//               {!isMobile && (
//                 <button className="text-gray-600 py-2 rounded-full transition duration-200 w-full">
//                   Cancel
//                 </button>
//               )}
//               {isMobile ? (
//                 <button
//                   onClick={handleNextStep}
//                   className="bg-blue-600 text-white py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => {
//                     handleSubmit(false, "", true);
//                   }}
//                   className="bg-blue-600 text-white py-2 px-4 md:px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
//                 >
//                   Save and Close
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Calendar/Preview Section - Show on mobile only in step 2 */}
//         {(mobileStep === 2 || !isMobile) && (
//           <div
//             className={`flex flex-col ${
//               isMobile ? "" : "md:flex-row"
//             } min-h-[80vh] h-fit w-full bg-gray-100 p-2 md:p-4 mt-4 md:mt-20`}
//           >
//             {/* Back button for mobile */}
//             {isMobile && (
//               <div
//                 className="mb-2 flex items-center cursor-pointer"
//                 onClick={handleBackToForm}
//               >
//                 <ArrowLeft size={20} className="text-blue-500" />
//                 <span className="ml-2 text-blue-500">Back to form</span>
//               </div>
//             )}

//             {/* Preview Section */}
//             <div
//               className={`transition-all duration-300 border-gray-400 border-t-5 ${
//                 isMobile
//                   ? "w-full"
//                   : slots && slots.length > 0
//                   ? "md:w-2/5"
//                   : "md:w-[356px]"
//               } bg-white p-4 md:p-6 rounded-t-md md:rounded-l-md md:rounded-tr-none flex flex-col border-b md:border-b-0 md:border-r border-gray-200`}
//             >
//               <h3 className="text-md font-semibold text-gray-500">
//                 {userData.firstName + " " + userData.lastName}
//               </h3>
//               <div className="mb-2 md:mb-4 flex items-start">
//                 <h3 className="text-xl md:text-3xl font-semibold text-gray-700 break-words max-w-full">
//                   {eventName || "Event Name "}
//                 </h3>
//               </div>
//               <p className="mb-1 md:mb-2 flex items-start">
//                 <div className="flex-shrink-0 mt-0.5">
//                   <Clock size={20} color="gray" />
//                 </div>
//                 <span className="ml-2 text-gray-500 break-words max-w-full">
//                   {eventDuration ? `${eventDuration} min` : "Event Duration"}
//                 </span>
//               </p>
//               <h3 className="mb-1 md:mb-2 text-md text-gray-500 flex items-start break-words">
//                 <div className="flex-shrink-0 mt-0.5">
//                   <FileText size={20} color="gray" className="text-gray-600" />
//                 </div>
//                 <span className="ml-2 text-gray-500 break-words max-w-full">
//                   {description || "Event Description"}
//                 </span>
//               </h3>
//             </div>

//             {/* Calendar Section */}

//             <div
//               className={`relative transition-all duration-300 ${
//                 isMobile
//                   ? "w-full"
//                   : slots && slots.length > 0
//                   ? "md:w-3/5"
//                   : "md:w-fit"
//               } bg-white p-4 md:p-6 rounded-b-md md:rounded-r-md flex flex-col border-gray-200`}
//             >
//               {loading && (
//                 <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-75 flex items-center justify-center z-10">
//                   <ThreeDots
//                     height="80"
//                     width="80"
//                     radius="40"
//                     color="gray"
//                     ariaLabel="three-dots-loading"
//                   />
//                 </div>
//               )}

//               <div className="px-2">
//                 {" "}
//                 {/* Added padding container */}
//                 <span className="font-bold text-lg md:text-xl text-gray-700">
//                   Select Date and Time
//                 </span>
//               </div>

//               {/* Calendar Component */}
//               <div
//                 className={`flex ${
//                   isMobile ? "flex-col items-center" : "flex-row"
//                 } px-2`}
//               >
//                 {" "}
//                 {/* Added padding */}
//                 <div className={`${isMobile ? "w-full max-w-xs" : ""}`}>
//                   <DayPicker
//                     modifiers={modifiers}
//                     modifiersStyles={modifiersStyles}
//                     styles={styles}
//                     disabled={[
//                       { before: new Date() },
//                       (date) => {
//                         const targetDate = new Date(date).setHours(0, 0, 0, 0);
//                         return !next30AvailableDays.some(
//                           (availableDate: any) =>
//                             new Date(availableDate).setHours(0, 0, 0, 0) ===
//                             targetDate
//                         );
//                       },
//                     ]}
//                     onSelect={(date: Date | undefined) => {
//                       if (!date) return;
//                       setSelectedDate(date);
//                       if (!isPreview) {
//                         setSlotIsLoading(true);
//                         handleSubmit(true, date, false);
//                       } else {
//                         handleSlots(date);
//                       }
//                     }}
//                     mode="single"
//                     selected={selectedDate as any}
//                   />

//                   <div className="mt-4 md:mt-6 px-2">
//                     {" "}
//                     {/* Added padding */}
//                     <div className="flex flex-col">
//                       <span className="font-bold text-sm md:text-md">
//                         Time zone
//                       </span>
//                       <span className="flex items-center gap-1 mt-1">
//                         <Globe2Icon size={16} className="text-gray-500" />
//                         <span className="text-sm font-sans text-gray-600">
//                           Indian Standard Time ({currentISTTime})
//                         </span>
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Enhanced Preview Section for Mobile */}
//                 {isMobile && orgSelectedDate && (
//                   <div className="w-full mt-4 px-2">
//                     {" "}
//                     {/* Added padding */}
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       {" "}
//                       {/* Styled container */}
//                       <h3 className="font-semibold text-gray-700 mb-2">
//                         Available Time Slots
//                       </h3>
//                       {isSlotLoading ? (
//                         <div className="flex justify-center py-4">
//                           <ThreeDots color="#3b82f6" height={30} width={30} />
//                         </div>
//                       ) : (
//                         <div className="grid grid-cols-2 gap-2">
//                           {slots?.map((slot: any, index: any) => (
//                             <div
//                               key={index}
//                               className="bg-white border border-blue-200 rounded-md p-3 text-center shadow-sm hover:bg-blue-50 transition-colors"
//                             >
//                               <span className="text-blue-600 font-medium">
//                                 {slot}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//                 {/* Desktop Slots Section */}
//                 {!isMobile && orgSelectedDate && (
//                   <div className="m-3 flex-grow overflow-y-auto max-h-[calc(100vh-12rem)]">
//                     <div>
//                       <span className="font-2xl md:font-3xl font-bold text-gray-700">
//                         {orgSelectedDate.toLocaleDateString("en-US", {
//                           weekday: "long",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                       </span>
//                     </div>

//                     {isSlotLoading ? (
//                       <div className="ml-1 w-44 mb-2 mr-4">
//                         <div className="px-10 py-3 mt-4 flex flex-col items-center justify-center rounded-sm">
//                           <ColorRing
//                             visible={true}
//                             height="80"
//                             width="80"
//                             ariaLabel="color-ring-loading"
//                             colors={[
//                               "#3b82f6",
//                               "#3b82f6",
//                               "#3b82f6",
//                               "#3b82f6",
//                               "#3b82f6",
//                             ]}
//                           />
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="grid grid-cols-1 gap-2">
//                         {slots?.map((slot: any, index: any) => (
//                           <div key={index} className="ml-1 w-44 mb-2 mr-4">
//                             <div className="border border-blue-500 px-10 py-3 mt-4 flex flex-col items-center justify-center rounded-sm">
//                               <div className="text-blue-600 font-semibold">
//                                 {slot}
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Create Event button for mobile */}
//               {isMobile && (
//                 <div className="mt-6 px-4">
//                   {" "}
//                   {/* Added padding */}
//                   <button
//                     onClick={() => {
//                       handleSubmit(false, "", true);
//                     }}
//                     className="bg-blue-600 text-white py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
//                   >
//                     Create Event
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//       <Toaster
//         position={isMobile ? "bottom-center" : "top-center"}
//         reverseOrder={false}
//         gutter={8}
//         containerClassName=""
//         containerStyle={{}}
//         toastOptions={{
//           className: "",
//           style: {
//             background: "#fff",
//             color: "#3b82f6",
//             border: "",
//             borderColor: "#3b82f6",
//           },
//           success: {
//             duration: 3000,
//             iconTheme: {
//               primary: "green",
//               secondary: "white",
//             },
//           },
//         }}
//       />
//     </>
//   );
// };

// export default EventScheduler;

// okay above

import "react-day-picker/dist/style.css";
import { addDays, format } from "date-fns";
import { ColorRing, ThreeDots } from "react-loader-spinner";
import {
  ChevronLeft,
  Clock,
  FileText,
  Globe2Icon,
  ArrowLeft,
  X,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance } from "./config/http";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addActiveNavState } from "./app-store/gloabalSlice";
import Testing from "./Testing";

const EventScheduler = () => {
  // const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const [bookingGap, setBookingGap] = useState(0);
  const [isGapDropdownVisible, setGapDropdownVisible] = useState(false);
  const predefinedGaps = ["5", "10", "15"];

  const handleGapInputChange = (value: any) => {
    setBookingGap(value);
  };

  const handleSelectGap = (gap: any) => {
    setBookingGap(gap);
    setGapDropdownVisible(false);
  };

  const categoryData: any = useSelector(
    (state: any) => state.event.categoryData
  );

  const predefinedCategories = [
    "General",
    "Litmus Test Interview",
    "Application Test Interview",
    "Webinar",
    "Panel Discussion",
    "Training Session",
  ];

  const uniquePredefinedCategories = predefinedCategories.filter((category) => {
    if (
      category === "Litmus Test Interview" ||
      category === "Application Test Interview"
    ) {
      return !categoryData.includes(category);
    }
    return true;
  });

  const [eventCategory, setEventCategory] = useState("General");
  const [isCatDropdownVisible, setCatDropdownVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const predefinedDurations = ["2", "15", "30", "45", "60", "90", "120"];
  const [eventDuration, setEventDuration] = useState("");
  const [isSlotLoading, setSlotIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [orgSelectedDate, setOrgSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState([]);
  const [orgData, setOrgData] = useState([] as any);
  const dispatch = useDispatch();
  const [showMobileSlotsModal, setShowMobileSlotsModal] = useState(false);

  // Mobile flow state
  const [mobileStep, setMobileStep] = useState(1); // 1: form, 2: calendar/preview

  const handleSlots = (clickedDate?: Date) => {
    const timeSlots = clickedDate
      ? orgData.find(
          (day: any) => day.eventDate === format(clickedDate, "yyyy-MM-dd")
        )?.slots || []
      : [];

    setSlotIsLoading(true); // Start loading

    // Simulate loading delay (remove this if you have actual async operations)
    setTimeout(() => {
      setSlotIsLoading(false);
      setSlots(timeSlots);
      setOrgSelectedDate(clickedDate || selectedDate);
      setIsPreview(true);
    }, 1000);

    // Show mobile modal if on mobile view
    if (window.innerWidth <= 768) {
      setShowMobileSlotsModal(true);
    }
  };

  const [restrictedCategory, setRestrictedCategory] = useState("");
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  useEffect(() => {
    const fetchingEditData = async () => {
      const editEventdata = await axiosInstance.get(
        `/events/event-data/${eventId}`
      );
      setEventName(editEventdata.data.data.eventName);
      setEventDuration(editEventdata.data.data.eventDuration);
      setDescription(editEventdata.data.data.eventDescription);
      setEventCategory(editEventdata.data.data.eventCategory);
      setRestrictedCategory(editEventdata.data.data.eventCategory);
      setBookingGap(editEventdata.data.data.meetingGap);
    };

    fetchingEditData();
  }, [eventId]);

  const userData = useSelector((state: any) => state.registration.userData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const setEventDays = (updatedEventData: any) => {
    setSlots([]);
    setSlotIsLoading(false);
    setIsPreview(false);
    setOrgSelectedDate(null);
    setEventDatas([]);
    setLoading(true);
    setTimeout(() => {
      setEventDatas(updatedEventData);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const daysMapping = eventDatas
      .map((event, index) => (event.isAvailable ? index : null))
      .filter((day) => day !== null);
    setAvailableDays(daysMapping as any);
  }, [eventDatas, eventDuration]);

  useEffect(() => {
    const generateNext30AvailableDays = () => {
      const result: any = [];
      let currentDate: Date = new Date();
      while (result.length < 7) {
        if ((availableDays as any).includes(currentDate.getDay())) {
          result.push(new Date(currentDate));
        }
        currentDate = addDays(currentDate, 1);
      }
      setNext30AvailableDays(result);
    };

    if (availableDays.length > 0) {
      generateNext30AvailableDays();
    } else {
      setNext30AvailableDays([]);
    }
  }, [availableDays]);

  const modifiers: any = {
    available: next30AvailableDays,
    today: new Date(),
    day: {
      color: "gray",
    },
  };

  const styles = {
    day: {
      color: "#6b7280",
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
      color: "gray",
    },
  };

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
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

    if (!eventName.trim()) {
      newErrors.eventName = "Event Name is required";
      valid = false;
      setIsPreview(false);
    }

    if (!eventDuration) {
      newErrors.eventDuration = "Event Duration is required";
      valid = false;
    } else if (isNaN(eventDuration as any) || (eventDuration as any) <= 0) {
      newErrors.eventDuration =
        "Event Duration must be a valid positive number";
      valid = false;
      setIsPreview(false);
    } else if ((eventDuration as any) < 2) {
      newErrors.eventDuration = "Event Duration must be at least 2 minutes";
      valid = false;
      setIsPreview(false);
    } else if ((eventDuration as any) > 1439) {
      newErrors.eventDuration = "Event Duration must not exceed 1439 minutes";
      valid = false;
      setIsPreview(false);
    }

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

    setErrors(newErrors);
    return valid;
  };

  const [currentISTTime, setCurrentISTTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const istOffset = 330;
      const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
      const istTime = new Date(utcTime + istOffset * 60000);
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const formattedTime = istTime.toLocaleTimeString("en-IN", options as any);
      setCurrentISTTime(formattedTime);
    };

    updateTime();
    const now = new Date();
    const delay = (60 - now.getSeconds()) * 1000;
    const timeout = setTimeout(() => {
      updateTime();
      const interval = setInterval(updateTime, 60000);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  const [globalErrors, setGlobalErrors] = useState<string[]>([]);
  const [otherErrors, setOtherErrors] = useState<string[]>([]);

  const handleErrors = (errorList: string[], otherErrorList: any) => {
    setOtherErrors(otherErrorList);
    setGlobalErrors(errorList);
  };

  const validateEventData = (eventData: any, requiredDuration: any) => {
    let isValid = true;
    const errors: string[] = [];

    eventData.forEach((day: any, dayIndex: number) => {
      if (!day.isAvailable) {
        return;
      }

      day.timeSlots.forEach((slot: any, slotIndex: number) => {
        const startMinutes: any = timeToMinutes(slot.start);
        const endMinutes: any = timeToMinutes(slot.end);

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

        if (startMinutes < 0 || startMinutes >= 1440) {
          isValid = false;
          errors.push(
            `Error: Start time ${slot.start} for slot ${slotIndex + 1} on day ${
              dayIndex + 1
            } is out of bounds.`
          );
          slot.error = "Start time must be between 12:00am and 11:59pm.";
        }

        if (endMinutes <= 0 || endMinutes > 1440) {
          isValid = false;
          errors.push(
            `Error: End time ${slot.end} for slot ${slotIndex + 1} on day ${
              dayIndex + 1
            } is out of bounds.`
          );
          slot.error = "End time must be between 12:00am and 11:59pm.";
        }

        if (endMinutes <= startMinutes) {
          isValid = false;
          errors.push(
            `Error: End time ${slot.end} must be greater than start time ${
              slot.start
            } for slot ${slotIndex + 1} on day ${dayIndex + 1}.`
          );
          slot.error = "End time must be greater than start time.";
        }

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

        if (isValid) {
          slot.error = "";
        }
      });
    });

    return { isValid, errors };
  };

  const timeToMinutes = (time: any) => {
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
    const { isValid, errors }: any = validateEventData(
      eventDatas,
      eventDuration
    );

    setValidationErrors(errors);
    return isValid;
  };

  const handleInputChange = (value: any) => {
    setEventDuration(value);
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
    setEventDuration(value);
    setDropdownVisible(false);
    setErrors({ eventDuration: "" } as any);
  };

  const handleSelectCategory = (value: any) => {
    setEventCategory(value);
    setDropdownVisible(false);
    setErrors({ eventCategory: "" } as any);
  };

  const handleSubmit = async (
    edit: boolean,
    clickedDate?: any,
    dataSubmit?: boolean
  ) => {
    const index: any = 0;
    if (validateForm()) {
      if (globalErrors.length === 0 && otherErrors.length === 0) {
        if (handleValidation()) {
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
              if (edit) {
                setSlotIsLoading(true);
                setOrgSelectedDate(clickedDate as any);
                setOrgData(response.data.data);
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
            console.error("Error:", error);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (orgData && orgData.length > 0) {
      setTimeout(() => {
        handleSlots(selectedDate as any);
      }, 3000);
    }
  }, [orgData]);

  useEffect(() => {
    setOrgSelectedDate(null);
    setSlots([]);
    setSlotIsLoading(false);
    setIsPreview(false);
  }, [eventDuration, bookingGap]);

  const isRestricted = [
    "Litmus Test Interview",
    "Application Test Interview",
  ].includes(restrictedCategory);

  // Responsive breakpoints
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile flow handlers
  const handleNextStep = () => {
    if (
      validateForm() &&
      globalErrors.length === 0 &&
      otherErrors.length === 0 &&
      handleValidation()
    ) {
      setMobileStep(2);
    }
  };

  const handleBackToForm = () => {
    setMobileStep(1);
  };

  return (
    <>
      <div
        className={`flex flex-col md:flex-row bg-gray-100 min-h-screen ${
          orgSelectedDate ? "" : "md:justify-between md:gap-40"
        }`}
      >
        {/* Form Section - Always visible on desktop, conditionally on mobile */}
        {(mobileStep === 1 || !isMobile) && (
          <div
            className={`w-full ${
              isMobile ? "" : "md:w-[680px]"
            } h-auto md:h-screen overflow-y-auto bg-white shadow-md p-4 md:p-6 flex flex-col justify-between`}
          >
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
            <div className="flex justify-between items-center border-blue-500 pt-2 md:pt-4 pb-2 md:pb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Create Your Event Type
              </h2>
            </div>

            <div className="space-y-4 md:space-y-6 flex-grow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Event Category
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={eventCategory}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => setCatDropdownVisible(true)}
                    onBlur={() => {
                      setTimeout(() => setCatDropdownVisible(false), 200);
                    }}
                    placeholder="Enter or select a category"
                    className="w-full p-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
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
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Event Duration
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={eventDuration}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onFocus={() => setDropdownVisible(true)}
                    onBlur={() => {
                      setTimeout(() => setDropdownVisible(false), 200);
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
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
                  Meeting Gap
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={bookingGap}
                    onChange={(e) => handleGapInputChange(e.target.value)}
                    onFocus={() => setGapDropdownVisible(true)}
                    onBlur={() => {
                      setTimeout(() => setGapDropdownVisible(false), 200);
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">
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

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 md:mb-2">
                  Select Weekdays
                </h3>
                <Testing
                  eventId={eventId}
                  update={false}
                  eventDays={eventData}
                  setEventDays={setEventDays}
                  onError={handleErrors}
                />
              </div>
            </div>

            {globalErrors.length > 0 && (
              <div className="error-messages text-red-500 mt-2 md:mt-4">
                {globalErrors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}

            {validationErrors.length > 0 && (
              <div className="text-red-500 text-sm mt-2 md:mt-4">
                {validationErrors.map((error, index) => (
                  <div key={index}>{error}</div>
                ))}
              </div>
            )}

            <div className="flex gap-2 md:gap-5 cursor-pointer mt-4 md:mt-6">
              {!isMobile && (
                <button className="text-gray-600 py-2 rounded-full transition duration-200 w-full">
                  Cancel
                </button>
              )}
              {isMobile ? (
                <button
                  onClick={handleNextStep}
                  className="bg-blue-600 text-white py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleSubmit(false, "", true);
                  }}
                  className="bg-blue-600 text-white py-2 px-4 md:px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
                >
                  Save and Close
                </button>
              )}
            </div>
          </div>
        )}
        {/* Calendar/Preview Section - Show on mobile only in step 2 */}
        {(mobileStep === 2 || !isMobile) && (
          <div
            className={`flex flex-col ${
              isMobile ? "" : "md:flex-row"
            } min-h-[80vh] h-fit w-full bg-gray-100 p-2 md:p-4 mt-4 md:mt-20`}
          >
            {/* Back button for mobile */}
            {isMobile && (
              <div
                className="mb-2 flex items-center cursor-pointer"
                onClick={handleBackToForm}
              >
                <ArrowLeft size={20} className="text-blue-500" />
                <span className="ml-2 text-blue-500">Back to form</span>
              </div>
            )}

            {/* Preview Section */}
            <div
              className={`transition-all duration-300 border-gray-400 border-t-5 ${
                isMobile
                  ? "w-full"
                  : slots && slots.length > 0
                  ? "md:w-2/5"
                  : "md:w-[356px]"
              } bg-white p-4 md:p-6 rounded-t-md md:rounded-l-md md:rounded-tr-none flex flex-col border-b md:border-b-0 md:border-r border-gray-200`}
              style={{
                minHeight: isMobile ? "auto" : "calc(100vh - 160px)",
                maxHeight: isMobile ? "auto" : "calc(100vh - 160px)",
              }}
            >
              <h3 className="text-md font-semibold text-gray-500">
                {userData.firstName + " " + userData.lastName}
              </h3>
              <div className="mb-2 md:mb-4 flex items-start">
                <h3 className="text-xl md:text-3xl font-semibold text-gray-700 break-words max-w-full">
                  {eventName || "Event Name "}
                </h3>
              </div>
              <p className="mb-1 md:mb-2 flex items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <Clock size={20} color="gray" />
                </div>
                <span className="ml-2 text-gray-500 break-words max-w-full">
                  {eventDuration ? `${eventDuration} min` : "Event Duration"}
                </span>
              </p>
              <h3 className="mb-1 md:mb-2 text-md text-gray-500 flex items-start break-words">
                <div className="flex-shrink-0 mt-0.5">
                  <FileText size={20} color="gray" className="text-gray-600" />
                </div>
                <span className="ml-2 text-gray-500 break-words max-w-full">
                  {description || "Event Description"}
                </span>
              </h3>
            </div>

            {/* Calendar Section */}
            <div
              className={`relative border-t-5 border-t-gray-400 transition-all duration-300 ${
                isMobile
                  ? "w-full"
                  : slots && slots.length > 0
                  ? "md:w-3/5"
                  : "md:w-fit"
              } bg-white p-4 md:p-6 rounded-b-md md:rounded-r-md flex flex-col border-gray-200`}
              style={{
                minHeight: isMobile ? "auto" : "calc(100vh - 160px)",
                maxHeight: isMobile ? "auto" : "calc(100vh - 160px)",
              }}
            >
              {loading && (
                <div className="absolute  top-0 left-0 w-full h-full bg-white bg-opacity-75 flex items-center justify-center z-10">
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="40"
                    color="gray"
                    ariaLabel="three-dots-loading"
                  />
                </div>
              )}

              <div className="px-2">
                <span className="font-bold text-lg md:text-xl text-gray-700">
                  Select Date and Time
                </span>
              </div>

              {/* Calendar Component */}
              <div
                className={`flex  ${
                  isMobile ? "flex-col items-center" : "flex-row"
                } px-2`}
              >
                <div className={`${isMobile ? "w-full max-w-xs" : ""}`}>
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
                      setSelectedDate(date);
                      if (!isPreview) {
                        setSlotIsLoading(true);
                        handleSubmit(true, date, false);
                      } else {
                        handleSlots(date);
                      }
                    }}
                    mode="single"
                    selected={selectedDate as any}
                  />

                  <div className="mt-4 md:mt-6 px-2">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm md:text-md">
                        Time zone
                      </span>
                      <span className="flex items-center gap-1 mt-1">
                        <Globe2Icon size={16} className="text-gray-500" />
                        <span className="text-sm font-sans text-gray-600">
                          Indian Standard Time ({currentISTTime})
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desktop Slots Section */}
                {!isMobile && orgSelectedDate && (
                  <div
                    className="m-3 flex-grow overflow-y-auto"
                    style={{ maxHeight: "400px" }}
                  >
                    <div>
                      <span className="font-2xl md:font-3xl font-bold text-gray-700">
                        {orgSelectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>

                    {isSlotLoading ? (
                      <div className="ml-1 w-44 mb-2 mr-4">
                        <div className="px-10 py-3 mt-4 flex flex-col items-center justify-center rounded-sm">
                          <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="color-ring-loading"
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
                    ) : (
                      <div className="grid grid-cols-1 gap-2">
                        {slots?.length > 0 ? (
                          slots.map((slot: any, index: any) => (
                            <div key={index} className="ml-1 w-44 mb-2 mr-4">
                              <div className="border border-blue-500 px-10 py-3 mt-4 flex flex-col items-center justify-center rounded-sm">
                                <div className="text-blue-600 font-semibold">
                                  {slot}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="ml-1 w-44 mb-2 mr-4">
                            <div className="border border-gray-300 px-10 py-3 mt-4 flex flex-col items-center justify-center rounded-sm">
                              <div className="text-gray-500 font-semibold">
                                No slots available
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Create Event button for mobile */}
              {isMobile && (
                <div className="mt-6 px-4">
                  <button
                    onClick={() => {
                      handleSubmit(false, "", true);
                    }}
                    className="bg-blue-600 text-white py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
                  >
                    Create Event
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {showMobileSlotsModal && isMobile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="w-full bg-white rounded-t-lg shadow-lg max-h-[70vh] overflow-y-auto">
              <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {orgSelectedDate?.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h3>
                <button
                  onClick={() => setShowMobileSlotsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-4">
                {isSlotLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <ThreeDots
                      height="40"
                      width="40"
                      radius="9"
                      color="#3b82f6"
                      ariaLabel="three-dots-loading"
                      visible={true}
                    />
                  </div>
                ) : slots?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-3">
                    {slots.map((slot: any, index: any) => (
                      <div
                        key={index}
                        className="border border-blue-500 rounded-md p-3 text-center"
                      >
                        <span className="text-blue-600 font-medium">
                          {slot}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No slots available for this date
                  </div>
                )}
              </div>
            </div>
          </div>
        )}{" "}
        {/* <-- these two are the missing closing symbols */}
        {/* Mobile Slots Modal */}
      </div>
      <Toaster
        position={isMobile ? "bottom-center" : "top-center"}
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          style: {
            background: "#fff",
            color: "#3b82f6",
            border: "",
            borderColor: "#3b82f6",
          },
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
//clsoe

// import { useEffect, useState, Fragment } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { addDays, format } from "date-fns";
// import { ColorRing, ThreeDots } from "react-loader-spinner";
// import {
//   ChevronLeft,
//   Clock,
//   FileText,
//   Globe2Icon,
//   X,
//   ChevronRight,
// } from "lucide-react";
// import { Dialog, Transition } from "@headlessui/react";
// import toast, { Toaster } from "react-hot-toast";
// import { axiosInstance } from "./config/http";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addActiveNavState } from "./app-store/gloabalSlice";
// import Testing from "./Testing";

// const EventScheduler = () => {
//   // State management
//   const [bookingGap, setBookingGap] = useState(0);
//   const [isGapDropdownVisible, setGapDropdownVisible] = useState(false);
//   const predefinedGaps = ["5", "10", "15"];
//   const [eventCategory, setEventCategory] = useState("General");
//   const [isCatDropdownVisible, setCatDropdownVisible] = useState(false);
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const predefinedDurations = ["2", "15", "30", "45", "60", "90", "120"];
//   const [eventDuration, setEventDuration] = useState("");
//   const [isSlotLoading, setSlotIsLoading] = useState(false);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [isPreview, setIsPreview] = useState(false);
//   const [orgSelectedDate, setOrgSelectedDate] = useState<Date | null>(null);
//   const [slots, setSlots] = useState([]);
//   const [orgData, setOrgData] = useState([] as any);
//   const [restrictedCategory, setRestrictedCategory] = useState("");
//   const [currentISTTime, setCurrentISTTime] = useState("");
//   const [globalErrors, setGlobalErrors] = useState<string[]>([]);
//   const [otherErrors, setOtherErrors] = useState<string[]>([]);
//   const [validationErrors, setValidationErrors] = useState([]);
//   const [isMobile, setIsMobile] = useState(false);
//   const [showMobileCalendar, setShowMobileCalendar] = useState(false);
//   const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [currentStep, setCurrentStep] = useState(1); // New state for multi-step form

//   // Redux and router hooks
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const eventId = searchParams.get("eventId");
//   const categoryData: any = useSelector(
//     (state: any) => state.event.categoryData
//   );
//   const userData = useSelector((state: any) => state.registration.userData);

//   // Form state
//   const [eventName, setEventName] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({
//     eventName: "",
//     eventDuration: "",
//     description: "",
//     gap: "",
//   });

//   // Event data
//   let eventData = [
//     {
//       isAvailable: true,
//       timeSlots: [{ start: "10:30am", end: "6:00pm", error: "" }],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [{ start: "10:30am", end: "6:00pm", error: "" }],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [{ start: "10:30am", end: "6:00pm", error: "" }],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [{ start: "10:30am", end: "6:00pm", error: "" }],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [{ start: "10:30am", end: "6:00pm", error: "" }],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [{ start: "10:30am", end: "6:00pm", error: "" }],
//     },
//     {
//       isAvailable: true,
//       timeSlots: [{ start: "10:30am", end: "6:00pm", error: "" }],
//     },
//   ];

//   const [availableDays, setAvailableDays] = useState([]);
//   const [next30AvailableDays, setNext30AvailableDays] = useState([]);
//   const [eventDatas, setEventDatas] = useState(eventData);

//   // Categories
//   const predefinedCategories = [
//     "General",
//     "Litmus Test Interview",
//     "Application Test Interview",
//     "Webinar",
//     "Panel Discussion",
//     "Training Session",
//   ];

//   const uniquePredefinedCategories = predefinedCategories.filter((category) => {
//     if (
//       category === "Litmus Test Review" ||
//       category === "Application Test Review"
//     ) {
//       return !categoryData.includes(category);
//     }
//     return true;
//   });

//   const isRestricted = [
//     "Litmus Test Interview",
//     "Application Test Interview",
//   ].includes(restrictedCategory);

//   // Effects
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkIfMobile();
//     window.addEventListener("resize", checkIfMobile);
//     return () => window.removeEventListener("resize", checkIfMobile);
//   }, []);

//   useEffect(() => {
//     const fetchingEditData = async () => {
//       const editEventdata = await axiosInstance.get(
//         `/events/event-data/${eventId}`
//       );
//       setEventName(editEventdata.data.data.eventName);
//       setEventDuration(editEventdata.data.data.eventDuration);
//       setDescription(editEventdata.data.data.eventDescription);
//       setEventCategory(editEventdata.data.data.eventCategory);
//       setRestrictedCategory(editEventdata.data.data.eventCategory);
//       setBookingGap(editEventdata.data.data.meetingGap);
//     };

//     if (eventId) fetchingEditData();
//   }, [eventId]);

//   useEffect(() => {
//     const updateTime = () => {
//       const date = new Date();
//       const istOffset = 330;
//       const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
//       const istTime = new Date(utcTime + istOffset * 60000);
//       const options = { hour: "2-digit", minute: "2-digit", hour12: true };
//       const formattedTime = istTime.toLocaleTimeString("en-IN", options as any);
//       setCurrentISTTime(formattedTime);
//     };

//     updateTime();
//     const now = new Date();
//     const delay = (60 - now.getSeconds()) * 1000;

//     const timeout = setTimeout(() => {
//       updateTime();
//       const interval = setInterval(updateTime, 60000);
//       return () => clearInterval(interval);
//     }, delay);

//     return () => clearTimeout(timeout);
//   }, []);

//   useEffect(() => {
//     const daysMapping = eventDatas
//       .map((event, index) => (event.isAvailable ? index : null))
//       .filter((day) => day !== null);
//     setAvailableDays(daysMapping as any);
//   }, [eventDatas, eventDuration]);

//   useEffect(() => {
//     const generateNext30AvailableDays = () => {
//       const result: any = [];
//       let currentDate: Date = new Date();
//       while (result.length < 7) {
//         if ((availableDays as any).includes(currentDate.getDay())) {
//           result.push(new Date(currentDate));
//         }
//         currentDate = addDays(currentDate, 1);
//       }
//       setNext30AvailableDays(result);
//     };

//     if (availableDays.length > 0) {
//       generateNext30AvailableDays();
//     } else {
//       setNext30AvailableDays([]);
//     }
//   }, [availableDays]);

//   useEffect(() => {
//     if (orgData && orgData.length > 0) {
//       setTimeout(() => {
//         handleSlots(selectedDate as any);
//       }, 3000);
//     }
//   }, [orgData]);

//   useEffect(() => {
//     setOrgSelectedDate(null);
//     setSlots([]);
//     setSlotIsLoading(false);
//     setIsPreview(false);
//   }, [eventDuration, bookingGap]);

//   // Calendar modifiers
//   const modifiers: any = {
//     available: next30AvailableDays,
//     today: new Date(),
//     day: { color: "gray" },
//   };

//   const modifiersStyles = {
//     available: {
//       backgroundColor: "#dbeafe",
//       color: "#3b82f6",
//       borderRadius: "50%",
//     },
//     today: { color: "#1d4ed8", fontWeight: "" },
//     day: { color: "gray" },
//   };

//   // Helper functions
//   const timeToMinutes = (time: any) => {
//     if (time) {
//       const [_, hours, minutes, meridian] = time.match(
//         /(\d{1,2}):(\d{2})(am|pm)/
//       );
//       let totalMinutes = parseInt(hours, 10) * 60 + parseInt(minutes, 10);
//       if (meridian.toLowerCase() === "pm" && hours !== "12") {
//         totalMinutes += 12 * 60;
//       } else if (meridian.toLowerCase() === "am" && hours === "12") {
//         totalMinutes -= 12 * 60;
//       }
//       return totalMinutes;
//     }
//   };

//   // Handlers
//   const handleGapInputChange = (value: any) => setBookingGap(value);
//   const handleSelectGap = (gap: any) => {
//     setBookingGap(gap);
//     setGapDropdownVisible(false);
//   };

//   const handleSlots = (clickedDate?: Date) => {
//     const timeSlots = clickedDate
//       ? orgData.find(
//           (day: any) => day.eventDate === format(clickedDate, "yyyy-MM-dd")
//         )?.slots || []
//       : [];
//     setSlotIsLoading(false);
//     setSlots(timeSlots);
//     setOrgSelectedDate(clickedDate || selectedDate);
//     setIsPreview(true);
//   };

//   const setEventDays = (updatedEventData: any) => {
//     setSlots([]);
//     setSlotIsLoading(false);
//     setIsPreview(false);
//     setOrgSelectedDate(null);
//     setEventDatas([]);
//     setLoading(true);
//     setTimeout(() => {
//       setEventDatas(updatedEventData);
//       setLoading(false);
//     }, 1000);
//   };

//   const handleErrors = (errorList: string[], otherErrorList: any) => {
//     setOtherErrors(otherErrorList);
//     setGlobalErrors(errorList);
//   };

//   const validateEventData = (eventData: any, requiredDuration: any) => {
//     let isValid = true;
//     const errors: string[] = [];

//     eventData.forEach((day: any, dayIndex: number) => {
//       if (!day.isAvailable) return;

//       day.timeSlots.forEach((slot: any, slotIndex: number) => {
//         const startMinutes: any = timeToMinutes(slot.start);
//         const endMinutes: any = timeToMinutes(slot.end);

//         if (!slot.start || !slot.end) {
//           isValid = false;
//           errors.push(
//             `Error: Missing start or end time for slot ${
//               slotIndex + 1
//             } on day ${dayIndex + 1}.`
//           );
//           slot.error = "Start and end times are required.";
//           return;
//         }

//         if (startMinutes < 0 || startMinutes >= 1440) {
//           isValid = false;
//           errors.push(
//             `Error: Start time ${slot.start} for slot ${slotIndex + 1} on day ${
//               dayIndex + 1
//             } is out of bounds.`
//           );
//           slot.error = "Start time must be between 12:00am and 11:59pm.";
//         }

//         if (endMinutes <= 0 || endMinutes > 1440) {
//           isValid = false;
//           errors.push(
//             `Error: End time ${slot.end} for slot ${slotIndex + 1} on day ${
//               dayIndex + 1
//             } is out of bounds.`
//           );
//           slot.error = "End time must be between 12:00am and 11:59pm.";
//         }

//         if (endMinutes <= startMinutes) {
//           isValid = false;
//           errors.push(
//             `Error: End time ${slot.end} must be greater than start time ${
//               slot.start
//             } for slot ${slotIndex + 1} on day ${dayIndex + 1}.`
//           );
//           slot.error = "End time must be greater than start time.";
//         }

//         const slotDuration = endMinutes - startMinutes;
//         if (slotDuration < requiredDuration) {
//           isValid = false;
//           errors.push(
//             `Error: Slot from ${slot.start} to ${slot.end} on day ${
//               dayIndex + 1
//             } must be at least ${requiredDuration} minutes.`
//           );
//           slot.error = `Slot duration is less than ${requiredDuration} minutes.`;
//         }

//         if (isValid) {
//           slot.error = "";
//         }
//       });
//     });

//     return { isValid, errors };
//   };

//   const handleValidation = () => {
//     const { isValid, errors }: any = validateEventData(
//       eventDatas,
//       eventDuration
//     );
//     setValidationErrors(errors);
//     return isValid;
//   };

//   const handleInputChange = (value: any) => {
//     setEventDuration(value);
//     if (value && !/^\d+$/.test(value)) {
//       setErrors({
//         eventDuration: "Please enter a valid number for duration.",
//       } as any);
//     } else if (value && Number(value) <= 0) {
//       setErrors({ eventDuration: "Duration must be greater than 0." } as any);
//     } else {
//       setErrors({ eventDuration: "" } as any);
//     }
//   };

//   const handleSelectDuration = (value: any) => {
//     setEventDuration(value);
//     setDropdownVisible(false);
//     setErrors({ eventDuration: "" } as any);
//   };

//   const handleSelectCategory = (value: any) => {
//     setEventCategory(value);
//     setCatDropdownVisible(false);
//     setErrors({ eventCategory: "" } as any);
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {
//       eventName: "",
//       eventDuration: "",
//       description: "",
//       gap: "",
//     };

//     if (!eventName.trim()) {
//       newErrors.eventName = "Event Name is required";
//       valid = false;
//       setIsPreview(false);
//     }

//     if (!eventDuration) {
//       newErrors.eventDuration = "Event Duration is required";
//       valid = false;
//     } else if (isNaN(eventDuration as any) || (eventDuration as any) <= 0) {
//       newErrors.eventDuration =
//         "Event Duration must be a valid positive number";
//       valid = false;
//       setIsPreview(false);
//     } else if ((eventDuration as any) < 2) {
//       newErrors.eventDuration = "Event Duration must be at least 2 minutes";
//       valid = false;
//       setIsPreview(false);
//     } else if ((eventDuration as any) > 1439) {
//       newErrors.eventDuration = "Event Duration must not exceed 1439 minutes";
//       valid = false;
//       setIsPreview(false);
//     }

//     if (bookingGap > 15) {
//       newErrors.gap = "The booking gap must be less than 15";
//       valid = false;
//       setIsPreview(false);
//     }
//     if (description.split(/\s+/).filter(Boolean).length > 60) {
//       newErrors.description = "The description must have 60 words or fewer.";
//       valid = false;
//       setIsPreview(false);
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (
//     edit: boolean,
//     clickedDate?: any,
//     dataSubmit?: boolean
//   ) => {
//     const index: any = 0;
//     if (validateForm()) {
//       if (globalErrors.length === 0 && otherErrors.length === 0) {
//         if (handleValidation()) {
//           try {
//             let response;
//             if (dataSubmit) {
//               toast.loading("Your Event is Creating....");
//               response = await axiosInstance.post("/events?preview=false", {
//                 eventName,
//                 eventDuration,
//                 eventDescription: description,
//                 eventDatas,
//                 eventId,
//                 meetingGap: bookingGap,
//                 eventCategory: eventCategory,
//               });
//             } else {
//               response = await axiosInstance.post("/events?preview=true", {
//                 eventName,
//                 eventDuration,
//                 eventDescription: description,
//                 eventDatas,
//                 eventId,
//                 meetingGap: bookingGap,
//                 eventCategory: eventCategory,
//               });
//             }

//             if (response.data.success) {
//               if (edit) {
//                 setSlotIsLoading(true);
//                 setOrgSelectedDate(clickedDate as any);
//                 setOrgData(response.data.data);
//               }
//               if (dataSubmit) {
//                 navigate("/events/user/me");
//                 toast.dismiss();
//                 toast.success("Your event was created successfully!");
//                 dispatch(addActiveNavState(index));
//               }
//             } else {
//               toast.dismiss();
//               setTimeout(() => {
//                 toast.error("There is an error!");
//               }, 2000);
//             }
//           } catch (error: any) {
//             console.error("Error:", error);
//           }
//         }
//       }
//     }
//   };

//   // New handlers for multi-step form
//   const handleNextStep = () => {
//     if (validateForm()) {
//       setCurrentStep(2);
//     }
//   };

//   const handlePreviousStep = () => {
//     setCurrentStep(1);
//   };

//   const handleDone = () => {
//     handleSubmit(false, "", true);
//   };

//   // Render form steps
//   const renderStep1 = () => (
//     <div className="sidebar w-full h-full overflow-y-auto bg-white shadow-md p-6 flex flex-col justify-between">
//       <div className="mt-2 mb-1 flex cursor-pointer">
//         <ChevronLeft color="#3b82f6" size={17} className="mt-1" />
//         <span
//           className="font-semibold text-blue-500"
//           onClick={() => navigate("/events/user/me")}
//         >
//           Back
//         </span>
//       </div>
//       <div className="flex justify-between items-center border-blue-500 pt-4 pb-4">
//         <h2 className="text-2xl font-semibold text-gray-800">
//           Create Your Event Type
//         </h2>
//       </div>

//       <div className="space-y-6 flex-grow">
//         {/* Event Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Event Name
//           </label>
//           <input
//             type="text"
//             value={eventName}
//             onChange={(e) => setEventName(e.target.value)}
//             className="form-input w-full p-3 border rounded-md text-base"
//             placeholder="Enter event name"
//           />
//           {errors.eventName && (
//             <p className="text-red-500 text-sm">{errors.eventName}</p>
//           )}
//         </div>

//         {/* Event Category */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Event Category
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               value={eventCategory}
//               onChange={(e) => handleInputChange(e.target.value)}
//               onFocus={() => setCatDropdownVisible(true)}
//               onBlur={() => setTimeout(() => setCatDropdownVisible(false), 200)}
//               placeholder="Enter or select a category"
//               className="form-input w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               disabled={isRestricted}
//             />
//             {isRestricted && (
//               <p className="mt-1 text-sm text-red-500">
//                 This category is exclusive and cannot be changed.
//               </p>
//             )}
//             {isCatDropdownVisible && !isRestricted && (
//               <ul
//                 className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto ${
//                   isMobile ? "left-0" : ""
//                 }`}
//               >
//                 {uniquePredefinedCategories?.map((category) => (
//                   <li
//                     key={category}
//                     onClick={() => handleSelectCategory(category)}
//                     className="p-2 cursor-pointer hover:bg-blue-100"
//                   >
//                     {category}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>

//         {/* Event Duration */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Event Duration
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               value={eventDuration}
//               onChange={(e) => handleInputChange(e.target.value)}
//               onFocus={() => setDropdownVisible(true)}
//               onBlur={() => setTimeout(() => setDropdownVisible(false), 200)}
//               placeholder="Enter or select duration (minutes)"
//               className="form-input w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {isDropdownVisible && (
//               <ul
//                 className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto ${
//                   isMobile ? "left-0" : ""
//                 }`}
//               >
//                 {predefinedDurations.map((duration) => (
//                   <li
//                     key={duration}
//                     onClick={() => handleSelectDuration(duration)}
//                     className="p-2 cursor-pointer hover:bg-blue-100"
//                   >
//                     {duration} minutes
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           {errors.eventDuration && (
//             <p className="text-red-500 text-sm">{errors.eventDuration}</p>
//           )}
//         </div>

//         {/* Meeting Gap */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Meeting Gap
//           </label>
//           <div className="relative">
//             <input
//               type="text"
//               value={bookingGap}
//               onChange={(e) => handleGapInputChange(e.target.value)}
//               onFocus={() => setGapDropdownVisible(true)}
//               onBlur={() => setTimeout(() => setGapDropdownVisible(false), 200)}
//               placeholder="Enter or select gap (minutes)"
//               className="form-input w-full p-3 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//             {isGapDropdownVisible && (
//               <ul
//                 className={`absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-md mt-1 max-h-60 overflow-y-auto ${
//                   isMobile ? "left-0" : ""
//                 }`}
//               >
//                 {predefinedGaps.map((gap) => (
//                   <li
//                     key={gap}
//                     onClick={() => handleSelectGap(gap)}
//                     className="p-2 cursor-pointer hover:bg-blue-100"
//                   >
//                     {gap} minutes
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//           {errors.gap && <p className="text-red-500 text-sm">{errors.gap}</p>}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Description
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="form-input w-full p-3 border rounded-md text-base"
//             rows={4}
//             placeholder="Enter event description"
//           />
//           {errors.description && (
//             <p className="text-red-500 text-sm">{errors.description}</p>
//           )}
//         </div>

//         {/* Weekday Selection */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-800 mb-2">
//             Select Weekdays
//           </h3>
//           <div
//             className={`weekday-selector ${isMobile ? "overflow-x-auto" : ""}`}
//           >
//             <Testing
//               eventId={eventId}
//               update={false}
//               eventDays={eventData}
//               setEventDays={setEventDays}
//               onError={handleErrors}
//               isMobile={isMobile}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Error Messages */}
//       {globalErrors.length > 0 && (
//         <div className="error-messages text-red-500">
//           {globalErrors.map((error, index) => (
//             <div key={index}>{error}</div>
//           ))}
//         </div>
//       )}

//       {validationErrors.length > 0 && (
//         <div className="text-red-500 text-sm mt-4">
//           {validationErrors.map((error, index) => (
//             <div key={index}>{error}</div>
//           ))}
//         </div>
//       )}

//       {/* Mobile Next Button */}
//       {isMobile && (
//         <button
//           onClick={handleNextStep}
//           className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full mt-6 flex items-center justify-center"
//         >
//           Next <ChevronRight className="ml-2" />
//         </button>
//       )}
//     </div>
//   );

//   const renderStep2 = () => (
//     <div className="calendar-section relative w-full h-full bg-white p-6 flex flex-col">
//       <div className="flex justify-between items-center mb-4">
//         <button
//           onClick={handlePreviousStep}
//           className="text-blue-500 flex items-center"
//         >
//           <ChevronLeft className="mr-1" /> Back
//         </button>
//         <button
//           onClick={handleDone}
//           className="bg-blue-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-700 transition duration-200"
//         >
//           Done
//         </button>
//       </div>

//       {loading && (
//         <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-75 flex items-center justify-center z-10">
//           <ThreeDots
//             height="80"
//             width="80"
//             radius="40"
//             color="gray"
//             ariaLabel="three-dots-loading"
//           />
//         </div>
//       )}

//       <div>
//         <span className="font-bold text-xl text-gray-700">
//           Select Date and Time
//         </span>
//       </div>

//       <div className="flex flex-col">
//         <DayPicker
//           modifiers={modifiers}
//           modifiersStyles={modifiersStyles}
//           className="w-full"
//           disabled={[
//             { before: new Date() },
//             (date) => {
//               const targetDate = new Date(date).setHours(0, 0, 0, 0);
//               return !next30AvailableDays.some(
//                 (availableDate: any) =>
//                   new Date(availableDate).setHours(0, 0, 0, 0) === targetDate
//               );
//             },
//           ]}
//           onSelect={(date: Date | undefined) => {
//             if (!date) return;
//             setSelectedDate(date);
//             if (!isPreview) {
//               setSlotIsLoading(true);
//               handleSubmit(true, date, false);
//             } else {
//               handleSlots(date);
//             }
//           }}
//           mode="single"
//           selected={selectedDate as any}
//         />

//         {orgSelectedDate && (
//           <div className="time-slots-container mt-4">
//             <h3 className="font-semibold text-lg mb-2">Available Time Slots</h3>
//             <div className="grid grid-cols-2 gap-2">
//               {slots?.map((slot: any, index: any) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedTime(slot)}
//                   className={`p-3 rounded-md border ${
//                     selectedTime === slot
//                       ? "bg-blue-500 text-white border-blue-500"
//                       : "border-gray-300 hover:bg-gray-100"
//                   }`}
//                 >
//                   {slot}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="mt-6">
//           <div>
//             <span className="font-bold text-md">Time zone</span>
//           </div>
//           <div className="mt-1">
//             <span className="flex gap-1">
//               <Globe2Icon size={16} className="mt-1.5" />
//               <span className="text-sm font-sans mt-1">
//                 Indian Standard Time ({currentISTTime})
//               </span>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       <div className="event-scheduler-container flex bg-gray-100 min-h-screen">
//         {/* Desktop View - Side by Side */}
//         {!isMobile && (
//           <>
//             {/* Sidebar with Form */}
//             <div className="sidebar w-[680px] h-screen overflow-y-scroll bg-white shadow-md p-6 flex flex-col justify-between">
//               {renderStep1()}

//               {/* Desktop Buttons */}
//               <div className="hidden md:flex gap-5 cursor-pointer mt-6">
//                 <button className="text-gray-600 py-2 rounded-full transition duration-200 w-full">
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleSubmit(false, "", true)}
//                   className="bg-blue-600 text-white py-2 px-8 rounded-full shadow-md hover:bg-blue-700 transition duration-200 w-full"
//                 >
//                   Save and Close
//                 </button>
//               </div>
//             </div>

//             {/* Main Content - Calendar */}
//             <div className="main-content flex min-h-[80vh] h-fit w-full bg-gray-100 p-4 mt-20">
//               {renderStep2()}
//             </div>
//           </>
//         )}

//         {/* Mobile View - Single Step at a Time */}
//         {isMobile && (
//           <div className="w-full h-screen overflow-y-auto">
//             {currentStep === 1 ? renderStep1() : renderStep2()}
//           </div>
//         )}
//       </div>

//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//         gutter={8}
//         containerClassName=""
//         containerStyle={{}}
//         toastOptions={{
//           className: "",
//           style: {
//             background: "#fff",
//             color: "#3b82f6",
//             border: "",
//             borderColor: "#3b82f6",
//           },
//           success: {
//             duration: 3000,
//             iconTheme: {
//               primary: "green",
//               secondary: "white",
//             },
//           },
//         }}
//       />
//     </>
//   );
// };

// export default EventScheduler;
