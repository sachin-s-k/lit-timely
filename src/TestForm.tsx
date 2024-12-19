import { useState } from "react";

const TestForm = ({ userId = "122334", ownerId = "2234444" }) => {
  const [slotDetails, setSlotDetails] = useState({
    startTime: "",
    endTime: "",
    attendeeEmail: "",
    attendeeName: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSlotDetails({ ...slotDetails, [name]: value });
  };

  const handleBookingSubmit = async () => {
    console.log("boooo");

    const response: any = await fetch(
      "http://localhost:8000/auth/booking-slot",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          ownerId,
          ...slotDetails,
        }),
      }
    );

    console.log(response, "resss");

    if (response.success) {
      alert("Booking successful! You will receive an email shortly.");
    } else {
      alert("Booking failed.");
    }
  };

  return (
    <div>
      <h3>Book a Slot</h3>
      <input
        type="datetime-local"
        name="startTime"
        onChange={handleInputChange}
        required
      />
      <input
        type="datetime-local"
        name="endTime"
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="attendeeEmail"
        placeholder="Your Email"
        onChange={handleInputChange}
        required
      />
      <input
        type="text"
        name="attendeeName"
        placeholder="Your Name"
        onChange={handleInputChange}
        required
      />
      <button onClick={handleBookingSubmit}>Book Slot</button>
    </div>
  );
};

export default TestForm;
