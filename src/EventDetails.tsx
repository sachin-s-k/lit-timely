import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarImage } from "./components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

import { BookingForm } from "./BookingForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "./config/http";
import { addMinutes } from "date-fns/addMinutes";
import { format, parse } from "date-fns";
const EventDetails = () => {
  const { id, eventName } = useParams(); // Extract dynamic segments
  const [searchParams] = useSearchParams();

  console.log(searchParams, "sear");
  const [availability, setAvailability] = useState([]);
  const email = searchParams.get("email");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const eventId = searchParams.get("eventId");
  const [eventData, setEventData] = useState({});
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axiosInstance.get(
          `/events/booking/${id}?eventId=${eventId}`
        );
        console.log(response);
        setUserData(response.data.userData);
        setEventData(response.data.eventData);
        setAvailability(response.data.availability);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchEventData();
  }, []);

  const handlingTimeEvents = (selectedDate, startTime) => {
    console.log("callled time page");
    function calculateEndTime(dateString, startTime, duration) {
      // Parse the start date and time
      const startDateTime = parse(startTime, "hh:mm a", new Date(dateString));

      // Add the duration to the start time
      const endDateTime = addMinutes(startDateTime, duration);

      // Format the end time as desired
      return format(endDateTime, "hh:mm a");
    }
    const endTime = calculateEndTime(
      selectedDate,
      startTime,
      eventData.eventDuration
    );
    console.log(selectedDate, startTime, "gooooooooood", endTime);
    const queryParams = new URLSearchParams({
      ...Object.fromEntries(searchParams), // Preserve existing query params
      date: selectedDate, // Add the new query params
      startTime,
      endTime,
    }).toString();
    navigate(`/${id}/${eventName}/booking?${queryParams}`);
    //navigate("/booking");
  };

  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row px-4 py-8 mt-8   ">
        <div className="p-10  pt-6 lg:w-1/4   border-t border-b  border-l h-screen  rounded-s-lg  pb-96  ">
          <h1 className="text-xl font-bold mb-4">{eventData.eventName}</h1>
          <div className="flex items-center mb-4 text-center">
            <Avatar className="w-12 h-12 mr-4 bg-gray-200">
              <AvatarImage src="" />
              <AvatarFallback className="flex items-center mx-auto">
                {userData?.firstName?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="mb-2">
            <h2 className="text-lg font-semibold">
              {`${userData.firstName} ${userData.lastName}`}
            </h2>
          </div>
          <div className="flex items-center mb-4">
            <Clock className="mr-2" />
            <span>{eventData.eventDuration} minutes</span>
          </div>
          {/* <div className="flex items-center  mb-4">
            <Calendar className="mr-2" />
            <span>Google meeet:https://helloworldddd</span>
          </div> */}
          {/* <p className="text-gray-700">{eventData.eventDescription}</p> */}
        </div>
        <div className="">
          <BookingForm
            handlingTimeEvents={handlingTimeEvents}
            availabilityArray={availability}
          />
        </div>
      </div>
    </>
  );
};

export default EventDetails;
