// import {
//   Asterisk,
//   Copy,
//   Copyright,
//   Cross,
//   Plus,
//   Settings,
//   X,
//   XIcon,
// } from "lucide-react";
// import React, { useState, useEffect, useRef } from "react";
// import LinkPart from "./LinkPart";
// import TimeSelector from "./TimeSelector";

// export const Test = () => {
//   const timeSlots: any = [
//     "12:00 AM",
//     "12:15 AM",
//     //... other times
//     "11:45 PM",
//   ];

//   const [type, setType] = useState("not");
//   const [startState, setStartState] = useState(-1);
//   const timeSelectorRef = useRef<HTMLDivElement>(null);

//   const handleChange = (dayIndex: number, type: string) => {
//     setStartState(dayIndex);
//     setType(type);
//   };

//   // Handle clicks outside of TimeSelector
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         timeSelectorRef.current &&
//         !timeSelectorRef.current.contains(event.target as Node)
//       ) {
//         setStartState(-1); // Hide the TimeSelector
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <>
//       <div>
//         <div className="mt-14">
//           <span className="font-bold text-2xl text-gray-800">Availability</span>
//         </div>
//         <div className="mb-6 mt-10">
//           {/* Avatar and Name */}
//           <div className="flex justify-between">
//             <div className="mb-2 flex items-center gap-3">
//               <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-300">
//                 <span className="text-gray-700 font-medium">S</span>
//               </div>
//               <div className="">
//                 <div>
//                   <span className="text-gray-600 text-md font-semibold">
//                     Sachin K Siby
//                   </span>
//                 </div>
//                 <div>
//                   <a
//                     href="https://calendly.com/sacghib"
//                     className="text-blue-500 text-sm underline"
//                   >
//                     https://calendly.com/sacghib
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Divider */}
//           <div className="w-full border-t border-blue-100"></div>
//         </div>

//         <div className="border border-blue-100 rounded-md shadow-md w-full lg:flex">
//           <div className="flex flex-col gap-6 p-5 border-gray-200 border-r lg:w-1/2 md:w-full">
//             {[
//               "Sunday",
//               "Monday",
//               "Tusesday",
//               "Wednesday",
//               "Thursday",
//               "Friday",
//               "Saturday",
//             ].map((day, dayIndex) => (
//               <div key={day} className="flex flex-col gap-3">
//                 {/* Main Row */}
//                 <div className="flex items-center gap-8">
//                   {/* Checkbox and Day Label */}
//                   <div className="flex items-center gap-2 w-28">
//                     <input type="checkbox" className="w-4 h-4 accent-blue" />
//                     <span className="font-bold text-md">
//                       {day.slice(0, 3).toUpperCase()}
//                     </span>
//                   </div>

//                   {/* First Time Slot */}
//                   <div className="flex items-center gap-3 relative">
//                     <div>
//                       <div>
//                         <input
//                           key={day}
//                           type="text"
//                           placeholder="Start"
//                           onClick={() => handleChange(dayIndex, "Start")}
//                           className="w-24 h-11 border border-gray-300 rounded-md text-center font-light text-md text-gray-600"
//                         />
//                       </div>
//                       {startState === dayIndex && type === "Start" && (
//                         <div
//                           ref={timeSelectorRef}
//                           className="absolute top-12 z-40 bg-white rounded-md shadow-lg"
//                         >
//                           <TimeSelector />
//                         </div>
//                       )}
//                     </div>

//                     <span className="font-bold text-gray-600">-</span>
//                     <div>
//                       <div>
//                         <input
//                           key={dayIndex + 1}
//                           type="text"
//                           placeholder="End"
//                           onClick={() => handleChange(dayIndex, "End")}
//                           className="w-24 h-11 border border-gray-300 rounded-md text-center font-light text-md text-gray-600"
//                         />
//                       </div>
//                       {startState === dayIndex && type === "End" && (
//                         <div
//                           ref={timeSelectorRef}
//                           className="absolute top-12 z-40 bg-white rounded-md shadow-lg"
//                         >
//                           <TimeSelector />
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Add and Copy Buttons */}
//                   <div className="flex gap-4">
//                     <button
//                       className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
//                       title="Add time slot"
//                     >
//                       <Plus size={18} color="gray" />
//                     </button>
//                     <button
//                       className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
//                       title="Copy to all days"
//                     >
//                       <Copy size={18} color="gray" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="m-4">Other content here</div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Test;
// import { Copy, Plus, XIcon } from "lucide-react";
// import React, { useState, useEffect } from "react";

// export const Test = () => {
//   const timeSlots: any = [
//     "12:00 AM",
//     "12:15 AM",
//     "12:30 AM",
//     "12:45 AM",
//     "01:00 AM",
//     "01:15 AM",
//     "01:30 AM",
//     "01:45 AM",
//     "02:00 AM",
//     "02:15 AM",
//     "02:30 AM",
//     "02:45 AM",
//     "03:00 AM",
//     "03:15 AM",
//     "03:30 AM",
//     "03:45 AM",
//     "04:00 AM",
//     "04:15 AM",
//     "04:30 AM",
//     "04:45 AM",
//     "05:00 AM",
//     "05:15 AM",
//     "05:30 AM",
//     "05:45 AM",
//     "06:00 AM",
//     "06:15 AM",
//     "06:30 AM",
//     "06:45 AM",
//     "07:00 AM",
//     "07:15 AM",
//     "07:30 AM",
//     "07:45 AM",
//     "08:00 AM",
//     "08:15 AM",
//     "08:30 AM",
//     "08:45 AM",
//     "09:00 AM",
//     "09:15 AM",
//     "09:30 AM",
//     "09:45 AM",
//     "10:00 AM",
//     "10:15 AM",
//     "10:30 AM",
//     "10:45 AM",
//     "11:00 AM",
//     "11:15 AM",
//     "11:30 AM",
//     "11:45 AM",
//     "12:00 PM",
//     "12:15 PM",
//     "12:30 PM",
//     "12:45 PM",
//     "01:00 PM",
//     "01:15 PM",
//     "01:30 PM",
//     "01:45 PM",
//     "02:00 PM",
//     "02:15 PM",
//     "02:30 PM",
//     "02:45 PM",
//     "03:00 PM",
//     "03:15 PM",
//     "03:30 PM",
//     "03:45 PM",
//     "04:00 PM",
//     "04:15 PM",
//     "04:30 PM",
//     "04:45 PM",
//     "05:00 PM",
//     "05:15 PM",
//     "05:30 PM",
//     "05:45 PM",
//     "06:00 PM",
//     "06:15 PM",
//     "06:30 PM",
//     "06:45 PM",
//     "07:00 PM",
//     "07:15 PM",
//     "07:30 PM",
//     "07:45 PM",
//     "08:00 PM",
//     "08:15 PM",
//     "08:30 PM",
//     "08:45 PM",
//     "09:00 PM",
//     "09:15 PM",
//     "09:30 PM",
//     "09:45 PM",
//     "10:00 PM",
//     "10:15 PM",
//     "10:30 PM",
//     "10:45 PM",
//     "11:00 PM",
//     "11:15 PM",
//     "11:30 PM",
//     "11:45 PM",
//   ];

//   const [availability, setAvailability] = useState(
//     Array(7).fill({
//       isAvailable: false, // Track if the day is available
//       timeSlots: [{ start: "", end: "" }], // Initialize each day with one time slot
//     })
//   );

//   // Handle availability checkbox change
//   const handleCheckboxChange = (dayIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex] = {
//       ...updatedAvailability[dayIndex], // Preserve the other properties of the day
//       isAvailable: !updatedAvailability[dayIndex].isAvailable, // Toggle availability for that day
//     };
//     setAvailability(updatedAvailability);
//   };

//   // Handle changes to time slots
//   const handleTimeChange = (
//     dayIndex: number,
//     slotIndex: number,
//     field: string,
//     value: string
//   ) => {
//     const updatedAvailability = [...availability];
//     const updatedTimeSlots = [...updatedAvailability[dayIndex].timeSlots];
//     updatedTimeSlots[slotIndex] = {
//       ...updatedTimeSlots[slotIndex], // Preserve other properties of the time slot
//       [field]: value, // Only update the specific field (start or end)
//     };
//     updatedAvailability[dayIndex] = {
//       ...updatedAvailability[dayIndex],
//       timeSlots: updatedTimeSlots, // Update the time slots for the day
//     };
//     setAvailability(updatedAvailability);
//   };

//   // Add a new time slot for a specific day
//   const addTimeSlot = (dayIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex].timeSlots.push({ start: "", end: "" });
//     setAvailability(updatedAvailability);
//   };

//   // Remove a time slot for a specific day
//   const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
//     const updatedAvailability = [...availability];
//     updatedAvailability[dayIndex].timeSlots.splice(slotIndex, 1);
//     setAvailability(updatedAvailability);
//   };

//   // Copy the availability from a specific day to all days
//   const copyToAllDays = (dayIndex: number) => {
//     const selectedDaySlots = availability[dayIndex];
//     const updatedAvailability = Array(7).fill(selectedDaySlots);
//     setAvailability(updatedAvailability);
//   };

//   useEffect(() => {
//     console.log(availability); // Logs the availability array whenever it changes
//   }, [availability]);

//   return (
//     <>
//       <div className="mt-14">
//         <span className="font-bold text-2xl text-gray-800">Availability</span>
//       </div>

//       <div className="flex flex-col gap-6 p-5 border border-blue-100 rounded-md shadow-md w-full ">
//         {[
//           "Sunday",
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//         ].map((day, dayIndex) => (
//           <div key={day} className="flex flex-col gap-3">
//             <div className="flex items-center gap-8">
//               <div className="flex items-center gap-2 w-28">
//                 <input
//                   type="checkbox"
//                   checked={availability[dayIndex].isAvailable}
//                   onChange={() => handleCheckboxChange(dayIndex)}
//                   className="w-4 h-4 accent-blue"
//                 />
//                 <span className="font-bold text-md">
//                   {day.slice(0, 3).toUpperCase()}
//                 </span>
//               </div>

//               {availability[dayIndex].isAvailable &&
//                 availability[dayIndex].timeSlots.map((slot, slotIndex) => (
//                   <div key={slotIndex} className="flex items-center gap-3">
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
//                       className="w-20 h-10 border border-gray-300 rounded-md text-center font-light text-sm text-gray-600"
//                     />
//                     <span className="font-bold text-gray-600">-</span>
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
//                       className="w-20 h-10 border border-gray-300 rounded-md text-center font-light text-sm text-gray-600"
//                     />

//                     {slotIndex > 0 && (
//                       <button
//                         className="text-gray-600 hover:text-red-700"
//                         onClick={() => removeTimeSlot(dayIndex, slotIndex)}
//                       >
//                         <XIcon size={16} />
//                       </button>
//                     )}
//                   </div>
//                 ))}

//               <div className="flex gap-4">
//                 <button
//                   className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
//                   onClick={() => addTimeSlot(dayIndex)}
//                   title="Add time slot"
//                 >
//                   <Plus size={22} color="gray" />
//                 </button>
//                 <button
//                   className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
//                   onClick={() => copyToAllDays(dayIndex)}
//                   title="Copy to all days"
//                 >
//                   <Copy size={20} color="gray" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Test;
import { Copy, Plus, XIcon } from "lucide-react";
import { useState, useEffect } from "react";

export const Test = () => {
  // const timeSlots: any = [
  //   "12:00 AM",
  //   "12:15 AM",
  //   "12:30 AM",
  //   "12:45 AM",
  //   "01:00 AM",
  //   "01:15 AM",
  //   "01:30 AM",
  //   "01:45 AM",
  //   "02:00 AM",
  //   "02:15 AM",
  //   "02:30 AM",
  //   "02:45 AM",
  //   "03:00 AM",
  //   "03:15 AM",
  //   "03:30 AM",
  //   "03:45 AM",
  //   "04:00 AM",
  //   "04:15 AM",
  //   "04:30 AM",
  //   "04:45 AM",
  //   "05:00 AM",
  //   "05:15 AM",
  //   "05:30 AM",
  //   "05:45 AM",
  //   "06:00 AM",
  //   "06:15 AM",
  //   "06:30 AM",
  //   "06:45 AM",
  //   "07:00 AM",
  //   "07:15 AM",
  //   "07:30 AM",
  //   "07:45 AM",
  //   "08:00 AM",
  //   "08:15 AM",
  //   "08:30 AM",
  //   "08:45 AM",
  //   "09:00 AM",
  //   "09:15 AM",
  //   "09:30 AM",
  //   "09:45 AM",
  //   "10:00 AM",
  //   "10:15 AM",
  //   "10:30 AM",
  //   "10:45 AM",
  //   "11:00 AM",
  //   "11:15 AM",
  //   "11:30 AM",
  //   "11:45 AM",
  //   "12:00 PM",
  //   "12:15 PM",
  //   "12:30 PM",
  //   "12:45 PM",
  //   "01:00 PM",
  //   "01:15 PM",
  //   "01:30 PM",
  //   "01:45 PM",
  //   "02:00 PM",
  //   "02:15 PM",
  //   "02:30 PM",
  //   "02:45 PM",
  //   "03:00 PM",
  //   "03:15 PM",
  //   "03:30 PM",
  //   "03:45 PM",
  //   "04:00 PM",
  //   "04:15 PM",
  //   "04:30 PM",
  //   "04:45 PM",
  //   "05:00 PM",
  //   "05:15 PM",
  //   "05:30 PM",
  //   "05:45 PM",
  //   "06:00 PM",
  //   "06:15 PM",
  //   "06:30 PM",
  //   "06:45 PM",
  //   "07:00 PM",
  //   "07:15 PM",
  //   "07:30 PM",
  //   "07:45 PM",
  //   "08:00 PM",
  //   "08:15 PM",
  //   "08:30 PM",
  //   "08:45 PM",
  //   "09:00 PM",
  //   "09:15 PM",
  //   "09:30 PM",
  //   "09:45 PM",
  //   "10:00 PM",
  //   "10:15 PM",
  //   "10:30 PM",
  //   "10:45 PM",
  //   "11:00 PM",
  //   "11:15 PM",
  //   "11:30 PM",
  //   "11:45 PM",
  // ];

  const [availability, setAvailability] = useState(
    Array(7).fill({
      isAvailable: false, // Track if the day is available
      timeSlots: [{ start: "", end: "" }], // Initialize each day with one time slot
    })
  );

  // Handle availability checkbox change
  const handleCheckboxChange = (dayIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex] = {
      ...updatedAvailability[dayIndex], // Preserve the other properties of the day
      isAvailable: !updatedAvailability[dayIndex].isAvailable, // Toggle availability for that day
    };
    setAvailability(updatedAvailability);
  };

  // Handle changes to time slots
  const handleTimeChange = (
    dayIndex: number,
    slotIndex: number,
    field: string,
    value: string
  ) => {
    const updatedAvailability = [...availability];
    const updatedTimeSlots = [...updatedAvailability[dayIndex].timeSlots];
    updatedTimeSlots[slotIndex] = {
      ...updatedTimeSlots[slotIndex], // Preserve other properties of the time slot
      [field]: value, // Only update the specific field (start or end)
    };
    updatedAvailability[dayIndex] = {
      ...updatedAvailability[dayIndex],
      timeSlots: updatedTimeSlots, // Update the time slots for the day
    };
    setAvailability(updatedAvailability);
  };

  // Add a new time slot for a specific day
  // Add a new time slot for a specific day
  const addTimeSlot = (dayIndex: number) => {
    // Create a deep copy of the availability array
    const updatedAvailability = [...availability];

    // Create a deep copy of the timeSlots for the specific day
    const updatedTimeSlots = [...updatedAvailability[dayIndex].timeSlots];

    // Add a new time slot to the specific day
    updatedTimeSlots.push({ start: "", end: "" });

    // Update the timeSlots for the specific day
    updatedAvailability[dayIndex] = {
      ...updatedAvailability[dayIndex], // Preserve the other properties
      timeSlots: updatedTimeSlots, // Update only the timeSlots for this day
    };

    // Set the updated state
    setAvailability(updatedAvailability);
  };

  // Remove a time slot for a specific day
  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].timeSlots.splice(slotIndex, 1);
    setAvailability(updatedAvailability);
  };

  // Copy the availability from a specific day to all days
  const copyToAllDays = (dayIndex: number) => {
    const selectedDaySlots = availability[dayIndex];
    const updatedAvailability = Array(7).fill(selectedDaySlots);
    setAvailability(updatedAvailability);
  };

  useEffect(() => {
    console.log(availability); // Logs the availability array whenever it changes
  }, [availability]);

  return (
    <>
      <div className="mt-14">
        <span className="font-bold text-2xl text-gray-800">Availability</span>
      </div>

      <div className="flex flex-col gap-6 p-5 border border-blue-100 rounded-md shadow-md w-full ">
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day, dayIndex) => (
          <div key={day} className="flex flex-col gap-3">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 w-28">
                <input
                  type="checkbox"
                  checked={availability[dayIndex].isAvailable}
                  onChange={() => handleCheckboxChange(dayIndex)}
                  className="w-4 h-4 accent-blue"
                />
                <span className="font-bold text-md">
                  {day.slice(0, 3).toUpperCase()}
                </span>
              </div>

              {availability[dayIndex].isAvailable &&
                availability[dayIndex].timeSlots.map(
                  (slot: any, slotIndex: any) => (
                    <div key={slotIndex} className="flex items-center gap-3">
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
                        className="w-20 h-10 border border-gray-300 rounded-md text-center font-light text-sm text-gray-600"
                      />
                      <span className="font-bold text-gray-600">-</span>
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
                        className="w-20 h-10 border border-gray-300 rounded-md text-center font-light text-sm text-gray-600"
                      />

                      {slotIndex > 0 && (
                        <button
                          className="text-gray-600 hover:text-red-700"
                          onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                        >
                          <XIcon size={16} />
                        </button>
                      )}
                    </div>
                  )
                )}

              <div className="flex gap-4">
                <button
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                  onClick={() => addTimeSlot(dayIndex)}
                  title="Add time slot"
                >
                  <Plus size={22} color="gray" />
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                  onClick={() => copyToAllDays(dayIndex)}
                  title="Copy to all days"
                >
                  <Copy size={20} color="gray" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Test;
