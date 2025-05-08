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
      }
    } catch (error) {}
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
