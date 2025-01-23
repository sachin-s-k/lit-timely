// import { Copy, Plus, XIcon } from "lucide-react";
// import { useState, useEffect } from "react";
// import { axiosInstance } from "./config/http"; // Replace with your actual axios instance

// const timeFormatRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/;

// export const Testing = ({
//   update = true,
//   eventId,
//   eventDays,
//   setEventDays,
//   onError,
// }: any) => {
//   useEffect(() => {
//     //setAvailability(eventDays);
//   }, [eventDays]);
//   useEffect(() => {
//     const fetchingEditData = async () => {
//       const editEventdata = await axiosInstance.get(
//         `/events/event-data/${eventId}`
//       );
//       // console.log(editEventdata, "editttttt");

//       // setEventData(editEventdata.data.data.availability);
//       //setEditEventDays(editEventdata.data.data.availability);
//       console.log(editEventdata.data.data.availability, "eee&&&");
//       // eventData = editEventdata.data.data.availability;
//       //setEventData(editEventdata.data.data.availability);
//       //eventData = editEventdata.data.data.availability;
//       let eventData = [
//         {
//           isAvailable: true,
//           timeSlots: [
//             {
//               start: "",
//               end: "",
//               error: "startTime and endTime are requiredddd",
//             },
//           ],
//         },
//         {
//           isAvailable: true,
//           timeSlots: [
//             {
//               start: "9:00am",
//               end: "5:00pm",
//               error: "",
//             },
//           ],
//         },
//         {
//           isAvailable: false,
//           timeSlots: [
//             {
//               start: "9:00am",
//               end: "5:00pm",
//               error: "",
//             },
//           ],
//         },
//         {
//           isAvailable: true,
//           timeSlots: [
//             {
//               start: "9:00am",
//               end: "5:00pm",
//               error: "",
//             },
//           ],
//         },
//         {
//           isAvailable: true,
//           timeSlots: [
//             {
//               start: "9:00am",
//               end: "5:00pm",
//               error: "",
//             },
//           ],
//         },
//         {
//           isAvailable: false,
//           timeSlots: [
//             {
//               start: "",
//               end: "",
//               error: "",
//             },
//           ],
//         },
//         {
//           isAvailable: true,
//           timeSlots: [
//             {
//               start: "9:00am",
//               end: "5:00pm",
//               error: "",
//             },
//           ],
//         },
//       ];
//       if (!eventId) {
//         setAvailability(eventData);
//       } else {
//         setAvailability(editEventdata.data.data.availability);
//       }
//     };

//     fetchingEditData();
//   }, [eventId]);
//   const [availability, setAvailability] = useState(
//     // Array(7)
//     //   .fill(null)
//     //   .map(() => ({
//     //     isAvailable: true,
//     //     timeSlots: [{ start: "9:00am", end: "5:00pm", error: "" }],
//     //   }))
//     eventDays
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
//   const convertTo24Hour = (time: any) => {
//     const [hour, minute] = time?.match(/(\d{1,2}):(\d{2})(am|pm)/).slice(1, 3);
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
//       error: "Both start and end times are required.", // Add an error field to the new slot
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

//   // Check if at least one day is available
//   const isAtLeastOneDayChecked = () => {
//     return availability.some((day: any) => day.isAvailable);
//   };

//   // Create availability by submitting to backend
//   const createAvailability = async () => {
//     console.log(availability, "ava");

//     if (!isAtLeastOneDayChecked()) {
//       alert("Please select at least one day as available.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/events/availability", {
//         availability: availability,
//       });

//       if (response.data.status) {
//         console.log("Updated successfully");
//       } else {
//         // console.log("There is an error in updating");
//       }
//     } catch (error) {
//       // console.log("Error creating availability", error);
//     }
//   };

//   // Check if there are any errors in the time slots
//   const hasErrors = () => {
//     return availability.some((day: any) =>
//       day.timeSlots.some((slot: any) => slot.error !== "")
//     );
//   };

//   useEffect(() => {
//     console.log("hello");

//     if (!update) {
//       setEventDays(availability);
//     }
//   }, [availability]);

//   //newww Test
//   // const collectErrors = () => {
//   //   const errors = [];

//   //   // Check if at least one day is available
//   //   if (!isAtLeastOneDayChecked()) {
//   //     errors.push("Please select at least one day as available.");
//   //   }

//   //   // Collect time slot errors
//   //   availability.forEach((day, dayIndex) => {
//   //     day.timeSlots.forEach((slot, slotIndex) => {
//   //       if (slot.error) {
//   //         errors.push(
//   //           `Day ${dayIndex + 1}, Slot ${slotIndex + 1}: ${slot.error}`
//   //         );
//   //       }
//   //     });
//   //   });

//   //   return errors;
//   // };

//   // // Call the onError callback whenever errors are detected
//   // useEffect(() => {
//   //   if (onError) {
//   //     const errors = collectErrors();
//   //     onError(errors);
//   //   }
//   // }, [availability]);
//   const collectGlobalErrors = () => {
//     const errors = [];
//     if (!isAtLeastOneDayChecked()) {
//       errors.push("Please select at least one day as available.");
//     }
//     return errors;
//   };

//   // Notify the parent about global errors
//   useEffect(() => {
//     const otherErrors: any = [];
//     availability.forEach((day: any, dayIndex: any) => {
//       if (day.isAvailable) {
//         day.timeSlots.forEach((slot: any, slotIndex: any) => {
//           if (slot.error) {
//             otherErrors.push(
//               `Day ${dayIndex + 1}, Slot ${slotIndex + 1}: ${slot.error}`
//             );
//           }
//         });
//       }
//     });
//     if (onError) {
//       const globalErrors = collectGlobalErrors(); // Collect only global errors
//       onError(globalErrors, otherErrors);
//     }
//   }, [availability]); // Recalculate errors when availability changes

//   //neewTest
//   // console.log(availability, "availa");

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
//       ]?.map((day, dayIndex) => (
//         <div key={day} className="flex items-start gap-8">
//           <div className="flex items-start gap-2 w-16">
//             <input
//               type="checkbox"
//               checked={availability[dayIndex]?.isAvailable}
//               onChange={() => handleCheckboxChange(dayIndex)}
//               className="w-4 h-4 accent-blue mt-3"
//             />
//             <span className="font-bold text-md mt-2">
//               {day.slice(0, 3).toUpperCase()}
//             </span>
//           </div>

//           <div className="flex flex-col gap-4 items-start w-44">
//             {availability[dayIndex].isAvailable ? (
//               availability[dayIndex].timeSlots.map(
//                 (slot: any, slotIndex: any) => (
//                   <div key={slotIndex} className="flex flex-col gap-3 w-full">
//                     <div className="flex gap-3 items-center">
//                       <input
//                         type="text"
//                         placeholder="Start"
//                         value={slot.start}
//                         onChange={(e) =>
//                           handleTimeChange(
//                             dayIndex,
//                             slotIndex,
//                             "start",
//                             e.target.value
//                           )
//                         }
//                         className={`w-20 h-10 border text-center rounded-md font-light text-sm text-gray-600 ${
//                           slot.error ? "border-red-500" : "border-gray-300"
//                         }`}
//                       />
//                       <input
//                         type="text"
//                         placeholder="End"
//                         value={slot.end}
//                         onChange={(e) =>
//                           handleTimeChange(
//                             dayIndex,
//                             slotIndex,
//                             "end",
//                             e.target.value
//                           )
//                         }
//                         className={`w-20 h-10 border text-center rounded-md font-light text-sm text-gray-600 ${
//                           slot.error ? "border-red-500" : "border-gray-300"
//                         }`}
//                       />
//                       {slotIndex > 0 && (
//                         <button
//                           className="text-gray-600 hover:text-red-700 ml-2"
//                           onClick={() => removeTimeSlot(dayIndex, slotIndex)}
//                         >
//                           <XIcon size={16} />
//                         </button>
//                       )}
//                     </div>

//                     {/* Error message below the start and end fields */}
//                     {slot.error && (
//                       <div className="text-red-500 text-xs mt-1 w-full">
//                         {slot.error}
//                       </div>
//                     )}
//                   </div>
//                 )
//               )
//             ) : (
//               <div className="text-center text-gray-600 mt-2">Unavailable</div>
//             )}
//           </div>

//           {availability[dayIndex].isAvailable && (
//             <div className="flex justify-between items-center gap-2">
//               <button
//                 onClick={() => addTimeSlot(dayIndex)}
//                 className="p-2 hover:bg-gray-100"
//               >
//                 <Plus size={16} />
//               </button>
//               {update && (
//                 <button
//                   onClick={() => copyToAllDays(dayIndex)}
//                   className="p-2 hover:bg-gray-100"
//                 >
//                   <Copy size={16} />
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//       {update && (
//         <div className="ml-40">
//           <button
//             onClick={() => createAvailability()}
//             disabled={hasErrors() || !isAtLeastOneDayChecked()} // Disable the button if there are errors or no days checked
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

//importn one
import { Copy, Plus, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { axiosInstance } from "./config/http"; // Replace with your actual axios instance

const timeFormatRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/;

export const Testing = ({
  update = true,
  eventId,
  eventDays,
  setEventDays,
  onError,
}: any) => {
  useEffect(() => {
    const fetchingEditData = async () => {
      const editEventData = await axiosInstance.get(
        `/events/event-data/${eventId}`
      );
      const eventData = editEventData?.data?.data?.availability || [];
      setAvailability(eventId ? eventData : eventDays);
    };

    fetchingEditData();
  }, [eventId]);

  const [availability, setAvailability] = useState(eventDays || []);

  const handleCheckboxChange = (dayIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].isAvailable =
      !updatedAvailability[dayIndex].isAvailable;
    setAvailability(updatedAvailability);
  };

  const validateTimeFormat = (time: string) => {
    const normalizedTime = time.toLowerCase();
    return timeFormatRegex.test(normalizedTime);
  };

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

  const checkOverlap = (newSlot: any, existingSlots: any) => {
    for (const existingSlot of existingSlots) {
      const existingStart = convertTo24Hour(existingSlot.start);
      const existingEnd = convertTo24Hour(existingSlot.end);
      const newStart = convertTo24Hour(newSlot.start);
      const newEnd = convertTo24Hour(newSlot.end);

      // Check if the new slot overlaps with an existing slot
      if (
        newStart < existingEnd &&
        newEnd > existingStart // Overlap check
      ) {
        return true; // Overlap found
      }
    }
    return false; // No overlap
  };
  const handleTimeChange = (
    dayIndex: number,
    slotIndex: number,
    field: string,
    value: string
  ) => {
    const updatedAvailability = [...availability];
    const updatedSlot = updatedAvailability[dayIndex].timeSlots[slotIndex];

    updatedSlot[field] = value.trim();
    updatedSlot.error = "";

    if (!updatedSlot.start || !updatedSlot.end) {
      updatedSlot.error = "Both start and end times are required.";
    } else if (
      !validateTimeFormat(updatedSlot.start) ||
      !validateTimeFormat(updatedSlot.end)
    ) {
      updatedSlot.error = "Invalid time format. Use HH:MM am/pm.";
    } else if (
      convertTo24Hour(updatedSlot.end) <= convertTo24Hour(updatedSlot.start)
    ) {
      updatedSlot.error = "End time must be later than start time.";
    } else if (
      checkOverlap(
        updatedSlot,
        updatedAvailability[dayIndex].timeSlots.filter(
          (_: any, i: any) => i !== slotIndex // Exclude the current slot
        )
      )
    ) {
      updatedSlot.error = "Time slots cannot overlap.";
    }

    setAvailability(updatedAvailability);
  };

  const addTimeSlot = (dayIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].timeSlots.push({
      start: "",
      end: "",
      error: "Both start and end times are required.",
    });
    setAvailability(updatedAvailability);
  };

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].timeSlots.splice(slotIndex, 1);
    setAvailability(updatedAvailability);
  };

  const copyToAllDays = (dayIndex: number) => {
    const selectedDaySlots = availability[dayIndex];
    const updatedAvailability = Array(7).fill(selectedDaySlots);
    setAvailability(updatedAvailability);
  };

  const isAtLeastOneDayChecked = () =>
    availability.some((day: any) => day.isAvailable);

  const hasErrors = () =>
    availability.some((day: any) =>
      day.timeSlots.some((slot: any) => slot.error !== "")
    );

  const collectGlobalErrors = () => {
    const errors: string[] = [];
    if (!isAtLeastOneDayChecked()) {
      errors.push("Please select at least one day as available.");
    }
    return errors;
  };

  const createAvailability = async () => {
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
      }
    } catch (error) {
      console.log("Error creating availability", error);
    }
  };

  useEffect(() => {
    if (!update) {
      setEventDays(availability);
    }
  }, [availability]);

  useEffect(() => {
    const otherErrors: any = [];
    availability.forEach((day: any, dayIndex: any) => {
      if (day.isAvailable) {
        day.timeSlots.forEach((slot: any, slotIndex: any) => {
          if (slot.error) {
            otherErrors.push(
              `Day ${dayIndex + 1}, Slot ${slotIndex + 1}: ${slot.error}`
            );
          }
        });
      }
    });

    if (onError) {
      const globalErrors = collectGlobalErrors();
      onError(globalErrors, otherErrors);
    }
  }, [availability]);

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
              checked={availability[dayIndex]?.isAvailable}
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
            disabled={hasErrors() || !isAtLeastOneDayChecked()}
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

// import React from "react";
// import { Copy, Plus, XIcon } from "lucide-react";
// import { useState, useEffect } from "react";
// import { axiosInstance } from "./config/http"; // Replace with your actual axios instance

// const timeFormatRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/;

// const generateTimeOptions = () => {
//   const options = [];
//   const periods = ["am", "pm"];

//   for (const period of periods) {
//     for (let hour = 1; hour <= 12; hour++) {
//       for (let minute = 0; minute < 60; minute += 30) {
//         const time = `${hour}:${minute.toString().padStart(2, "0")}${period}`;
//         options.push(time);
//       }
//     }
//   }
//   return options;
// };

// export const Testing = ({
//   update = true,
//   eventId,
//   eventDays,
//   setEventDays,
//   onError,
// }: any) => {
//   useEffect(() => {
//     const fetchingEditData = async () => {
//       const editEventData = await axiosInstance.get(
//         `/events/event-data/${eventId}`
//       );
//       const eventData = editEventData?.data?.data?.availability || [];
//       setAvailability(eventId ? eventData : eventDays);
//     };

//     fetchingEditData();
//   }, [eventId]);

//   const [availability, setAvailability] = useState(eventDays || []);
//   const timeOptions = generateTimeOptions();

//   const handleCheckboxChange = (dayIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex].isAvailable =
//       !updatedAvailability[dayIndex].isAvailable;
//     setAvailability(updatedAvailability);
//   };

//   const validateTimeFormat = (time: string) => {
//     const normalizedTime = time.toLowerCase();
//     return timeFormatRegex.test(normalizedTime);
//   };

//   const convertTo24Hour = (time: any) => {
//     const [hour, minute] = time?.match(/(\d{1,2}):(\d{2})(am|pm)/).slice(1, 3);
//     const isAM = time.includes("am");
//     let hours = parseInt(hour, 10);

//     if (hours === 12) {
//       hours = isAM ? 0 : 12; // 12 AM -> 00:00, 12 PM -> 12:00
//     } else {
//       hours = isAM ? hours : hours + 12; // PM times are +12 hours
//     }

//     return `${String(hours).padStart(2, "0")}:${minute}`;
//   };

//   const checkOverlap = (newSlot: any, existingSlots: any) => {
//     for (const existingSlot of existingSlots) {
//       const existingStart = convertTo24Hour(existingSlot.start);
//       const existingEnd = convertTo24Hour(existingSlot.end);
//       const newStart = convertTo24Hour(newSlot.start);
//       const newEnd = convertTo24Hour(newSlot.end);

//       if (newStart < existingEnd && newEnd > existingStart) {
//         return true;
//       }
//     }
//     return false;
//   };

//   const handleTimeChange = (
//     dayIndex: number,
//     slotIndex: number,
//     field: string,
//     value: string
//   ) => {
//     const updatedAvailability = [...availability];
//     const updatedSlot = updatedAvailability[dayIndex].timeSlots[slotIndex];

//     updatedSlot[field] = value.trim();
//     updatedSlot.error = "";

//     if (!updatedSlot.start || !updatedSlot.end) {
//       updatedSlot.error = "Both start and end times are required.";
//     } else if (
//       !validateTimeFormat(updatedSlot.start) ||
//       !validateTimeFormat(updatedSlot.end)
//     ) {
//       updatedSlot.error = "Invalid time format. Use HH:MM am/pm.";
//     } else if (
//       convertTo24Hour(updatedSlot.end) <= convertTo24Hour(updatedSlot.start)
//     ) {
//       updatedSlot.error = "End time must be later than start time.";
//     } else if (
//       checkOverlap(
//         updatedSlot,
//         updatedAvailability[dayIndex].timeSlots.filter(
//           (_: any, i: any) => i !== slotIndex
//         )
//       )
//     ) {
//       updatedSlot.error = "Time slots cannot overlap.";
//     }

//     setAvailability(updatedAvailability);
//   };

//   const addTimeSlot = (dayIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex].timeSlots.push({
//       start: "",
//       end: "",
//       error: "Both start and end times are required.",
//     });
//     setAvailability(updatedAvailability);
//   };

//   const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex].timeSlots.splice(slotIndex, 1);
//     setAvailability(updatedAvailability);
//   };

//   const copyToAllDays = (dayIndex: number) => {
//     const selectedDaySlots = availability[dayIndex];
//     const updatedAvailability = Array(7).fill(selectedDaySlots);
//     setAvailability(updatedAvailability);
//   };

//   const isAtLeastOneDayChecked = () =>
//     availability.some((day: any) => day.isAvailable);

//   const hasErrors = () =>
//     availability.some((day: any) =>
//       day.timeSlots.some((slot: any) => slot.error !== "")
//     );

//   const createAvailability = async () => {
//     if (!isAtLeastOneDayChecked()) {
//       alert("Please select at least one day as available.");
//       return;
//     }

//     try {
//       const response = await axiosInstance.post("/events/availability", {
//         availability: availability,
//       });

//       if (response.data.status) {
//         console.log("Updated successfully");
//       }
//     } catch (error) {
//       console.log("Error creating availability", error);
//     }
//   };

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
//               checked={availability[dayIndex]?.isAvailable}
//               onChange={() => handleCheckboxChange(dayIndex)}
//               className="w-4 h-4 accent-blue mt-3"
//             />
//             <span className="font-bold text-md mt-2">
//               {day.slice(0, 3).toUpperCase()}
//             </span>
//           </div>

//           <div className="flex flex-col gap-4 items-start w-44">
//             {availability[dayIndex].isAvailable ? (
//               availability[dayIndex].timeSlots.map(
//                 (slot: any, slotIndex: any) => (
//                   <div key={slotIndex} className="flex flex-col gap-3 w-full">
//                     <div className="flex gap-3 items-center">
//                       <select
//                         value={slot.start}
//                         onChange={(e) =>
//                           handleTimeChange(
//                             dayIndex,
//                             slotIndex,
//                             "start",
//                             e.target.value
//                           )
//                         }
//                         className={`w-24 h-10 border rounded-md font-light text-sm ${
//                           slot.error ? "border-red-500" : "border-gray-300"
//                         }`}
//                       >
//                         <option value="">Start</option>
//                         {timeOptions.map((time) => (
//                           <option key={time} value={time}>
//                             {time}
//                           </option>
//                         ))}
//                       </select>
//                       <select
//                         value={slot.end}
//                         onChange={(e) =>
//                           handleTimeChange(
//                             dayIndex,
//                             slotIndex,
//                             "end",
//                             e.target.value
//                           )
//                         }
//                         className={`w-24 h-10 border rounded-md font-light text-sm ${
//                           slot.error ? "border-red-500" : "border-gray-300"
//                         }`}
//                       >
//                         <option value="">End</option>
//                         {timeOptions.map((time) => (
//                           <option key={time} value={time}>
//                             {time}
//                           </option>
//                         ))}
//                       </select>
//                       {slotIndex > 0 && (
//                         <button
//                           className="text-gray-600 hover:text-red-700 ml-2"
//                           onClick={() => removeTimeSlot(dayIndex, slotIndex)}
//                         >
//                           <XIcon size={16} />
//                         </button>
//                       )}
//                     </div>
//                     {slot.error && (
//                       <div className="text-red-500 text-xs mt-1 w-full">
//                         {slot.error}
//                       </div>
//                     )}
//                   </div>
//                 )
//               )
//             ) : (
//               <div className="text-center text-gray-600 mt-2">Unavailable</div>
//             )}
//           </div>

//           {availability[dayIndex].isAvailable && (
//             <div className="flex justify-between items-center gap-2">
//               <button
//                 onClick={() => addTimeSlot(dayIndex)}
//                 className="p-2 hover:bg-gray-100"
//               >
//                 <Plus size={16} />
//               </button>
//               {update && (
//                 <button
//                   onClick={() => copyToAllDays(dayIndex)}
//                   className="p-2 hover:bg-gray-100"
//                 >
//                   <Copy size={16} />
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       ))}
//       {update && (
//         <div className="ml-40">
//           <button
//             onClick={() => createAvailability()}
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
