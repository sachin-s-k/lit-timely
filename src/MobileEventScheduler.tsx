// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addActiveNavState } from "./app-store/gloabalSlice";
// import { format } from "date-fns";
// import { ChevronLeft, Clock, FileText, Globe2Icon } from "lucide-react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import toast from "react-hot-toast";
// import { axiosInstance } from "./config/http";
// import { ColorRing, ThreeDots } from "react-loader-spinner";

// const MobileEventScheduler = () => {
//   const [step, setStep] = useState(1);
//   const [eventName, setEventName] = useState("");
//   const [eventDuration, setEventDuration] = useState("");
//   const [description, setDescription] = useState("");
//   const [eventCategory, setEventCategory] = useState("General");
//   const [bookingGap, setBookingGap] = useState(0);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [slots, setSlots] = useState([]);
//   const [isSlotLoading, setSlotIsLoading] = useState(false);
//   const [orgData, setOrgData] = useState([]);
//   const [errors, setErrors] = useState({
//     eventName: "",
//     eventDuration: "",
//     description: "",
//     gap: "",
//   });
//   const [searchParams] = useSearchParams();
//   const eventId = searchParams.get("eventId");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userData = useSelector((state: any) => state.registration.userData);

//   // Predefined values
//   const predefinedDurations = ["2", "15", "30", "45", "60", "90", "120"];
//   const predefinedGaps = ["5", "10", "15"];
//   const predefinedCategories = [
//     "General",
//     "Litmus Test Interview",
//     "Application Test Interview",
//     "Webinar",
//     "Panel Discussion",
//     "Training Session",
//   ];

//   // Validation functions
//   const validateStep1 = () => {
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
//     }

//     if (!eventDuration) {
//       newErrors.eventDuration = "Event Duration is required";
//       valid = false;
//     } else if (isNaN(eventDuration as any) || (eventDuration as any) <= 0) {
//       newErrors.eventDuration =
//         "Event Duration must be a valid positive number";
//       valid = false;
//     } else if ((eventDuration as any) < 2) {
//       newErrors.eventDuration = "Event Duration must be at least 2 minutes";
//       valid = false;
//     } else if ((eventDuration as any) > 1439) {
//       newErrors.eventDuration = "Event Duration must not exceed 1439 minutes";
//       valid = false;
//     }

//     if (bookingGap > 15) {
//       newErrors.gap = "The booking gap must be less than 15";
//       valid = false;
//     }

//     if (description.split(/\s+/).filter(Boolean).length > 60) {
//       newErrors.description = "The description must have 60 words or fewer.";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleNext = () => {
//     if (validateStep1()) {
//       setStep(2);
//     }
//   };

//   const handleBack = () => {
//     setStep(1);
//   };

//   const handleSubmit = async () => {
//     // Implement your submit logic here
//     toast.loading("Creating your event...");
//     try {
//       const response = await axiosInstance.post("/events?preview=false", {
//         eventName,
//         eventDuration,
//         eventDescription: description,
//         eventDatas: [], // Add your event data here
//         eventId,
//         meetingGap: bookingGap,
//         eventCategory,
//       });

//       if (response.data.success) {
//         toast.dismiss();
//         toast.success("Event created successfully!");
//         navigate("/events/user/me");
//         dispatch(addActiveNavState(0));
//       } else {
//         toast.dismiss();
//         toast.error("Failed to create event");
//       }
//     } catch (error) {
//       toast.dismiss();
//       toast.error("An error occurred");
//     }
//   };

//   // Calendar and slots logic would go here...

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Header */}
//       <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center">
//         {step === 2 && (
//           <button onClick={handleBack} className="mr-4">
//             <ChevronLeft size={24} />
//           </button>
//         )}
//         <h1 className="text-xl font-bold">
//           {step === 1 ? "Event Details" : "Select Date & Time"}
//         </h1>
//       </div>

//       {/* Step 1: Event Details */}
//       {step === 1 && (
//         <div className="p-4">
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">Event Name</label>
//             <input
//               type="text"
//               value={eventName}
//               onChange={(e) => setEventName(e.target.value)}
//               className="w-full p-3 border rounded-lg"
//               placeholder="Enter event name"
//             />
//             {errors.eventName && (
//               <p className="text-red-500 text-sm mt-1">{errors.eventName}</p>
//             )}
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">
//               Event Category
//             </label>
//             <select
//               value={eventCategory}
//               onChange={(e) => setEventCategory(e.target.value)}
//               className="w-full p-3 border rounded-lg bg-white"
//             >
//               {predefinedCategories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">
//               Event Duration (minutes)
//             </label>
//             <select
//               value={eventDuration}
//               onChange={(e) => setEventDuration(e.target.value)}
//               className="w-full p-3 border rounded-lg bg-white"
//             >
//               {predefinedDurations.map((dur) => (
//                 <option key={dur} value={dur}>
//                   {dur} minutes
//                 </option>
//               ))}
//             </select>
//             {errors.eventDuration && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.eventDuration}
//               </p>
//             )}
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">
//               Meeting Gap (minutes)
//             </label>
//             <select
//               value={bookingGap}
//               onChange={(e) => setBookingGap(Number(e.target.value))}
//               className="w-full p-3 border rounded-lg bg-white"
//             >
//               {predefinedGaps.map((gap) => (
//                 <option key={gap} value={gap}>
//                   {gap} minutes
//                 </option>
//               ))}
//             </select>
//             {errors.gap && (
//               <p className="text-red-500 text-sm mt-1">{errors.gap}</p>
//             )}
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">
//               Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-3 border rounded-lg"
//               rows={4}
//               placeholder="Enter event description"
//             />
//             {errors.description && (
//               <p className="text-red-500 text-sm mt-1">{errors.description}</p>
//             )}
//           </div>

//           <button
//             onClick={handleNext}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Step 2: Calendar and Time Selection */}
//       {step === 2 && (
//         <div className="p-4">
//           {/* Event Summary */}
//           <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//             <h2 className="text-lg font-semibold mb-2">{eventName}</h2>
//             <div className="flex items-center text-gray-600 mb-1">
//               <Clock size={16} className="mr-2" />
//               <span>{eventDuration} minutes</span>
//             </div>
//             <div className="flex items-center text-gray-600">
//               <FileText size={16} className="mr-2" />
//               <span className="truncate">
//                 {description || "No description"}
//               </span>
//             </div>
//           </div>

//           {/* Calendar */}
//           <div className="mb-6">
//             <h3 className="text-md font-medium mb-3">Select a Date</h3>
//             <DayPicker
//               mode="single"
//               selected={selectedDate}
//               onSelect={setSelectedDate}
//               className="border rounded-lg p-2"
//               styles={{
//                 day: {
//                   margin: "0.2em",
//                 },
//               }}
//             />
//           </div>

//           {/* Time Slots */}
//           {selectedDate && (
//             <div className="mb-6">
//               <h3 className="text-md font-medium mb-3">
//                 Available Time Slots for {selectedDate.toLocaleDateString()}
//               </h3>
//               {isSlotLoading ? (
//                 <div className="flex justify-center py-8">
//                   <ThreeDots color="#3b82f6" height={50} width={50} />
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-2 gap-2">
//                   {slots.length > 0 ? (
//                     slots.map((slot, index) => (
//                       <button
//                         key={index}
//                         className="p-3 border border-blue-500 text-blue-600 rounded-lg text-center"
//                       >
//                         {slot}
//                       </button>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 col-span-2 text-center py-4">
//                       No available slots
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}

//           <div className="flex gap-3">
//             <button
//               onClick={handleBack}
//               className="flex-1 py-3 border border-gray-300 rounded-lg font-medium"
//             >
//               Back
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={!selectedDate}
//               className={`flex-1 py-3 rounded-lg font-medium ${
//                 selectedDate
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-300 text-gray-500"
//               }`}
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MobileEventScheduler;
// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addActiveNavState } from "./app-store/gloabalSlice";
// import { format, addDays, isSameDay } from "date-fns";
// import { ChevronLeft, Clock, FileText, Globe2Icon } from "lucide-react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import toast from "react-hot-toast";
// import { axiosInstance } from "./config/http";
// import { ColorRing, ThreeDots } from "react-loader-spinner";

// const MobileEventScheduler = () => {
//   const [step, setStep] = useState(1);
//   const [eventName, setEventName] = useState("");
//   const [eventDuration, setEventDuration] = useState("");
//   const [description, setDescription] = useState("");
//   const [eventCategory, setEventCategory] = useState("General");
//   const [bookingGap, setBookingGap] = useState(0);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [slots, setSlots] = useState([]);
//   const [isSlotLoading, setSlotIsLoading] = useState(false);
//   const [orgData, setOrgData] = useState([]);
//   const [availableDays, setAvailableDays] = useState<number[]>([]);
//   const [next30AvailableDays, setNext30AvailableDays] = useState<Date[]>([]);
//   const [eventDatas, setEventDatas] = useState([
//     { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
//     { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
//     { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
//     { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
//     { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
//     { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
//     { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
//   ]);
//   const [errors, setErrors] = useState({
//     eventName: "",
//     eventDuration: "",
//     description: "",
//     gap: "",
//   });
//   const [searchParams] = useSearchParams();
//   const eventId = searchParams.get("eventId");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userData = useSelector((state: any) => state.registration.userData);

//   // Predefined values
//   const predefinedDurations = ["2", "15", "30", "45", "60", "90", "120"];
//   const predefinedGaps = ["5", "10", "15"];
//   const predefinedCategories = [
//     "General",
//     "Litmus Test Interview",
//     "Application Test Interview",
//     "Webinar",
//     "Panel Discussion",
//     "Training Session",
//   ];

//   // Weekday names for display
//   const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   // Update available days when eventDatas changes
//   useEffect(() => {
//     const daysMapping = eventDatas
//       .map((event, index) => (event.isAvailable ? index : null))
//       .filter((day) => day !== null) as number[];
//     setAvailableDays(daysMapping);
//   }, [eventDatas]);

//   // Calculate next 30 available days based on selected weekdays
//   useEffect(() => {
//     const generateNext30AvailableDays = () => {
//       const result: Date[] = [];
//       let currentDate = new Date();

//       while (result.length < 30) {
//         if (availableDays.includes(currentDate.getDay())) {
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

//   // Toggle weekday availability
//   const toggleWeekday = (dayIndex: number) => {
//     const updatedEventDatas = [...eventDatas];
//     updatedEventDatas[dayIndex].isAvailable =
//       !updatedEventDatas[dayIndex].isAvailable;
//     setEventDatas(updatedEventDatas);
//   };

//   // Update time slot for a weekday
//   const updateTimeSlot = (
//     dayIndex: number,
//     slotIndex: number,
//     field: string,
//     value: string
//   ) => {
//     const updatedEventDatas = [...eventDatas];
//     (updatedEventDatas[dayIndex].timeSlots[slotIndex] as any)[field] = value;
//     setEventDatas(updatedEventDatas);
//   };

//   // Add new time slot to a weekday
//   const addTimeSlot = (dayIndex: number) => {
//     const updatedEventDatas = [...eventDatas];
//     updatedEventDatas[dayIndex].timeSlots.push({
//       start: "",
//       end: "",
//       error: "",
//     });
//     setEventDatas(updatedEventDatas);
//   };

//   // Remove time slot from a weekday
//   const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
//     const updatedEventDatas = [...eventDatas];
//     updatedEventDatas[dayIndex].timeSlots.splice(slotIndex, 1);
//     setEventDatas(updatedEventDatas);
//   };

//   // Validation functions
//   const validateStep1 = () => {
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
//     }

//     if (!eventDuration) {
//       newErrors.eventDuration = "Event Duration is required";
//       valid = false;
//     } else if (isNaN(eventDuration as any) || (eventDuration as any) <= 0) {
//       newErrors.eventDuration =
//         "Event Duration must be a valid positive number";
//       valid = false;
//     } else if ((eventDuration as any) < 2) {
//       newErrors.eventDuration = "Event Duration must be at least 2 minutes";
//       valid = false;
//     } else if ((eventDuration as any) > 1439) {
//       newErrors.eventDuration = "Event Duration must not exceed 1439 minutes";
//       valid = false;
//     }

//     if (bookingGap > 15) {
//       newErrors.gap = "The booking gap must be less than 15";
//       valid = false;
//     }

//     if (description.split(/\s+/).filter(Boolean).length > 60) {
//       newErrors.description = "The description must have 60 words or fewer.";
//       valid = false;
//     }

//     // Check if at least one weekday is selected
//     if (availableDays.length === 0) {
//       toast.error("Please select at least one weekday");
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleNext = () => {
//     if (validateStep1()) {
//       setStep(2);
//     }
//   };

//   const handleBack = () => {
//     setStep(1);
//   };

//   // Fetch slots when a date is selected
//   const fetchSlots = async (date: Date) => {
//     setSlotIsLoading(true);
//     setSelectedDate(date);

//     try {
//       // Simulate API call - replace with your actual API call
//       const response = await axiosInstance.post("/events?preview=true", {
//         eventName,
//         eventDuration,
//         eventDescription: description,
//         eventDatas,
//         eventId,
//         meetingGap: bookingGap,
//         eventCategory,
//         selectedDate: format(date, "yyyy-MM-dd"),
//       });

//       // Mock response - replace with actual response handling
//       const mockSlots = [
//         "10:00 AM",
//         "11:30 AM",
//         "1:00 PM",
//         "2:30 PM",
//         "4:00 PM",
//       ];

//       setSlots(mockSlots);
//       setSlotIsLoading(false);
//     } catch (error) {
//       toast.error("Failed to fetch available slots");
//       setSlotIsLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     toast.loading("Creating your event...");
//     try {
//       const response = await axiosInstance.post("/events?preview=false", {
//         eventName,
//         eventDuration,
//         eventDescription: description,
//         eventDatas,
//         eventId,
//         meetingGap: bookingGap,
//         eventCategory,
//       });

//       if (response.data.success) {
//         toast.dismiss();
//         toast.success("Event created successfully!");
//         navigate("/events/user/me");
//         dispatch(addActiveNavState(0));
//       } else {
//         toast.dismiss();
//         toast.error("Failed to create event");
//       }
//     } catch (error) {
//       toast.dismiss();
//       toast.error("An error occurred");
//     }
//   };

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Header */}
//       <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center shadow-sm">
//         {step === 2 && (
//           <button onClick={handleBack} className="mr-4">
//             <ChevronLeft size={24} />
//           </button>
//         )}
//         <h1 className="text-xl font-bold">
//           {step === 1 ? "Event Details" : "Select Date & Time"}
//         </h1>
//       </div>

//       {/* Step 1: Event Details */}
//       {step === 1 && (
//         <div className="p-4">
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">Event Name</label>
//             <input
//               type="text"
//               value={eventName}
//               onChange={(e) => setEventName(e.target.value)}
//               className="w-full p-3 border rounded-lg"
//               placeholder="Enter event name"
//             />
//             {errors.eventName && (
//               <p className="text-red-500 text-sm mt-1">{errors.eventName}</p>
//             )}
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">
//               Event Category
//             </label>
//             <select
//               value={eventCategory}
//               onChange={(e) => setEventCategory(e.target.value)}
//               className="w-full p-3 border rounded-lg bg-white"
//             >
//               {predefinedCategories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">
//               Event Duration (minutes)
//             </label>
//             <select
//               value={eventDuration}
//               onChange={(e) => setEventDuration(e.target.value)}
//               className="w-full p-3 border rounded-lg bg-white"
//             >
//               {predefinedDurations.map((dur) => (
//                 <option key={dur} value={dur}>
//                   {dur} minutes
//                 </option>
//               ))}
//             </select>
//             {errors.eventDuration && (
//               <p className="text-red-500 text-sm mt-1">
//                 {errors.eventDuration}
//               </p>
//             )}
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">
//               Meeting Gap (minutes)
//             </label>
//             <select
//               value={bookingGap}
//               onChange={(e) => setBookingGap(Number(e.target.value))}
//               className="w-full p-3 border rounded-lg bg-white"
//             >
//               {predefinedGaps.map((gap) => (
//                 <option key={gap} value={gap}>
//                   {gap} minutes
//                 </option>
//               ))}
//             </select>
//             {errors.gap && (
//               <p className="text-red-500 text-sm mt-1">{errors.gap}</p>
//             )}
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-1">
//               Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-3 border rounded-lg"
//               rows={4}
//               placeholder="Enter event description"
//             />
//             {errors.description && (
//               <p className="text-red-500 text-sm mt-1">{errors.description}</p>
//             )}
//           </div>

//           {/* Weekday Selection */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium mb-3">
//               Available Weekdays
//             </label>
//             <div className="grid grid-cols-4 gap-2 mb-4">
//               {weekdays.map((day, index) => (
//                 <button
//                   key={day}
//                   type="button"
//                   onClick={() => toggleWeekday(index)}
//                   className={`py-2 rounded-lg border ${
//                     eventDatas[index].isAvailable
//                       ? "bg-blue-100 border-blue-500 text-blue-600"
//                       : "bg-gray-100 border-gray-300 text-gray-600"
//                   }`}
//                 >
//                   {day}
//                 </button>
//               ))}
//             </div>

//             {/* Time slots for each selected weekday */}
//             {availableDays.map((dayIndex) => (
//               <div key={dayIndex} className="mb-4 p-3 border rounded-lg">
//                 <h3 className="font-medium mb-2">{weekdays[dayIndex]}</h3>
//                 {eventDatas[dayIndex].timeSlots.map((slot, slotIndex) => (
//                   <div key={slotIndex} className="flex gap-2 mb-2">
//                     <input
//                       type="time"
//                       value={slot.start}
//                       onChange={(e) =>
//                         updateTimeSlot(
//                           dayIndex,
//                           slotIndex,
//                           "start",
//                           e.target.value
//                         )
//                       }
//                       className="flex-1 p-2 border rounded"
//                     />
//                     <span className="self-center">to</span>
//                     <input
//                       type="time"
//                       value={slot.end}
//                       onChange={(e) =>
//                         updateTimeSlot(
//                           dayIndex,
//                           slotIndex,
//                           "end",
//                           e.target.value
//                         )
//                       }
//                       className="flex-1 p-2 border rounded"
//                     />
//                     {eventDatas[dayIndex].timeSlots.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removeTimeSlot(dayIndex, slotIndex)}
//                         className="p-2 text-red-500"
//                       >
//                         ×
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => addTimeSlot(dayIndex)}
//                   className="text-blue-500 text-sm"
//                 >
//                   + Add time slot
//                 </button>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={handleNext}
//             className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/* Step 2: Calendar and Time Selection */}
//       {step === 2 && (
//         <div className="p-4">
//           {/* Event Summary */}
//           <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//             <h2 className="text-lg font-semibold mb-2">{eventName}</h2>
//             <div className="flex items-center text-gray-600 mb-1">
//               <Clock size={16} className="mr-2" />
//               <span>{eventDuration} minutes</span>
//             </div>
//             <div className="flex items-center text-gray-600">
//               <FileText size={16} className="mr-2" />
//               <span className="truncate">
//                 {description || "No description"}
//               </span>
//             </div>
//           </div>

//           {/* Calendar */}
//           <div className="mb-6">
//             <h3 className="text-md font-medium mb-3">Select a Date</h3>
//             <DayPicker
//               mode="single"
//               selected={selectedDate}
//               onSelect={(date) => date && fetchSlots(date)}
//               disabled={[
//                 { before: new Date() },
//                 (date) =>
//                   !next30AvailableDays.some((availableDate) =>
//                     isSameDay(availableDate, date)
//                   ),
//               ]}
//               modifiers={{
//                 available: next30AvailableDays,
//               }}
//               modifiersStyles={{
//                 available: {
//                   color: "#3b82f6",
//                   backgroundColor: "#dbeafe",
//                 },
//               }}
//               className="border rounded-lg p-2"
//               styles={{
//                 day: {
//                   margin: "0.2em",
//                 },
//               }}
//             />
//           </div>

//           {/* Time Slots */}
//           {selectedDate && (
//             <div className="mb-6">
//               <h3 className="text-md font-medium mb-3">
//                 Available Time Slots for{" "}
//                 {selectedDate.toLocaleDateString("en-US", {
//                   weekday: "long",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </h3>
//               {isSlotLoading ? (
//                 <div className="flex justify-center py-8">
//                   <ThreeDots color="#3b82f6" height={50} width={50} />
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-2 gap-2">
//                   {slots.length > 0 ? (
//                     slots.map((slot, index) => (
//                       <button
//                         key={index}
//                         className="p-3 border border-blue-500 text-blue-600 rounded-lg text-center"
//                       >
//                         {slot}
//                       </button>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 col-span-2 text-center py-4">
//                       No available slots for this day
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}

//           <div className="flex gap-3">
//             <button
//               onClick={handleBack}
//               className="flex-1 py-3 border border-gray-300 rounded-lg font-medium"
//             >
//               Back
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={!selectedDate}
//               className={`flex-1 py-3 rounded-lg font-medium ${
//                 selectedDate
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-300 text-gray-500"
//               }`}
//             >
//               Done
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MobileEventScheduler;
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addActiveNavState } from "./app-store/gloabalSlice";
import { format, addDays, isSameDay } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  Globe2Icon,
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import toast from "react-hot-toast";
import { axiosInstance } from "./config/http";
import { ThreeDots } from "react-loader-spinner";

const MobileEventScheduler = () => {
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState("");
  const [eventDuration, setEventDuration] = useState("");
  const [description, setDescription] = useState("");
  const [eventCategory, setEventCategory] = useState("General");
  const [bookingGap, setBookingGap] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [slots, setSlots] = useState([]);
  const [isSlotLoading, setSlotIsLoading] = useState(false);
  const [_orgData, setOrgData] = useState([]);
  const [availableDays, setAvailableDays] = useState<number[]>([]);
  const [next30AvailableDays, setNext30AvailableDays] = useState<Date[]>([]);
  const [eventDatas, setEventDatas] = useState([
    { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
    { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
    { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
    { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
    { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
    { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
    { isAvailable: false, timeSlots: [{ start: "", end: "", error: "" }] },
  ]);
  const [errors, setErrors] = useState({
    eventName: "",
    eventDuration: "",
    description: "",
    gap: "",
  });
  const [globalErrors, _setGlobalErrors] = useState<string[]>([]);
  const [_otherErrors, _setOtherErrors] = useState<string[]>([]);
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const userData = useSelector((state: any) => state.registration.userData);
  const categoryData = useSelector((state: any) => state.event.categoryData);

  // Predefined values
  const predefinedDurations = ["2", "15", "30", "45", "60", "90", "120"];
  const predefinedGaps = ["5", "10", "15"];
  const predefinedCategories = [
    "General",
    "Litmus Test Interview",
    "Application Test Interview",
    "Webinar",
    "Panel Discussion",
    "Training Session",
  ];

  // Filter categories based on categoryData (same as desktop)
  const uniquePredefinedCategories = predefinedCategories.filter((category) => {
    if (
      category === "Litmus Test Review" ||
      category === "Application Test Review"
    ) {
      return !categoryData.includes(category);
    }
    return true;
  });

  // Weekday names for display
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Load edit data if eventId exists
  useEffect(() => {
    if (eventId) {
      const fetchingEditData = async () => {
        const editEventdata = await axiosInstance.get(
          `/events/event-data/${eventId}`
        );
        setEventName(editEventdata.data.data.eventName);
        setEventDuration(editEventdata.data.data.eventDuration);
        setDescription(editEventdata.data.data.eventDescription);
        setEventCategory(editEventdata.data.data.eventCategory);
        setBookingGap(editEventdata.data.data.meetingGap);
        // You may need to set eventDatas here as well based on the edit data
      };
      fetchingEditData();
    }
  }, [eventId]);

  // Update available days when eventDatas changes
  useEffect(() => {
    const daysMapping = eventDatas
      .map((event, index) => (event.isAvailable ? index : null))
      .filter((day) => day !== null) as number[];
    setAvailableDays(daysMapping);
  }, [eventDatas]);

  // Calculate next 30 available days based on selected weekdays
  useEffect(() => {
    const generateNext30AvailableDays = () => {
      const result: Date[] = [];
      let currentDate = new Date();

      while (result.length < 30) {
        if (availableDays.includes(currentDate.getDay())) {
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

  // Toggle weekday availability
  const toggleWeekday = (dayIndex: number) => {
    const updatedEventDatas = [...eventDatas];
    updatedEventDatas[dayIndex].isAvailable =
      !updatedEventDatas[dayIndex].isAvailable;
    setEventDatas(updatedEventDatas);
  };

  // Update time slot for a weekday
  const updateTimeSlot = (
    dayIndex: number,
    slotIndex: number,
    field: string,
    value: string
  ) => {
    const updatedEventDatas = [...eventDatas];
    (updatedEventDatas[dayIndex].timeSlots[slotIndex] as any)[field] = value;

    // Clear error when updating
    if (field === "start" || field === "end") {
      updatedEventDatas[dayIndex].timeSlots[slotIndex].error = "";
    }

    setEventDatas(updatedEventDatas);
  };

  // Add new time slot to a weekday
  const addTimeSlot = (dayIndex: number) => {
    const updatedEventDatas = [...eventDatas];
    updatedEventDatas[dayIndex].timeSlots.push({
      start: "",
      end: "",
      error: "",
    });
    setEventDatas(updatedEventDatas);
  };

  // Remove time slot from a weekday
  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedEventDatas = [...eventDatas];
    updatedEventDatas[dayIndex].timeSlots.splice(slotIndex, 1);
    setEventDatas(updatedEventDatas);
  };

  // Handle errors from time slot validation
  // const handleErrors = (errorList: string[], otherErrorList: any) => {
  //   setOtherErrors(otherErrorList);
  //   setGlobalErrors(errorList);
  // };

  // Validation functions
  const validateStep1 = () => {
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
    }

    if (!eventDuration) {
      newErrors.eventDuration = "Event Duration is required";
      valid = false;
    } else if (isNaN(eventDuration as any) || (eventDuration as any) <= 0) {
      newErrors.eventDuration =
        "Event Duration must be a valid positive number";
      valid = false;
    } else if ((eventDuration as any) < 2) {
      newErrors.eventDuration = "Event Duration must be at least 2 minutes";
      valid = false;
    } else if ((eventDuration as any) > 1439) {
      newErrors.eventDuration = "Event Duration must not exceed 1439 minutes";
      valid = false;
    }

    if (bookingGap > 15) {
      newErrors.gap = "The booking gap must be less than 15";
      valid = false;
    }

    if (description.split(/\s+/).filter(Boolean).length > 60) {
      newErrors.description = "The description must have 60 words or fewer.";
      valid = false;
    }

    // Check if at least one weekday is selected
    if (availableDays.length === 0) {
      toast.error("Please select at least one weekday");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  // Fetch slots when a date is selected
  const fetchSlots = async (date: Date) => {
    setSlotIsLoading(true);
    setSelectedDate(date);

    try {
      const response = await axiosInstance.post("/events?preview=true", {
        eventName,
        eventDuration,
        eventDescription: description,
        eventDatas,
        eventId,
        meetingGap: bookingGap,
        eventCategory,
        selectedDate: format(date, "yyyy-MM-dd"),
      });

      if (response.data.success) {
        const timeSlots =
          response.data.data.find(
            (day: any) => day.eventDate === format(date, "yyyy-MM-dd")
          )?.slots || [];

        setSlots(timeSlots);
        setOrgData(response.data.data);
      } else {
        toast.error("Failed to fetch available slots");
      }
    } catch (error) {
      toast.error("Failed to fetch available slots");
    } finally {
      setSlotIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    toast.loading("Creating your event...");
    try {
      const response = await axiosInstance.post("/events?preview=false", {
        eventName,
        eventDuration,
        eventDescription: description,
        eventDatas,
        eventId,
        meetingGap: bookingGap,
        eventCategory,
      });

      if (response.data.success) {
        toast.dismiss();
        toast.success("Event created successfully!");
        navigate("/events/user/me");
        dispatch(addActiveNavState(0 as any));
      } else {
        toast.dismiss();
        toast.error("Failed to create event");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("An error occurred");
    }
  };

  // Current IST time display
  const [currentISTTime, setCurrentISTTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const istOffset = 330; // IST is UTC+5:30 in minutes
      const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
      const istTime = new Date(utcTime + istOffset * 60000);
      const formattedTime = istTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      } as any);
      setCurrentISTTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 p-4 border-b flex items-center shadow-sm">
        {step === 2 ? (
          <button onClick={handleBack} className="mr-4">
            <ChevronLeft size={24} />
          </button>
        ) : (
          <button onClick={() => navigate("/events/user/me")} className="mr-4">
            <ChevronLeft size={24} />
          </button>
        )}
        <h1 className="text-xl font-bold">
          {step === 1 ? "Event Details" : "Select Date & Time"}
        </h1>
      </div>

      {/* Step 1: Event Details */}
      {step === 1 && (
        <div className="p-4">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter event name"
            />
            {errors.eventName && (
              <p className="text-red-500 text-sm mt-1">{errors.eventName}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Event Category
            </label>
            <select
              value={eventCategory}
              onChange={(e) => setEventCategory(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white"
            >
              {uniquePredefinedCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Event Duration (minutes)
            </label>
            <select
              value={eventDuration}
              onChange={(e) => setEventDuration(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white"
            >
              {predefinedDurations.map((dur) => (
                <option key={dur} value={dur}>
                  {dur} minutes
                </option>
              ))}
            </select>
            {errors.eventDuration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.eventDuration}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Meeting Gap (minutes)
            </label>
            <select
              value={bookingGap}
              onChange={(e) => setBookingGap(Number(e.target.value))}
              className="w-full p-3 border rounded-lg bg-white"
            >
              {predefinedGaps.map((gap) => (
                <option key={gap} value={gap}>
                  {gap} minutes
                </option>
              ))}
            </select>
            {errors.gap && (
              <p className="text-red-500 text-sm mt-1">{errors.gap}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg"
              rows={4}
              placeholder="Enter event description"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Weekday Selection - Matching Desktop Functionality */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">
              Available Weekdays
            </label>

            {/* Weekday Toggle Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {weekdays.map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleWeekday(index)}
                  className={`py-2 rounded-lg border ${
                    eventDatas[index].isAvailable
                      ? "bg-blue-100 border-blue-500 text-blue-600"
                      : "bg-gray-100 border-gray-300 text-gray-600"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {/* Time slots for each selected weekday */}
            {availableDays.map((dayIndex) => (
              <div
                key={dayIndex}
                className="mb-4 p-3 border rounded-lg bg-gray-50"
              >
                <h3 className="font-medium mb-2 flex justify-between items-center">
                  <span>{weekdays[dayIndex]}</span>
                  <button
                    type="button"
                    onClick={() => addTimeSlot(dayIndex)}
                    className="text-blue-500 text-sm flex items-center"
                  >
                    <span>Add Slot</span>
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </h3>

                {eventDatas[dayIndex].timeSlots.map((slot, slotIndex) => (
                  <div
                    key={slotIndex}
                    className="mb-3 p-2 border rounded bg-white"
                  >
                    <div className="flex gap-2 mb-2">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">
                          Start
                        </label>
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) =>
                            updateTimeSlot(
                              dayIndex,
                              slotIndex,
                              "start",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-500 mb-1">
                          End
                        </label>
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) =>
                            updateTimeSlot(
                              dayIndex,
                              slotIndex,
                              "end",
                              e.target.value
                            )
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      {eventDatas[dayIndex].timeSlots.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                          className="p-2 text-red-500 self-end"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    {slot.error && (
                      <p className="text-red-500 text-xs mt-1">{slot.error}</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Global errors display */}
          {globalErrors.length > 0 && (
            <div className="mb-4 text-red-500 text-sm">
              {globalErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}

          <button
            onClick={handleNext}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Calendar and Time Selection */}
      {step === 2 && (
        <div className="p-4">
          {/* Event Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{eventName}</h2>
            <div className="flex items-center text-gray-600 mb-1">
              <Clock size={16} className="mr-2" />
              <span>{eventDuration} minutes</span>
            </div>
            <div className="flex items-center text-gray-600">
              <FileText size={16} className="mr-2" />
              <span className="truncate">
                {description || "No description"}
              </span>
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-6">
            <h3 className="text-md font-medium mb-3">Select a Date</h3>
            <DayPicker
              mode="single"
              selected={selectedDate as any}
              onSelect={(date) => date && fetchSlots(date)}
              disabled={[
                { before: new Date() },
                (date) =>
                  !next30AvailableDays.some((availableDate) =>
                    isSameDay(availableDate, date)
                  ),
              ]}
              modifiers={{
                available: next30AvailableDays,
              }}
              modifiersStyles={{
                available: {
                  color: "#3b82f6",
                  backgroundColor: "#dbeafe",
                },
              }}
              className="border rounded-lg p-2"
              styles={{
                day: {
                  margin: "0.2em",
                },
              }}
            />
          </div>

          {/* Timezone */}
          <div className="mb-6">
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

          {/* Time Slots */}
          {selectedDate && (
            <div className="mb-6">
              <h3 className="text-md font-medium mb-3">
                Available Time Slots for{" "}
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              {isSlotLoading ? (
                <div className="flex justify-center py-8">
                  <ThreeDots color="#3b82f6" height={50} width={50} />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {slots.length > 0 ? (
                    slots.map((slot, index) => (
                      <button
                        key={index}
                        className="p-3 border border-blue-500 text-blue-600 rounded-lg text-center"
                      >
                        {slot}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-2 text-center py-4">
                      No available slots for this day
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="flex-1 py-3 border border-gray-300 rounded-lg font-medium"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedDate}
              className={`flex-1 py-3 rounded-lg font-medium ${
                selectedDate
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileEventScheduler;
