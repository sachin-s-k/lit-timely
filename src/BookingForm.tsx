import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./bookingForm.css"; // Include the custom CSS for animations

import { format } from "date-fns";
import { Globe2Icon } from "lucide-react";

export const BookingForm = ({ handlingTimeEvents, availabilityArray }: any) => {
  console.log(availabilityArray, "avaialbility array");

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const availabilities = availabilityArray;

  //

  //

  const availableDays = availabilities.map(
    (day: any) => new Date(day.eventDate)
  );

  //
  const isDateAvailable = (date: any) =>
    availableDays.some(
      (availableDate: any) =>
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate()
    );

  const disabledDates = [
    { before: new Date() }, // Disable dates before today
    (date: any) => !isDateAvailable(date), // Disable dates not in availableDays
  ];

  //
  console.log(availableDays, "avaialabeele");

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
  return (
    <div
      className={`border rounded-r-lg overflow-y-scroll  h-160 ${
        selectedDate ? "" : "w-1/4"
      }`}
    >
      <div className="m-4 mb-2 ml-4">
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
            onSelect={
              (date) => {
                if (date) {
                  setSelectedDate(date as any);
                } else {
                  setSelectedDate(null);
                }
                setSelectedTime(null); // Reset selected time when date changes
              } // Reset selected time when date changes
            }
            disabled={disabledDates}
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
          <div className="mt-8 ">
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
