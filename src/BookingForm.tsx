// import { useEffect, useState } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/style.css";
// import "./bookingForm.css";

// import { format } from "date-fns";
// import { Globe2Icon } from "lucide-react";
// import { ThreeDots } from "react-loader-spinner";

// export const BookingForm = ({
//   handlingTimeEvents,
//   availabilityArray,
//   litApplicationUserId,
//   isSubmitting,
//   ownerBooking,
// }: any) => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [currentISTTime, setCurrentISTTime] = useState("");

//   const availabilities = availabilityArray;

//   const formatTime = (time: string) => {
//     const [hour, minutePart] = time.split(":");
//     const hourFormatted = hour.padStart(2, "0");
//     return `${hourFormatted}:${minutePart}`;
//   };

//   const availableDays = availabilities.map(
//     (day: any) => new Date(day.eventDate)
//   );

//   const isDateAvailable = (date: Date) =>
//     availableDays.some(
//       (availableDate: Date) =>
//         availableDate.getFullYear() === date.getFullYear() &&
//         availableDate.getMonth() === date.getMonth() &&
//         availableDate.getDate() === date.getDate()
//     );

//   const disabledDates = [
//     { before: new Date() },
//     (date: Date) => !isDateAvailable(date),
//   ];

//   const timeSlots = selectedDate
//     ? availabilities.find(
//         (day: any) => day.eventDate === format(selectedDate, "yyyy-MM-dd")
//       )?.slots || []
//     : [];

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

//   return (
//     <div
//       className={`

//         rounded-b-md
//     rounded-none
//     ,     /* Reset all borders */
//     sm:rounded-b-md    /* Small screens: bottom rounding */
//     md:rounded-none    /* Medium screens: reset */
//     lg:rounded-r-md    /* Large screens: right rounding */
//     border

//     overflow-y-scroll
//     ${selectedDate ? "" : "lg:w-1/4"}
//   `}
//     >
//       <div className="m-4 mb-2 ml-20 lg:ml-4">
//         <span className="font-bold text-gray-600 text-lg">
//           Select Date & Time
//         </span>
//       </div>
//       <div className="flex flex-col md:flex-row">
//         <div className="sticky top-0 z-10 max-w-sm mx-auto p-4 pt-0 bg-white">
//           <DayPicker
//             styles={{
//               months: { gap: "20px" },
//               caption: { marginBottom: "10px" },
//               day: { margin: "5px" },
//             }}
//             mode="single"
//             classNames={{
//               selected: "rounded-full text-blue-600 bg-blue-800",
//               today: "text-blue-600 rounded-full",
//             }}
//             selected={selectedDate as any}
//             onSelect={(date) => {
//               if (date) {
//                 setSelectedDate(date as any);
//               } else {
//                 setSelectedDate(null);
//               }
//               setSelectedTime(null);
//             }}
//             disabled={disabledDates}
//             modifiers={{ available: availableDays }}
//             modifiersStyles={{
//               selected: {
//                 background: "#4169e1",
//                 color: "#fff",
//                 borderRadius: "50%",
//               },
//               available: { background: "#dbeafe", borderRadius: "30px" },
//             }}
//           />
//           <div className="mt-8  mr-30">
//             <div>
//               <span className="font-bold text-md">Time zone</span>
//             </div>
//             <div className="mt-1">
//               <span className="flex gap-1">
//                 <Globe2Icon size={16} className="mt-1.5" />
//                 <span className="text-sm font-sans mt-1">
//                   Indian Standard Time ({currentISTTime})
//                 </span>
//               </span>
//             </div>
//           </div>
//         </div>

//         {selectedDate && (
//           <>
//             {/* Overlay only for mobile */}
//             <div
//               className="mobile-overlay md:hidden"
//               onClick={() => setSelectedDate(null)}
//             />

//             {/* Bottom modal container */}
//             <div className="mobile-bottom-modal md:hidden">
//               <div className="p-2">
//                 <span className="font-semibold text-gray-600">
//                   {selectedDate.toLocaleDateString("en-US", {
//                     weekday: "long",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </span>
//               </div>
//               <div className="time-slot-list">
//                 {timeSlots.map((time: string, index: number) => {
//                   const isSelected = selectedTime === time;
//                   const isDisabled = isSubmitting && !isSelected;

//                   return (
//                     <div key={index} className="time-slot-wrapper">
//                       {isSelected ? (
//                         <div className="time-slot-selected">
//                           <div className="time-box border h-11 border-blue-600">
//                             <span className="text-center text-blue-600 text-bold">
//                               {formatTime(time)}
//                             </span>
//                           </div>
//                           <div className="next-button border border-blue-600 rounded-md overflow-hidden">
//                             <button
//                               type="submit"
//                               disabled={isSubmitting}
//                               className={`px-4 w-full h-[42px] bg-blue-600 text-white text-sm flex items-center justify-center ${
//                                 isSubmitting
//                                   ? "bg-blue-500 cursor-not-allowed"
//                                   : "hover:bg-blue-700"
//                               }`}
//                               onClick={() =>
//                                 handlingTimeEvents(selectedDate, selectedTime)
//                               }
//                             >
//                               {isSubmitting ? (
//                                 <div className="py-2">
//                                   <ThreeDots
//                                     visible={true}
//                                     height="20"
//                                     width="32"
//                                     color="#e5e7eb"
//                                     ariaLabel="three-dots-loading"
//                                   />
//                                 </div>
//                               ) : litApplicationUserId && !ownerBooking ? (
//                                 <span className="py-2">Book</span>
//                               ) : (
//                                 <span className="py-2">Next</span>
//                               )}
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <div
//                           className={`time-slot-unselected ${
//                             isDisabled
//                               ? "opacity-50 cursor-not-allowed"
//                               : "cursor-pointer hover:bg-blue-50"
//                           }`}
//                           onClick={() => !isSubmitting && setSelectedTime(time)}
//                         >
//                           <span className="text-center font-bold text-blue-600">
//                             {formatTime(time)}
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Desktop layout still visible only in md+ */}
//             <div className="hidden md:block w-full overflow-y-scroll h-[65vh]">
//               <div className="p-4">
//                 <span className="font-semibold text-gray-600">
//                   {selectedDate.toLocaleDateString("en-US", {
//                     weekday: "long",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </span>
//               </div>

//               <div className="time-slot-list">
//                 {/* Reuse the same slot rendering here if preferred, or abstract it into a function */}
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

//tetst

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./bookingForm.css";

import { format } from "date-fns";
import { Globe2Icon } from "lucide-react";
import { ThreeDots } from "react-loader-spinner";

export const BookingForm = ({
  handlingTimeEvents,
  availabilityArray,
  litApplicationUserId,
  isSubmitting,
  ownerBooking,
}: any) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentISTTime, setCurrentISTTime] = useState("");

  const availabilities = availabilityArray;

  const formatTime = (time: string) => {
    const [hour, minutePart] = time.split(":");
    const hourFormatted = hour.padStart(2, "0");
    return `${hourFormatted}:${minutePart}`;
  };

  const availableDays = availabilities.map(
    (day: any) => new Date(day.eventDate)
  );

  const isDateAvailable = (date: Date) =>
    availableDays.some(
      (availableDate: Date) =>
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate()
    );

  const disabledDates = [
    { before: new Date() },
    (date: Date) => !isDateAvailable(date),
  ];

  const timeSlots = selectedDate
    ? availabilities.find(
        (day: any) => day.eventDate === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];

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

  const renderTimeSlots = () => (
    <div className="time-slot-list">
      {timeSlots.map((time: string, index: number) => {
        const isSelected = selectedTime === time;
        const isDisabled = isSubmitting && !isSelected;

        return (
          <div key={index} className="time-slot-wrapper">
            {isSelected ? (
              <div className="time-slot-selected">
                <div className="time-box border h-11 border-blue-600">
                  <span className="text-center text-blue-600 text-bold">
                    {formatTime(time)}
                  </span>
                </div>
                <div className="next-button border border-blue-600 rounded-md overflow-hidden">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 w-full h-[42px] bg-blue-600 text-white text-sm flex items-center justify-center ${
                      isSubmitting
                        ? "bg-blue-500 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                    onClick={() =>
                      handlingTimeEvents(selectedDate, selectedTime)
                    }
                  >
                    {isSubmitting ? (
                      <div className="py-2">
                        <ThreeDots
                          visible={true}
                          height="20"
                          width="32"
                          color="#e5e7eb"
                          ariaLabel="three-dots-loading"
                        />
                      </div>
                    ) : litApplicationUserId && !ownerBooking ? (
                      <span className="py-2">Book</span>
                    ) : (
                      <span className="py-2">Next</span>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`time-slot-unselected ${
                  isDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer hover:bg-blue-50"
                }`}
                onClick={() => !isSubmitting && setSelectedTime(time)}
              >
                <span className="text-center font-bold text-blue-600">
                  {formatTime(time)}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className={`
        rounded-b-md
        rounded-none
        sm:rounded-b-md
        md:rounded-none
        lg:rounded-r-md
        border
        overflow-y-scroll
        ${selectedDate ? "" : "lg:w-1/4"}
      `}
    >
      <div className="m-4 mb-2 ml-20 lg:ml-4">
        <span className="font-bold text-gray-600 text-lg">
          Select Date & Time
        </span>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="sticky top-0 z-10 max-w-sm mx-auto p-4 pt-0 bg-white">
          <DayPicker
            styles={{
              months: { gap: "20px" },
              caption: { marginBottom: "10px" },
              day: { margin: "5px" },
            }}
            mode="single"
            classNames={{
              selected: "rounded-full text-blue-600 bg-blue-800",
              today: "text-blue-600 rounded-full",
            }}
            selected={selectedDate as any}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date as any);
              } else {
                setSelectedDate(null);
              }
              setSelectedTime(null);
            }}
            disabled={disabledDates}
            modifiers={{ available: availableDays }}
            modifiersStyles={{
              selected: {
                background: "#4169e1",
                color: "#fff",
                borderRadius: "50%",
              },
              available: { background: "#dbeafe", borderRadius: "30px" },
            }}
          />
          <div className="mt-8 mr-30">
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

        {selectedDate && (
          <>
            {/* Overlay only for mobile */}
            <div
              className="mobile-overlay md:hidden"
              onClick={() => setSelectedDate(null)}
            />

            {/* Mobile bottom modal */}
            <div className="mobile-bottom-modal md:hidden">
              <div className="p-2">
                <span className="font-semibold text-gray-600">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              {renderTimeSlots()}
            </div>

            {/* Desktop slot view */}
            <div className="hidden md:block w-full overflow-y-scroll h-[65vh]">
              <div className="p-4">
                <span className="font-semibold text-gray-600">
                  {selectedDate.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              {renderTimeSlots()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

//slightly bettetr

// import { useEffect, useState, Fragment } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/style.css";
// import { format } from "date-fns";
// import { Globe2Icon, X } from "lucide-react";
// import { ThreeDots } from "react-loader-spinner";
// import { Dialog, Transition } from "@headlessui/react";

// export const BookingForm = ({
//   handlingTimeEvents,
//   availabilityArray,
//   litApplicationUserId,
//   isSubmitting,
//   ownerBooking,
// }: any) => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [currentISTTime, setCurrentISTTime] = useState("");
//   const [showTimeModal, setShowTimeModal] = useState(false);

//   const availabilities = availabilityArray;

//   const formatTime = (time: string) => {
//     const [hour, minutePart] = time.split(":");
//     const hourFormatted = hour.padStart(2, "0");
//     return `${hourFormatted}:${minutePart}`;
//   };

//   const availableDays = availabilities.map(
//     (day: any) => new Date(day.eventDate)
//   );

//   const isDateAvailable = (date: Date) =>
//     availableDays.some(
//       (availableDate: Date) =>
//         availableDate.getFullYear() === date.getFullYear() &&
//         availableDate.getMonth() === date.getMonth() &&
//         availableDate.getDate() === date.getDate()
//     );

//   const disabledDates = [
//     { before: new Date() },
//     (date: Date) => !isDateAvailable(date),
//   ];

//   const timeSlots = selectedDate
//     ? availabilities.find(
//         (day: any) => day.eventDate === format(selectedDate, "yyyy-MM-dd")
//       )?.slots || []
//     : [];

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

//   const handleDateSelect = (date: Date | undefined) => {
//     if (date) {
//       setSelectedDate(date);
//       setSelectedTime(null);
//       if (window.innerWidth < 768) {
//         setShowTimeModal(true);
//       }
//     } else {
//       setSelectedDate(null);
//       setSelectedTime(null);
//     }
//   };

//   return (
//     <div className="rounded-b-md rounded-none sm:rounded-b-md md:rounded-none lg:rounded-r-md border overflow-y-scroll">
//       <div className="m-4 mb-2 ml-20 lg:ml-4">
//         <span className="font-bold text-gray-600 text-lg">
//           Select Date & Time
//         </span>
//       </div>
//       <div className="flex flex-col md:flex-row">
//         <div className="sticky top-0 z-10 max-w-sm mx-auto p-4 pt-0 bg-white">
//           <DayPicker
//             styles={{
//               months: { gap: "20px" },
//               caption: { marginBottom: "10px" },
//               day: { margin: "5px" },
//             }}
//             mode="single"
//             classNames={{
//               selected: "rounded-full text-blue-600 bg-blue-800",
//               today: "text-blue-600 rounded-full",
//             }}
//             selected={selectedDate as any}
//             onSelect={handleDateSelect}
//             disabled={disabledDates}
//             modifiers={{ available: availableDays }}
//             modifiersStyles={{
//               selected: {
//                 background: "#4169e1",
//                 color: "#fff",
//                 borderRadius: "50%",
//               },
//               available: { background: "#dbeafe", borderRadius: "30px" },
//             }}
//           />
//           <div className="mt-8 mr-30">
//             <div>
//               <span className="font-bold text-md">Time zone</span>
//             </div>
//             <div className="mt-1">
//               <span className="flex gap-1">
//                 <Globe2Icon size={16} className="mt-1.5" />
//                 <span className="text-sm font-sans mt-1">
//                   Indian Standard Time ({currentISTTime})
//                 </span>
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Desktop Time Slots */}
//         {selectedDate && (
//           <div className="w-full overflow-y-scroll h-[65vh] hidden md:block">
//             <div className="p-4">
//               <span className="font-semibold text-gray-600">
//                 {selectedDate.toLocaleDateString("en-US", {
//                   weekday: "long",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </span>
//             </div>

//             <div className="time-slot-list">
//               {timeSlots.map((time: string, index: number) => {
//                 const isSelected = selectedTime === time;
//                 const isDisabled = isSubmitting && !isSelected;

//                 return (
//                   <div key={index} className="time-slot-wrapper">
//                     {isSelected ? (
//                       <div className="flex w-full">
//                         {/* Time slot - takes half width */}
//                         <div className="flex-1 border border-blue-600 rounded-l-md flex items-center justify-center h-11">
//                           <span className="text-blue-600 font-bold">
//                             {formatTime(time)}
//                           </span>
//                         </div>
//                         {/* Next button - takes half width */}
//                         <button
//                           type="submit"
//                           disabled={isSubmitting}
//                           className={`flex-1 bg-blue-600 text-white rounded-r-md h-11 flex items-center justify-center ${
//                             isSubmitting
//                               ? "bg-blue-500 cursor-not-allowed"
//                               : "hover:bg-blue-700"
//                           }`}
//                           onClick={() => {
//                             handlingTimeEvents(selectedDate, selectedTime);
//                             if (window.innerWidth < 768)
//                               setShowTimeModal(false);
//                           }}
//                         >
//                           {isSubmitting ? (
//                             <ThreeDots
//                               visible={true}
//                               height="20"
//                               width="32"
//                               color="#e5e7eb"
//                               ariaLabel="three-dots-loading"
//                             />
//                           ) : litApplicationUserId && !ownerBooking ? (
//                             "Book"
//                           ) : (
//                             "Next"
//                           )}
//                         </button>
//                       </div>
//                     ) : (
//                       <div
//                         className={`border border-blue-600 rounded-md flex items-center justify-center h-11 ${
//                           isDisabled
//                             ? "opacity-50 cursor-not-allowed"
//                             : "cursor-pointer hover:bg-blue-50"
//                         }`}
//                         onClick={() => !isSubmitting && setSelectedTime(time)}
//                       >
//                         <span className="text-blue-600 font-bold">
//                           {formatTime(time)}
//                         </span>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Mobile Time Slots Modal */}
//       <Transition appear show={showTimeModal} as={Fragment}>
//         <Dialog
//           as="div"
//           className="relative z-50"
//           onClose={() => setShowTimeModal(false)}
//         >
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-end justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 translate-y-full"
//                 enterTo="opacity-100 translate-y-0"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 translate-y-0"
//                 leaveTo="opacity-0 translate-y-full"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-t-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <div className="flex justify-between items-center mb-4">
//                     <Dialog.Title
//                       as="h3"
//                       className="text-lg font-medium leading-6 text-gray-900"
//                     >
//                       {selectedDate?.toLocaleDateString("en-US", {
//                         weekday: "long",
//                         month: "long",
//                         day: "numeric",
//                       })}
//                     </Dialog.Title>
//                     <button
//                       type="button"
//                       className="text-gray-400 hover:text-gray-500"
//                       onClick={() => setShowTimeModal(false)}
//                     >
//                       <span className="sr-only">Close</span>
//                       <X size={20} />
//                     </button>
//                   </div>

//                   <div className="time-slot-list space-y-2">
//                     {timeSlots.map((time: string, index: number) => {
//                       const isSelected = selectedTime === time;
//                       const isDisabled = isSubmitting && !isSelected;

//                       return (
//                         <div key={index} className="time-slot-wrapper">
//                           {isSelected ? (
//                             <div className="flex gap-2">
//                               <div className="flex-1 border border-blue-600 rounded-md p-3 text-center">
//                                 <span className="text-blue-600 font-bold">
//                                   {formatTime(time)}
//                                 </span>
//                               </div>
//                               <button
//                                 type="submit"
//                                 disabled={isSubmitting}
//                                 className={`flex-1 bg-blue-600 text-white rounded-md ${
//                                   isSubmitting
//                                     ? "bg-blue-500 cursor-not-allowed"
//                                     : "hover:bg-blue-700"
//                                 }`}
//                                 onClick={() => {
//                                   handlingTimeEvents(
//                                     selectedDate,
//                                     selectedTime
//                                   );
//                                   setShowTimeModal(false);
//                                 }}
//                               >
//                                 {isSubmitting ? (
//                                   <div className="flex justify-center py-1">
//                                     <ThreeDots
//                                       visible={true}
//                                       height="20"
//                                       width="32"
//                                       color="#e5e7eb"
//                                       ariaLabel="three-dots-loading"
//                                     />
//                                   </div>
//                                 ) : litApplicationUserId && !ownerBooking ? (
//                                   "Book"
//                                 ) : (
//                                   "Next"
//                                 )}
//                               </button>
//                             </div>
//                           ) : (
//                             <div
//                               className={`border rounded-md p-3 text-center ${
//                                 isDisabled
//                                   ? "opacity-50 cursor-not-allowed"
//                                   : "cursor-pointer hover:bg-blue-50"
//                               }`}
//                               onClick={() =>
//                                 !isSubmitting && setSelectedTime(time)
//                               }
//                             >
//                               <span className="font-bold text-blue-600">
//                                 {formatTime(time)}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </div>
//   );
// };

// correct blelow
// import { useEffect, useState, Fragment } from "react";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/style.css";
// import { format } from "date-fns";
// import { Globe2Icon, X } from "lucide-react";
// import { ThreeDots } from "react-loader-spinner";
// import { Dialog, Transition } from "@headlessui/react";

// export const BookingForm = ({
//   handlingTimeEvents,
//   availabilityArray,
//   litApplicationUserId,
//   isSubmitting,
//   ownerBooking,
// }: any) => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedTime, setSelectedTime] = useState<string | null>(null);
//   const [currentISTTime, setCurrentISTTime] = useState("");
//   const [showTimeModal, setShowTimeModal] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkIfMobile();
//     window.addEventListener("resize", checkIfMobile);
//     return () => window.removeEventListener("resize", checkIfMobile);
//   }, []);

//   const availabilities = availabilityArray;

//   const formatTime = (time: string) => {
//     const [hour, minutePart] = time.split(":");
//     const hourFormatted = hour.padStart(2, "0");
//     return `${hourFormatted}:${minutePart}`;
//   };

//   const availableDays = availabilities.map(
//     (day: any) => new Date(day.eventDate)
//   );

//   const isDateAvailable = (date: Date) =>
//     availableDays.some(
//       (availableDate: Date) =>
//         availableDate.getFullYear() === date.getFullYear() &&
//         availableDate.getMonth() === date.getMonth() &&
//         availableDate.getDate() === date.getDate()
//     );

//   const disabledDates = [
//     { before: new Date() },
//     (date: Date) => !isDateAvailable(date),
//   ];

//   const timeSlots = selectedDate
//     ? availabilities.find(
//         (day: any) => day.eventDate === format(selectedDate, "yyyy-MM-dd")
//       )?.slots || []
//     : [];

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

//   const handleDateSelect = (date: Date | undefined) => {
//     if (date) {
//       setSelectedDate(date);
//       setSelectedTime(null);
//       if (isMobile) {
//         setShowTimeModal(true);
//       }
//     } else {
//       setSelectedDate(null);
//       setSelectedTime(null);
//     }
//   };

//   const renderTimeSlot = (time: string, index: number) => {
//     const isSelected = selectedTime === time;
//     const isDisabled = isSubmitting && !isSelected;

//     return (
//       <div key={index} className="time-slot-wrapper flex mb-2">
//         {isSelected ? (
//           <>
//             <div className="time-box flex-1 border h-11 border-blue-600 rounded-l-md flex items-center justify-center">
//               <span className="text-center text-blue-600 font-bold">
//                 {formatTime(time)}
//               </span>
//             </div>
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`next-button flex-1 bg-blue-600 text-white rounded-r-md h-11 text-sm flex items-center justify-center ${
//                 isSubmitting
//                   ? "bg-blue-500 cursor-not-allowed"
//                   : "hover:bg-blue-700"
//               }`}
//               onClick={() => {
//                 handlingTimeEvents(selectedDate, selectedTime);
//                 if (isMobile) setShowTimeModal(false);
//               }}
//             >
//               {isSubmitting ? (
//                 <div className="py-2">
//                   <ThreeDots
//                     visible={true}
//                     height="20"
//                     width="32"
//                     color="#e5e7eb"
//                     ariaLabel="three-dots-loading"
//                   />
//                 </div>
//               ) : litApplicationUserId && !ownerBooking ? (
//                 "Book"
//               ) : (
//                 "Next"
//               )}
//             </button>
//           </>
//         ) : (
//           <div
//             className={`time-slot-unselected flex-1 border h-11 border-blue-600 rounded-md flex items-center justify-center ${
//               isDisabled
//                 ? "opacity-50 cursor-not-allowed"
//                 : "cursor-pointer hover:bg-blue-50"
//             }`}
//             onClick={() => !isSubmitting && setSelectedTime(time)}
//           >
//             <span className="text-center font-bold text-blue-600">
//               {formatTime(time)}
//             </span>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="rounded-b-md rounded-none sm:rounded-b-md md:rounded-none lg:rounded-r-md border overflow-y-scroll">
//       <div className="m-4 mb-2 ml-20 lg:ml-4">
//         <span className="font-bold text-gray-600 text-lg">
//           Select Date & Time
//         </span>
//       </div>
//       <div className="flex flex-col md:flex-row">
//         <div className="sticky top-0 z-10 max-w-sm mx-auto p-4 pt-0 bg-white">
//           <DayPicker
//             styles={{
//               months: { gap: "20px" },
//               caption: { marginBottom: "10px" },
//               day: { margin: "5px" },
//             }}
//             mode="single"
//             classNames={{
//               selected: "rounded-full text-blue-600 bg-blue-800",
//               today: "text-blue-600 rounded-full",
//             }}
//             selected={selectedDate as any}
//             onSelect={handleDateSelect}
//             disabled={disabledDates}
//             modifiers={{ available: availableDays }}
//             modifiersStyles={{
//               selected: {
//                 background: "#4169e1",
//                 color: "#fff",
//                 borderRadius: "50%",
//               },
//               available: { background: "#dbeafe", borderRadius: "30px" },
//             }}
//           />
//           <div className="mt-8 mr-30">
//             <div>
//               <span className="font-bold text-md">Time zone</span>
//             </div>
//             <div className="mt-1">
//               <span className="flex gap-1">
//                 <Globe2Icon size={16} className="mt-1.5" />
//                 <span className="text-sm font-sans mt-1">
//                   Indian Standard Time ({currentISTTime})
//                 </span>
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Desktop/Tablet Time Slots */}
//         {selectedDate && !isMobile && (
//           <div className="w-full overflow-y-scroll h-[65vh]">
//             <div className="p-4">
//               <span className="font-semibold text-gray-600">
//                 {selectedDate.toLocaleDateString("en-US", {
//                   weekday: "long",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </span>
//             </div>
//             <div className="time-slot-list px-4">
//               {timeSlots.map((time: string, index: number) =>
//                 renderTimeSlot(time, index)
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Mobile Time Slots Modal */}
//       {isMobile && (
//         <Transition appear show={showTimeModal} as={Fragment}>
//           <Dialog
//             as="div"
//             className="relative z-50"
//             onClose={() => setShowTimeModal(false)}
//           >
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="fixed inset-0 bg-black bg-opacity-25" />
//             </Transition.Child>

//             <div className="fixed inset-0 overflow-y-auto">
//               <div className="flex min-h-full items-end justify-center p-4 text-center">
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0 translate-y-full"
//                   enterTo="opacity-100 translate-y-0"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100 translate-y-0"
//                   leaveTo="opacity-0 translate-y-full"
//                 >
//                   <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-t-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                     <div className="flex justify-between items-center mb-4">
//                       <Dialog.Title
//                         as="h3"
//                         className="text-lg font-medium leading-6 text-gray-900"
//                       >
//                         {selectedDate?.toLocaleDateString("en-US", {
//                           weekday: "long",
//                           month: "long",
//                           day: "numeric",
//                         })}
//                       </Dialog.Title>
//                       <button
//                         type="button"
//                         className="text-gray-400 hover:text-gray-500"
//                         onClick={() => setShowTimeModal(false)}
//                       >
//                         <span className="sr-only">Close</span>
//                         <X size={20} />
//                       </button>
//                     </div>
//                     <div className="time-slot-list">
//                       {timeSlots.map((time: string, index: number) =>
//                         renderTimeSlot(time, index)
//                       )}
//                     </div>
//                   </Dialog.Panel>
//                 </Transition.Child>
//               </div>
//             </div>
//           </Dialog>
//         </Transition>
//       )}
//     </div>
//   );
// };
