import { ArrowLeft, Clock } from "lucide-react";
import { Avatar, AvatarImage } from "./components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { BookingForm } from "./BookingForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { addMinutes } from "date-fns/addMinutes";
import { format, parse } from "date-fns";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";

const EventDetails = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id, eventName } = useParams(); // Extract dynamic segments
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  //datt for quick

  const name = searchParams.get("name") || "";
  const email = searchParams.get("email") || "";
  const bookingId = searchParams.get("bookingId") || "";
  const eventCategory = searchParams.get("eventCategory") || "";
  const litApplicationUserId = searchParams.get("litApplicationUserId") || "";
  const cohortId = searchParams.get("cohortId") || "";
  const ownerBooking = searchParams.get("ownerBooking") || false;
  console.log("render event detail pagge");
  const [availability, setAvailability] = useState([]);
  // const email = searchParams.get("email");
  const userId = searchParams.get("userId");

  // const name = searchParams.get("name");
  const eventId = searchParams.get("eventId");
  const [eventData, setEventData] = useState({} as any);
  const [userData, setUserData] = useState({} as any);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `https://dev.cal.litschool.in/api/events/booking/${id}?eventId=${eventId}`
        );
        setUserData(response.data.userData);
        setEventData(response.data.eventData);
        setAvailability(response.data.availability);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchEventData();
  }, []);

  const handlingSlotBooking = async (bookingData: any) => {
    setIsSubmitting(true);
    try {
      const response: any = await axios.post(
        "https://dev.cal.litschool.in/api/events/booking-slot",
        {
          name,
          email,
          bookingId,
          eventId,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          id,
          date: bookingData.date,
          userId,
          eventCategory,
          cohortId,
          litApplicationUserId,
        }
      );
      console.log(response);

      window.location.replace("https://apply-lit-school.vercel.app");
      // navigate(
      //   `/events-page/success?startTime=${
      //     response.data.responseData.booking.startTime
      //   }&endTime=${response.data.responseData.booking.endTime}&date=${
      //     response.data.responseData.booking.date
      //   }&eventName=${response.data.responseData.booking.event.name}&fullname=${
      //     response.data.responseData.booking.organizer.firstName +
      //     " " +
      //     response.data.responseData.booking.organizer.lastName
      //   }`
      // );
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlingTimeEvents = (selectedDate: any, startTime: any) => {
    console.log(
      "callled time page",
      "se;lected datae",
      selectedDate,
      startTime,
      "starttt"
    );
    function calculateEndTime(dateString: any, startTime: any, duration: any) {
      // Parse the start date and time
      const startDateTime = parse(startTime, "hh:mm a", new Date(dateString));

      // Add the duration to the start time
      const endDateTime = addMinutes(startDateTime, duration);

      // Format the end time as desired
      return format(endDateTime, "h:mm a");
    }
    const endTime = calculateEndTime(
      selectedDate,
      startTime,
      eventData.eventDuration
    );
    const queryParams = new URLSearchParams({
      ...Object.fromEntries(searchParams), // Preserve existing query params
      date: selectedDate, // Add the new query params
      startTime,
      endTime,
    }).toString();

    if (searchParams.get("litApplicationUserId") !== null && !ownerBooking) {
      console.log(searchParams.get("litApplicationUserId"), "seeeeee");

      console.log("handleee called");

      handlingSlotBooking({ date: selectedDate, startTime, endTime });
    } else {
      navigate(`/${id}/${eventName}/booking?${queryParams}`);
    }
  };
  const handleBack = () => {
    window.history.back(); // Goes back to the previous page in the browser history
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen bg-gray-100 z-50 absolute top-0 left-0">
          <ThreeDots color="gray" />{" "}
          {/* Assuming ThreeDots is the loader component */}
        </div>
      ) : (
        <div className="flex flex-col justify-center lg:flex-row px-4 py-8 mt-8 ">
          <div className="p-10 pt-6 lg:w-1/4 border-t border-b border-l rounded-s-lg   pb-72">
            <div className="flex w-10 h-10 hover:bg-blue-200 border rounded-full cursor-pointer items-center justify-center mb-2">
              <div onClick={handleBack}>
                <ArrowLeft size={26} color="blue" />
              </div>
            </div>
            <h1 className="text-xl font-bold mb-4">{eventData.eventName}</h1>
            <div className="flex items-center mb-4 text-center">
              <Avatar className="w-12 h-12 mr-4 bg-gray-200">
                <AvatarImage src={userData.profileImageUrl} />
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
            <p className="text-gray-700">{eventData.eventDescription}</p>
          </div>

          <BookingForm
            handlingTimeEvents={handlingTimeEvents}
            availabilityArray={availability}
            litApplicationUserId={searchParams.get("litApplicationUserId")}
            isSubmitting={isSubmitting}
            ownerBooking={ownerBooking}
          />
        </div>
      )}
      <Toaster />
    </>
  );
};

export default EventDetails;
