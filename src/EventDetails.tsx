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
import { TailSpin, ThreeDots } from "react-loader-spinner";

const EventDetails = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

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
  const [availability, setAvailability] = useState([]);
  // const email = searchParams.get("email");
  const userId = searchParams.get("userId");
  const redirectUrl: any = searchParams.get("redirectUrl") || "";
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
      } catch (error: any) {}
    };
    fetchEventData();
  }, []);
  const handlingSlotBooking = async (bookingData: any) => {
    setIsSubmitting(true);
    try {
      await axios.post("https://dev.cal.litschool.in/api/events/booking-slot", {
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
      });

      // Show redirect loader
      setIsRedirecting(true);

      if (redirectUrl !== "") {
        setTimeout(() => {
          window.location.replace(redirectUrl);
        }, 1200);
      } else {
        setTimeout(() => {
          window.location.replace("https://apply-lit-school.vercel.app/");
        }, 1200);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlingTimeEvents = (selectedDate: any, startTime: any) => {
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
      {isRedirecting && (
        <div className="fixed inset-0 bg-white bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50">
          <TailSpin
            height="40" // Smaller size
            width="40"
            color="#9CA3AF" // Gray-400
            ariaLabel="loading"
          />
        </div>
      )}
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen bg-gray-100 z-50 absolute top-0 left-0">
          <ThreeDots color="gray" />{" "}
          {/* Assuming ThreeDots is the loader component */}
        </div>
      ) : (
        <div className="  sm:mt-0  lg:mt-10 grid grid-cols-1 md:flex md:flex-row justify-center px-4 py-8">
          <div
            className="
  p-10 pt-6 lg:pb-72 md:pb-72 border border-b-0
  rounded-t-md                      // Mobile
  sm:rounded-t-md                   // Small screens
  md:w-1/4 md:border-r-0 md:border-b md:rounded-none md:rounded-l-md  // Medium
  lg:w-1/4 lg:border-r-0 lg:border-b lg:rounded-none lg:rounded-l-md  // Large
"
          >
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
            <p className="text-gray-700">{eventData.eventDescription} </p>
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
