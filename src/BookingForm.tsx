import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./bookingForm.css"; // Include the custom CSS for animations

import { format } from "date-fns";

export const BookingForm = ({ handlingTimeEvents, availabilityArray }: any) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  // const [click, setClick] = useState(false);

  // const startDate:any = startOfDay(new Date());
  // const endDate:any = addDays(startDate, 30);
  // const availability: any = [];

  // const availableDates = [];
  // for (let date = startDate; date <= endDate; date = addDays(startDate, 1)) {
  //   const dayOfWeek = format(date, "EEEE").toUpperCase();

  //   const dayAvailability = availability.days.find(
  //     (d: any) => d.day === dayOfWeek
  //   );

  //   if (dayAvailability) {
  //     const dateStr = format(date, "yyyy-MM-dd");

  //     const slots = generateAvailableTimeSlots(
  //       dayAvailability.startTime,
  //       dayAvailability.endTime,
  //       45,
  //       4,
  //       dateStr,
  //       10
  //     );
  //     availableDates.push({ date: dateStr, slots });
  //   }
  // }

  // function generateAvailableTimeSlots(
  //   startTime,
  //   endTime,
  //   duration,
  //   bookings,
  //   dateStr,
  //   timeGap
  // ) {
  //   const slots = [];
  //   let currentTime = parseISO(
  //     `${dateStr}T${startTime.toISOString().slice(11, 16)}`
  //   );
  //   const slotEndTime = parseISO(
  //     `${dateStr}T${endTime.toISOString().slice(11, 16)}`
  //   );
  //   const now = new Date();
  //   if (format(now, "yyyy-MM-dd") === dateStr) {
  //     currentTime = isBefore(currentTime, now)
  //       ? addMinutes(now, timeGap)
  //       : currentTime;
  //   }

  //   while (currentTime < slotEndTime) {
  //     const slotEnd = new Date(currentTime.getTime() + duration * 60000);
  //     const isSlotAvailable = !bookings.some((booking: any) => {
  //       const bookingstartTime = booking.startTime;
  //       const bookingEndTime = booking.endTime;
  //       return (
  //         (currentTime >= bookingstartTime && currentTime < bookingEndTime) ||
  //         (slotEnd > bookingstartTime && slotEnd <= bookingEndTime) ||
  //         (currentTime <= bookingstartTime && slotEnd >= bookingEndTime)
  //       );
  //     });
  //     if (isSlotAvailable) {
  //       slots.push(format(currentTime, "HH:mm"));
  //     }
  //     currentTime = slotEnd;
  //   }
  //   return slots;
  // }
  // Example time slots
  // const timeSlots = [
  //   "9:00am",
  //   "9:15am",
  //   "9:30am",
  //   "9:45am",
  //   "10:00am",
  //   "10:15am",
  //   "10:30am",
  //   "10:30am",
  //   "10:30am",
  //   "10:30am",
  //   "10:30am",
  //   "10:30am",
  //   "10:30am",
  // ];

  // const availabilities = [
  //   {
  //     date: "2024-12-18",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-19",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-20",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-21",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-22",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-23",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-24",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-25",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-26",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-27",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-28",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-29",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-30",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2024-12-31",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-01",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-02",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-03",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-04",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-05",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-06",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-07",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-08",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //       "05:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-09",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-10",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-11",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  //   {
  //     date: "2025-01-12",
  //     slots: [
  //       "09:00 AM",
  //       "10:00 AM",
  //       "11:00 AM",
  //       "12:00 PM",
  //       "01:00 PM",
  //       "02:00 PM",
  //       "03:00 PM",
  //       "04:00 PM",
  //     ],
  //   },
  // ];
  const availabilities = availabilityArray;

  const availableDays = availabilities.map(
    (day: any) => new Date(day.eventDate)
  );

  const timeSlots = selectedDate
    ? availabilities.find(
        (day: any) => day.eventDate === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];
  //const navigate = useNavigate();
  {
    console.log(
      selectedDate,
      "selectedDate",
      format(selectedDate as any, "yyyy-MM-dd")
    );
  }
  return (
    <div className="border rounded-r-lg  overflow-y-scroll h-screen">
      <div
        className="m-4 mb-2 ml-2"
        // onClick={() => {
        //   setClick(true);
        // }}
      >
        <span className="font-bold text-gray-600 text-lg">
          Select Date & Time
        </span>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Date Picker Section */}
        <div className="sticky top-0 z-10 max-w-sm mx-auto p-4 pt-0 bg-white">
          <DayPicker
            styles={{
              months: { gap: "20px" }, // Adds space between the columns of the grid
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
              setSelectedDate(date as any);
              setSelectedTime(null); // Reset selected time when date changes
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{ available: availableDays }}
            modifiersStyles={{
              selected: {
                background: "#4169e1",
                color: "#fff",
                borderRadius: "50%",
              }, // Royal blue
              available: { background: "#dbeafe", borderRadius: "30px" },
            }}
          />
        </div>

        {/* Time Slot Section */}
        {selectedDate && (
          <div className="w-full overflow-y-scroll h-[80vh]">
            <div className="p-4">
              <span className="font-semibold text-gray-600">
                {selectedDate
                  ? (selectedDate as any).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })
                  : "Tuesday, December 10"}
              </span>
            </div>

            {/* Scrollable Time Slot Container */}
            <div className="time-slot-list">
              {timeSlots.map((time: any, index: any) => (
                <div key={index} className="time-slot-wrapper">
                  {selectedTime === time ? (
                    // Render the selected time slot with "Next" button
                    <div className="time-slot-selected ">
                      {/* Selected Time */}
                      <div className="time-box border border-blue-600">
                        <span className="text-center text-blue-600">
                          {time}
                        </span>
                      </div>

                      {/* Next Button */}
                      <div className="next-button">
                        <button
                          className="bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          onClick={() => {
                            console.log("Navigating with time:", time);
                            handlingTimeEvents(selectedDate, selectedTime);
                          }}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Render the unselected time slots
                    <div
                      className="time-slot-unselected"
                      onClick={() => setSelectedTime(time)}
                    >
                      <span className="text-center font-bold  text-blue-600">
                        {time}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
