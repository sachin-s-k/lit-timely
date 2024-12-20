import { Copy, Plus, XIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { axiosInstance } from "./config/http";

// Regular expression for time validation (12-hour format without space between time and am/pm)
const timeFormatRegex = /^(0?[1-9]|1[0-2]):([0-5][0-9])(am|pm)$/;

export const Testing = () => {
  // const timeSlots: any = [
  //   "12:00am",
  //   "12:15am",
  //   "12:30am",
  //   "12:45am",
  //   "01:00am",
  //   "01:15am",
  //   "01:30am",
  //   "01:45am",
  //   "02:00am",
  //   "02:15am",
  //   "02:30am",
  //   "02:45am",
  //   "03:00am",
  //   "03:15am",
  //   "03:30am",
  //   "03:45am",
  //   "04:00am",
  //   "04:15am",
  //   "04:30am",
  //   "04:45am",
  //   "05:00am",
  //   "05:15am",
  //   "05:30am",
  //   "05:45am",
  //   "06:00am",
  //   "06:15am",
  //   "06:30am",
  //   "06:45am",
  //   "07:00am",
  //   "07:15am",
  //   "07:30am",
  //   "07:45am",
  //   "08:00am",
  //   "08:15am",
  //   "08:30am",
  //   "08:45am",
  //   "09:00am",
  //   "09:15am",
  //   "09:30am",
  //   "09:45am",
  //   "10:00am",
  //   "10:15am",
  //   "10:30am",
  //   "10:45am",
  //   "11:00am",
  //   "11:15am",
  //   "11:30am",
  //   "11:45am",
  //   "12:00pm",
  //   "12:15pm",
  //   "12:30pm",
  //   "12:45pm",
  //   "01:00pm",
  //   "01:15pm",
  //   "01:30pm",
  //   "01:45pm",
  //   "02:00pm",
  //   "02:15pm",
  //   "02:30pm",
  //   "02:45pm",
  //   "03:00pm",
  //   "03:15pm",
  //   "03:30pm",
  //   "03:45pm",
  //   "04:00pm",
  //   "04:15pm",
  //   "04:30pm",
  //   "04:45pm",
  //   "05:00pm",
  //   "05:15pm",
  //   "05:30pm",
  //   "05:45pm",
  //   "06:00pm",
  //   "06:15pm",
  //   "06:30pm",
  //   "06:45pm",
  //   "07:00pm",
  //   "07:15pm",
  //   "07:30pm",
  //   "07:45pm",
  //   "08:00pm",
  //   "08:15pm",
  //   "08:30pm",
  //   "08:45pm",
  //   "09:00pm",
  //   "09:15pm",
  //   "09:30pm",
  //   "09:45pm",
  //   "10:00pm",
  //   "10:15pm",
  //   "10:30pm",
  //   "10:45pm",
  //   "11:00pm",
  //   "11:15pm",
  //   "11:30pm",
  //   "11:45pm",
  // ];

  const [availability, setAvailability] = useState(
    Array(7)
      .fill(null)
      .map(() => ({
        isAvailable: true,
        timeSlots: [{ start: "9:00am", end: "5:00pm" }],
        errors: { start: "", end: "" }, // Track errors for each day's time slots
      }))
  );

  // Handle availability checkbox change for individual days
  const handleCheckboxChange = (dayIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex] = {
      ...updatedAvailability[dayIndex],
      isAvailable: !updatedAvailability[dayIndex].isAvailable,
    };
    setAvailability(updatedAvailability);
  };

  // Validate time format using regex (12-hour format without space between time and am/pm)
  const validateTimeFormat = (time: string) => {
    const normalizedTime = time.toLowerCase();
    return timeFormatRegex.test(normalizedTime);
  };

  // Handle time change with validation for a specific day and time slot
  // Update the handleTimeChange function
  const handleTimeChange = (
    dayIndex: number,
    slotIndex: number,
    field: string,
    value: string
  ) => {
    const updatedAvailability = [...availability];
    const updatedDay: any = updatedAvailability[dayIndex];

    // Normalize the input to lowercase and trim spaces
    const normalizedValue = value.toLowerCase().trim();

    // Update the field with the user input (editable at all times)
    updatedDay.timeSlots[slotIndex] = {
      ...updatedDay.timeSlots[slotIndex],
      [field]: normalizedValue,
    };

    // Validate the input format
    if (normalizedValue.length > 0) {
      const isValid = validateTimeFormat(normalizedValue);

      // Set error message if invalid format
      updatedDay.errors[field] = isValid
        ? ""
        : "Invalid time format. Use HH:MMam/pm";

      // If valid, ensure start and end times are different
      if (
        field === "end" &&
        updatedDay.timeSlots[slotIndex].start === normalizedValue
      ) {
        updatedDay.errors[field] = "Start and end times must be different.";
      }
    } else {
      // Clear error if the field is empty
      updatedDay.errors[field] = "";
    }

    // Update the state with the changes
    setAvailability(updatedAvailability);
  };

  // Add a new time slot for a specific day
  const addTimeSlot = (dayIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex] = {
      ...updatedAvailability[dayIndex],
      timeSlots: [
        ...updatedAvailability[dayIndex].timeSlots,
        { start: "", end: "" },
      ],
    };
    setAvailability(updatedAvailability); // Update state
  };

  // Remove a time slot for a specific day
  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].timeSlots.splice(slotIndex, 1);
    setAvailability(updatedAvailability); // Update state
  };

  // Copy availability from one day to all days
  const copyToAllDays = (dayIndex: number) => {
    const selectedDaySlots = availability[dayIndex];
    const updatedAvailability = Array(7).fill(selectedDaySlots);
    setAvailability(updatedAvailability); // Update state
  };

  const createAvailavility = async () => {
    console.log("availa");

    const response = await axiosInstance.post("/events/availability", {
      availability: availability,
    });
    if (response.data.status) {
      console.log("updated  successfully");
    } else {
      console.log("there is an error in updation");
    }
  };

  useEffect(() => {
    console.log(availability);
  }, []);

  return (
    <>
      <div className=" mt-14 ">
        <span className="font-bold text-2xl text-gray-800">Availability</span>
      </div>
      <div className=" mb-6 mt-10">
        {/* Avatar and Name */}
        <div className="flex justify-between">
          <div className="mb-2 flex items-center gap-3">
            <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-300">
              <span className="text-gray-700 font-medium">S</span>
            </div>
            <div className="">
              <div>
                <span className="text-gray-600 text-md font-semibold">
                  Sachin K Siby
                </span>
              </div>
              <div>
                <a
                  href="https://calendly.com/sacghib"
                  className="text-blue-500 text-sm underline"
                >
                  https://calendly.com/sacghib
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-blue-100"></div>
      </div>

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
          <div key={day} className="flex flex-col gap-3">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 w-28">
                <input
                  type="checkbox"
                  checked={availability[dayIndex].isAvailable}
                  onChange={() => handleCheckboxChange(dayIndex)} // Toggle availability
                  className="w-4 h-4 accent-blue"
                />
                <span className="font-bold text-md">
                  {day.slice(0, 3).toUpperCase()}
                </span>
              </div>

              {/* Display time slots only if the day is available */}
              {availability[dayIndex].isAvailable ? (
                <div className="flex flex-col gap-3">
                  {availability[dayIndex].timeSlots.map((slot, slotIndex) => (
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
                        className={`w-20 h-10 border text-center rounded-md font-light text-sm text-gray-600 ${
                          availability[dayIndex].errors.start
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
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
                        className={`w-20 h-10 border text-center rounded-md font-light text-sm text-gray-600 ${
                          availability[dayIndex].errors.end
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />

                      {/* Remove button for non-first time slots */}
                      {slotIndex > 0 && (
                        <button
                          className="text-gray-600 hover:text-red-700"
                          onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                        >
                          <XIcon size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {availability[dayIndex].timeSlots.map((_: any, slotIndex) => (
                    <div key={slotIndex} className="flex items-center gap-3">
                      {}
                      <div className="w-20 h-10   mt-4 text-center rounded-md font-light text-sm text-gray-600">
                        <span className="font-bold text-gray-600 text-center">
                          Unavailable
                        </span>
                      </div>
                      <span className="font-bold text-gray-50 text-center">
                        -
                      </span>
                      <div className="w-20 h-10 text-center rounded-md font-light text-sm text-gray-600"></div>

                      {/* Remove button for non-first time slots */}
                      {slotIndex > 0 && (
                        <button
                          className="text-gray-600 hover:text-red-700"
                          onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                        >
                          <XIcon size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add and Copy buttons */}
              <div className="flex items-center gap-2">
                {
                  <>
                    <button
                      onClick={() => addTimeSlot(dayIndex)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus size={16} />
                    </button>
                    <button
                      onClick={() => copyToAllDays(dayIndex)}
                      className="p-2  hover:bg-gray-100"
                    >
                      <Copy size={16} />
                    </button>
                  </>
                }
              </div>
            </div>
          </div>
        ))}
        <div className="ml-40">
          <div>
            <button
              onClick={() => {
                createAvailavility();
              }}
              className="px-12 bg-blue-500 rounded-md py-2 text-white hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Testing;
