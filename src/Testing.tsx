// import { Copy, Plus, XIcon } from "lucide-react";
// import { useState, useEffect } from "react";
// import { axiosInstance } from "./config/http"; // Replace with your actual axios instance

// const timeFormatRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/;

// export const Testing = ({ update = true, setEventDays }: any) => {
//   const [availability, setAvailability] = useState(
//     Array(7)
//       .fill(null)
//       .map(() => ({
//         isAvailable: true,
//         timeSlots: [{ start: "9:00am", end: "5:00pm", error: "" }],
//       }))
//   );

//   // Handle availability checkbox change for individual days
//   const handleCheckboxChange = (dayIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex].isAvailable =
//       !updatedAvailability[dayIndex].isAvailable;
//     setAvailability(updatedAvailability);
//   };

//   // Validate time format using regex
//   const validateTimeFormat = (time: string) => {
//     const normalizedTime = time.toLowerCase();
//     return timeFormatRegex.test(normalizedTime);
//   };

//   // Convert 12-hour format to 24-hour format for comparison
//   const convertTo24Hour = (time: string) => {
//     const [hour, minute] = time.match(/(\d{1,2}):(\d{2})(am|pm)/).slice(1, 3);
//     const isAM = time.includes("am");
//     let hours = parseInt(hour, 10);

//     if (hours === 12) {
//       hours = isAM ? 0 : 12; // 12 AM -> 00:00, 12 PM -> 12:00
//     } else {
//       hours = isAM ? hours : hours + 12; // PM times are +12 hours
//     }

//     return `${String(hours).padStart(2, "0")}:${minute}`;
//   };

//   // Handle time change with validation for start and end times
//   const handleTimeChange = (
//     dayIndex: number,
//     slotIndex: number,
//     field: string,
//     value: string
//   ) => {
//     const updatedAvailability = [...availability];
//     const updatedSlot = updatedAvailability[dayIndex].timeSlots[slotIndex];

//     // Set the value for the correct field
//     updatedSlot[field] = value.trim();

//     // Reset error message for the time slot
//     updatedSlot.error = "";

//     // Handle error when any input is empty
//     if (!updatedSlot.start || !updatedSlot.end) {
//       updatedSlot.error = "Both start and end times are required.";
//     }
//     // Handle error when time format is invalid
//     else if (
//       !validateTimeFormat(updatedSlot.start) ||
//       !validateTimeFormat(updatedSlot.end)
//     ) {
//       updatedSlot.error = "Invalid time format. Use HH:MM am/pm.";
//     }
//     // Handle error when end time is less than or equal to start time
//     else if (
//       convertTo24Hour(updatedSlot.end) <= convertTo24Hour(updatedSlot.start)
//     ) {
//       updatedSlot.error = "End time must be later than start time.";
//     }

//     setAvailability(updatedAvailability);
//   };

//   // Add a new time slot for a specific day
//   const addTimeSlot = (dayIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex].timeSlots.push({
//       start: "",
//       end: "",
//       error: "", // Add an error field to the new slot
//     });
//     setAvailability(updatedAvailability);
//   };

//   // Remove a time slot for a specific day
//   const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex].timeSlots.splice(slotIndex, 1);
//     setAvailability(updatedAvailability);
//   };

//   // Copy availability from one day to all days
//   const copyToAllDays = (dayIndex: number) => {
//     const selectedDaySlots = availability[dayIndex];
//     const updatedAvailability = Array(7).fill(selectedDaySlots);
//     setAvailability(updatedAvailability);
//   };

//   // Create availability by submitting to backend
//   const createAvailability = async () => {
//     try {
//       const response = await axiosInstance.post("/events/availability", {
//         availability: availability,
//       });

//       if (response.data.status) {
//         console.log("Updated successfully");
//       } else {
//         console.log("There is an error in updating");
//       }
//     } catch (error) {
//       console.log("Error creating availability", error);
//     }
//   };

//   // Check if there are any errors in the time slots
//   const hasErrors = () => {
//     return availability.some((day) =>
//       day.timeSlots.some((slot) => slot.error !== "")
//     );
//   };

//   useEffect(() => {
//     if (!update) {
//       setEventDays(availability);
//     }
//   }, [availability]);

//   return (
//     <div className="flex flex-col gap-6 p-5 border border-blue-100 rounded-md shadow-md">
//       {[
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//       ].map((day, dayIndex) => (
//         <div key={day} className="flex items-start gap-8">
//           <div className="flex items-start gap-2 w-16">
//             <input
//               type="checkbox"
//               checked={availability[dayIndex].isAvailable}
//               onChange={() => handleCheckboxChange(dayIndex)}
//               className="w-4 h-4 accent-blue mt-3"
//             />
//             <span className="font-bold text-md mt-2">
//               {day.slice(0, 3).toUpperCase()}
//             </span>
//           </div>

//           <div className="flex flex-col gap-4 items-start w-44">
//             {availability[dayIndex].isAvailable ? (
//               availability[dayIndex].timeSlots.map((slot, slotIndex) => (
//                 <div key={slotIndex} className="flex flex-col gap-3 w-full">
//                   <div className="flex gap-3 items-center">
//                     <input
//                       type="text"
//                       placeholder="Start"
//                       value={slot.start}
//                       onChange={(e) =>
//                         handleTimeChange(
//                           dayIndex,
//                           slotIndex,
//                           "start",
//                           e.target.value
//                         )
//                       }
//                       className={`w-20 h-10 border text-center rounded-md font-light text-sm text-gray-600 ${
//                         slot.error ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     <input
//                       type="text"
//                       placeholder="End"
//                       value={slot.end}
//                       onChange={(e) =>
//                         handleTimeChange(
//                           dayIndex,
//                           slotIndex,
//                           "end",
//                           e.target.value
//                         )
//                       }
//                       className={`w-20 h-10 border text-center rounded-md font-light text-sm text-gray-600 ${
//                         slot.error ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {slotIndex > 0 && (
//                       <button
//                         className="text-gray-600 hover:text-red-700 ml-2"
//                         onClick={() => removeTimeSlot(dayIndex, slotIndex)}
//                       >
//                         <XIcon size={16} />
//                       </button>
//                     )}
//                   </div>

//                   {/* Error message below the start and end fields */}
//                   {slot.error && (
//                     <div className="text-red-500 text-xs mt-1 w-full">
//                       {slot.error}
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-600">Unavailable</div>
//             )}
//           </div>

//           <div className="flex justify-between items-center gap-2">
//             <button
//               onClick={() => addTimeSlot(dayIndex)}
//               className="p-2 hover:bg-gray-100"
//             >
//               <Plus size={16} />
//             </button>
//             {update && (
//               <button
//                 onClick={() => copyToAllDays(dayIndex)}
//                 className="p-2 hover:bg-gray-100"
//               >
//                 <Copy size={16} />
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//       {update && (
//         <div className="ml-40">
//           <button
//             onClick={() => createAvailability()}
//             disabled={hasErrors()} // Disable the button if there are errors
//             className={`px-12 py-2 rounded-md text-white ${
//               hasErrors()
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             Update
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Testing;
import { Copy, Plus, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { axiosInstance } from "./config/http"; // Replace with your actual axios instance

const timeFormatRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/;

export const Testing = ({
  update = true,
  eventDays,
  setEventDays,
  onError,
}: any) => {
  useEffect(() => {}, [eventDays]);
  const [availability, setAvailability] = useState(
    // Array(7)
    //   .fill(null)
    //   .map(() => ({
    //     isAvailable: true,
    //     timeSlots: [{ start: "9:00am", end: "5:00pm", error: "" }],
    //   }))
    eventDays
  );

  // Handle availability checkbox change for individual days
  const handleCheckboxChange = (dayIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].isAvailable =
      !updatedAvailability[dayIndex].isAvailable;
    setAvailability(updatedAvailability);
  };

  // Validate time format using regex
  const validateTimeFormat = (time: string) => {
    const normalizedTime = time.toLowerCase();
    return timeFormatRegex.test(normalizedTime);
  };

  // Convert 12-hour format to 24-hour format for comparison
  const convertTo24Hour = (time: any) => {
    const [hour, minute] = time?.match(/(\d{1,2}):(\d{2})(am|pm)/).slice(1, 3);
    const isAM = time.includes("am");
    let hours = parseInt(hour, 10);

    if (hours === 12) {
      hours = isAM ? 0 : 12; // 12 AM -> 00:00, 12 PM -> 12:00
    } else {
      hours = isAM ? hours : hours + 12; // PM times are +12 hours
    }

    return `${String(hours).padStart(2, "0")}:${minute}`;
  };

  // Handle time change with validation for start and end times
  const handleTimeChange = (
    dayIndex: number,
    slotIndex: number,
    field: string,
    value: string
  ) => {
    const updatedAvailability = [...availability];
    const updatedSlot = updatedAvailability[dayIndex].timeSlots[slotIndex];

    // Set the value for the correct field
    updatedSlot[field] = value.trim();

    // Reset error message for the time slot
    updatedSlot.error = "";

    // Handle error when any input is empty
    if (!updatedSlot.start || !updatedSlot.end) {
      updatedSlot.error = "Both start and end times are required.";
    }
    // Handle error when time format is invalid
    else if (
      !validateTimeFormat(updatedSlot.start) ||
      !validateTimeFormat(updatedSlot.end)
    ) {
      updatedSlot.error = "Invalid time format. Use HH:MM am/pm.";
    }
    // Handle error when end time is less than or equal to start time
    else if (
      convertTo24Hour(updatedSlot.end) <= convertTo24Hour(updatedSlot.start)
    ) {
      updatedSlot.error = "End time must be later than start time.";
    }

    setAvailability(updatedAvailability);
  };

  // Add a new time slot for a specific day
  const addTimeSlot = (dayIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].timeSlots.push({
      start: "",
      end: "",
      error: "Both start and end times are required.", // Add an error field to the new slot
    });
    setAvailability(updatedAvailability);
  };

  // Remove a time slot for a specific day
  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].timeSlots.splice(slotIndex, 1);
    setAvailability(updatedAvailability);
  };

  // Copy availability from one day to all days
  const copyToAllDays = (dayIndex: number) => {
    const selectedDaySlots = availability[dayIndex];
    const updatedAvailability = Array(7).fill(selectedDaySlots);
    setAvailability(updatedAvailability);
  };

  // Check if at least one day is available
  const isAtLeastOneDayChecked = () => {
    return availability.some((day: any) => day.isAvailable);
  };

  // Create availability by submitting to backend
  const createAvailability = async () => {
    console.log(availability, "ava");

    if (!isAtLeastOneDayChecked()) {
      alert("Please select at least one day as available.");
      return;
    }

    try {
      const response = await axiosInstance.post("/events/availability", {
        availability: availability,
      });

      if (response.data.status) {
        console.log("Updated successfully");
      } else {
        console.log("There is an error in updating");
      }
    } catch (error) {
      console.log("Error creating availability", error);
    }
  };

  // Check if there are any errors in the time slots
  const hasErrors = () => {
    return availability.some((day: any) =>
      day.timeSlots.some((slot: any) => slot.error !== "")
    );
  };

  useEffect(() => {
    if (!update) {
      setEventDays(availability);
    }
  }, [availability]);

  //newww Test
  // const collectErrors = () => {
  //   const errors = [];

  //   // Check if at least one day is available
  //   if (!isAtLeastOneDayChecked()) {
  //     errors.push("Please select at least one day as available.");
  //   }

  //   // Collect time slot errors
  //   availability.forEach((day, dayIndex) => {
  //     day.timeSlots.forEach((slot, slotIndex) => {
  //       if (slot.error) {
  //         errors.push(
  //           `Day ${dayIndex + 1}, Slot ${slotIndex + 1}: ${slot.error}`
  //         );
  //       }
  //     });
  //   });

  //   return errors;
  // };

  // // Call the onError callback whenever errors are detected
  // useEffect(() => {
  //   if (onError) {
  //     const errors = collectErrors();
  //     onError(errors);
  //   }
  // }, [availability]);
  const collectGlobalErrors = () => {
    const errors = [];
    if (!isAtLeastOneDayChecked()) {
      errors.push("Please select at least one day as available.");
    }
    return errors;
  };

  // Notify the parent about global errors
  useEffect(() => {
    const otherErrors: any = [];
    availability.forEach((day: any, dayIndex: any) => {
      day.timeSlots.forEach((slot: any, slotIndex: any) => {
        if (slot.error) {
          otherErrors.push(
            `Day ${dayIndex + 1}, Slot ${slotIndex + 1}: ${slot.error}`
          );
        }
      });
    });
    if (onError) {
      const globalErrors = collectGlobalErrors(); // Collect only global errors
      onError(globalErrors, otherErrors);
    }
  }, [availability]); // Recalculate errors when availability changes

  //neewTest

  return (
    <div className="flex flex-col gap-6 p-5 border border-blue-100 rounded-md shadow-md">
      {[
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ].map((day, dayIndex) => (
        <div key={day} className="flex items-start gap-8">
          <div className="flex items-start gap-2 w-16">
            <input
              type="checkbox"
              checked={availability[dayIndex].isAvailable}
              onChange={() => handleCheckboxChange(dayIndex)}
              className="w-4 h-4 accent-blue mt-3"
            />
            <span className="font-bold text-md mt-2">
              {day.slice(0, 3).toUpperCase()}
            </span>
          </div>

          <div className="flex flex-col gap-4 items-start w-44">
            {availability[dayIndex].isAvailable ? (
              availability[dayIndex].timeSlots.map(
                (slot: any, slotIndex: any) => (
                  <div key={slotIndex} className="flex flex-col gap-3 w-full">
                    <div className="flex gap-3 items-center">
                      <input
                        type="text"
                        placeholder="Start"
                        value={slot.start}
                        onChange={(e) =>
                          handleTimeChange(
                            dayIndex,
                            slotIndex,
                            "start",
                            e.target.value
                          )
                        }
                        className={`w-20 h-10 border text-center rounded-md font-light text-sm text-gray-600 ${
                          slot.error ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="End"
                        value={slot.end}
                        onChange={(e) =>
                          handleTimeChange(
                            dayIndex,
                            slotIndex,
                            "end",
                            e.target.value
                          )
                        }
                        className={`w-20 h-10 border text-center rounded-md font-light text-sm text-gray-600 ${
                          slot.error ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {slotIndex > 0 && (
                        <button
                          className="text-gray-600 hover:text-red-700 ml-2"
                          onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                        >
                          <XIcon size={16} />
                        </button>
                      )}
                    </div>

                    {/* Error message below the start and end fields */}
                    {slot.error && (
                      <div className="text-red-500 text-xs mt-1 w-full">
                        {slot.error}
                      </div>
                    )}
                  </div>
                )
              )
            ) : (
              <div className="text-center text-gray-600 mt-2">Unavailable</div>
            )}
          </div>

          {availability[dayIndex].isAvailable && (
            <div className="flex justify-between items-center gap-2">
              <button
                onClick={() => addTimeSlot(dayIndex)}
                className="p-2 hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
              {update && (
                <button
                  onClick={() => copyToAllDays(dayIndex)}
                  className="p-2 hover:bg-gray-100"
                >
                  <Copy size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      ))}
      {update && (
        <div className="ml-40">
          <button
            onClick={() => createAvailability()}
            disabled={hasErrors() || !isAtLeastOneDayChecked()} // Disable the button if there are errors or no days checked
            className={`px-12 py-2 rounded-md text-white ${
              hasErrors() || !isAtLeastOneDayChecked()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};

export default Testing;
// import { Copy, Plus, XIcon } from "lucide-react";
// import { useState, useEffect } from "react";
// import { axiosInstance } from "./config/http"; // Replace with your actual axios instance

// const timeFormatRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/;

// const Testing = ({ update = true, setEventDays }: any) => {
//   const [availability, setAvailability] = useState(
//     Array(7)
//       .fill(null)
//       .map(() => ({
//         isAvailable: true,
//         timeSlots: [{ start: "9:00am", end: "5:00pm", error: "" }],
//       }))
//   );

//   // Helper to validate time format using regex
//   const validateTimeFormat = (time: string) => {
//     const normalizedTime = time.toLowerCase();
//     return timeFormatRegex.test(normalizedTime);
//   };

//   // Convert 12-hour format to 24-hour format for time comparison
//   const convertTo24Hour = (time: string) => {
//     const [hour, minute, period] = time
//       .match(/(\d{1,2}):(\d{2})(am|pm)/)!
//       .slice(1);
//     let hours = parseInt(hour, 10);

//     if (hours === 12) hours = period === "am" ? 0 : 12;
//     else if (period === "pm") hours += 12;

//     return `${String(hours).padStart(2, "0")}:${minute}`;
//   };

//   // Update time slot with validation
//   const handleTimeChange = (
//     dayIndex: number,
//     slotIndex: number,
//     field: string,
//     value: string
//   ) => {
//     const updatedAvailability = [...availability];
//     const slot = updatedAvailability[dayIndex].timeSlots[slotIndex];

//     slot[field] = value.trim();
//     slot.error = ""; // Reset error message

//     if (!slot.start || !slot.end) {
//       slot.error = "Both start and end times are required.";
//     } else if (
//       !validateTimeFormat(slot.start) ||
//       !validateTimeFormat(slot.end)
//     ) {
//       slot.error = "Invalid time format. Use HH:MM am/pm.";
//     } else if (convertTo24Hour(slot.end) <= convertTo24Hour(slot.start)) {
//       slot.error = "End time must be later than start time.";
//     }

//     setAvailability(updatedAvailability);
//   };

//   // Add a new time slot with initial error state
//   const addTimeSlot = (dayIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex].timeSlots.push({
//       start: "",
//       end: "",
//       error: "Both start and end times are required.", // Show error immediately
//     });
//     setAvailability(updatedAvailability);
//   };

//   // Remove a time slot
//   const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex].timeSlots.splice(slotIndex, 1);
//     setAvailability(updatedAvailability);
//   };

//   // Toggle availability for a day
//   const handleCheckboxChange = (dayIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex].isAvailable =
//       !updatedAvailability[dayIndex].isAvailable;
//     setAvailability(updatedAvailability);
//   };

//   // Copy availability from one day to all days
//   const copyToAllDays = (dayIndex: number) => {
//     const selectedDaySlots = { ...availability[dayIndex] };
//     const updatedAvailability = Array(7).fill(selectedDaySlots);
//     setAvailability(updatedAvailability);
//   };

//   // Check if any day is selected as available
//   const isAtLeastOneDayChecked = () =>
//     availability.some((day) => day.isAvailable);

//   // Submit availability to the backend
//   const createAvailability = async () => {
//     if (!isAtLeastOneDayChecked()) {
//       alert("Please select at least one day as available.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/events/availability", {
//         availability,
//       });

//       if (response.data.status) {
//         console.log("Updated successfully");
//       } else {
//         console.error("Error updating availability");
//       }
//     } catch (error) {
//       console.error("Error creating availability", error);
//     }
//   };

//   // Check if there are any errors in the slots
//   const hasErrors = () =>
//     availability.some((day) => day.timeSlots.some((slot) => slot.error));

//   // Update parent state if required
//   useEffect(() => {
//     if (!update) {
//       setEventDays(availability);
//     }
//   }, [availability]);

//   return (
//     <div className="flex flex-col gap-6 p-5 border border-blue-100 rounded-md shadow-md">
//       {[
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday",
//       ].map((day, dayIndex) => (
//         <div key={day} className="flex items-start gap-8">
//           <div className="flex items-start gap-2 w-16">
//             <input
//               type="checkbox"
//               checked={availability[dayIndex].isAvailable}
//               onChange={() => handleCheckboxChange(dayIndex)}
//               className="w-4 h-4 accent-blue mt-3"
//             />
//             <span className="font-bold text-md mt-2">
//               {day.slice(0, 3).toUpperCase()}
//             </span>
//           </div>

//           <div className="flex flex-col gap-4 items-start w-44">
//             {availability[dayIndex].isAvailable ? (
//               availability[dayIndex].timeSlots.map((slot, slotIndex) => (
//                 <div key={slotIndex} className="flex flex-col gap-3 w-full">
//                   <div className="flex gap-3 items-center">
//                     <input
//                       type="text"
//                       placeholder="Start"
//                       value={slot.start}
//                       onChange={(e) =>
//                         handleTimeChange(
//                           dayIndex,
//                           slotIndex,
//                           "start",
//                           e.target.value
//                         )
//                       }
//                       className={`w-20 h-10 border text-center rounded-md font-light text-sm text-gray-600 ${
//                         slot.error ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />

//                     <input
//                       type="text"
//                       placeholder="End"
//                       value={slot.end}
//                       onChange={(e) =>
//                         handleTimeChange(
//                           dayIndex,
//                           slotIndex,
//                           "end",
//                           e.target.value
//                         )
//                       }
//                       className={`w-20 h-10 border text-center rounded-md font-light text-sm text-gray-600 ${
//                         slot.error ? "border-red-500" : "border-gray-300"
//                       }`}
//                     />
//                     {slotIndex > 0 && (
//                       <button
//                         className="text-gray-600 hover:text-red-700 ml-2"
//                         onClick={() => removeTimeSlot(dayIndex, slotIndex)}
//                       >
//                         <XIcon size={16} />
//                       </button>
//                     )}
//                   </div>
//                   {slot.error && (
//                     <div className="text-red-500 text-xs mt-1 w-full">
//                       {slot.error}
//                     </div>
//                   )}
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-600">Unavailable</div>
//             )}
//           </div>

//           <div className="flex justify-between items-center gap-2">
//             <button
//               onClick={() => addTimeSlot(dayIndex)}
//               className="p-2 hover:bg-gray-100"
//             >
//               <Plus size={16} />
//             </button>
//             {update && (
//               <button
//                 onClick={() => copyToAllDays(dayIndex)}
//                 className="p-2 hover:bg-gray-100"
//               >
//                 <Copy size={16} />
//               </button>
//             )}
//           </div>
//         </div>
//       ))}
//       {update && (
//         <div className="ml-40">
//           <button
//             onClick={createAvailability}
//             disabled={hasErrors() || !isAtLeastOneDayChecked()}
//             className={`px-12 py-2 rounded-md text-white ${
//               hasErrors() || !isAtLeastOneDayChecked()
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-blue-500 hover:bg-blue-600"
//             }`}
//           >
//             Update
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Testing;
