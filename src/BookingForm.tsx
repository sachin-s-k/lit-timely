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

  return (
    <div
      className={`border rounded-r-lg overflow-y-scroll ${
        selectedDate ? "" : "w-1/4"
      }`}
    >
      <div className="m-4 mb-2 ml-4">
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
          <div className="mt-8">
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
          <div className="w-full overflow-y-scroll h-[65vh]">
            <div className="p-4">
              <span className="font-semibold text-gray-600">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="time-slot-list">
              {timeSlots.map((time: string, index: number) => {
                const isSelected = selectedTime === time;
                const isDisabled = isSubmitting && !isSelected;

                return (
                  <div key={index} className="time-slot-wrapper">
                    {isSelected ? (
                      <div className="time-slot-selected">
                        <div className="time-box border border-blue-600">
                          <span className="text-center text-blue-600 text-bold">
                            {formatTime(time)}
                          </span>
                        </div>

                        <div className="next-button">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-2 border rounded-md bg-blue-600 text-white text-sm flex items-center justify-center w-full text-center ${
                              isSubmitting
                                ? "bg-blue-500 cursor-not-allowed"
                                : "hover:bg-blue-700"
                            }`}
                            onClick={() =>
                              handlingTimeEvents(selectedDate, selectedTime)
                            }
                          >
                            {isSubmitting ? (
                              <ThreeDots
                                visible={true}
                                height="20"
                                width="32"
                                color="#e5e7eb"
                                ariaLabel="three-dots-loading"
                              />
                            ) : litApplicationUserId && !ownerBooking ? (
                              "Book"
                            ) : (
                              "Next"
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
          </div>
        )}
      </div>
    </div>
  );
};
