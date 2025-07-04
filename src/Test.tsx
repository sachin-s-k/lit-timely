import { Copy, Plus, XIcon } from "lucide-react";
import { useState, useEffect } from "react";

export const Test = () => {
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
      isAvailable: !updatedAvailability[dayIndex]?.isAvailable, // Toggle availability for that day
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
                  checked={availability[dayIndex]?.isAvailable}
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
