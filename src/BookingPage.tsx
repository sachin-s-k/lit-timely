import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ArrowLeft, Calendar, Clock, Globe2 } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const BookingPage = () => {
  const [loading, setLoading] = useState(false);
  const handleBack = () => {
    window.history.back(); // Goes back to the previous page in the browser history
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(searchParams, "searchParms");

  const { id } = useParams();
  const eventId = searchParams.get("eventId");
  const userId = searchParams.get("userId");

  const [eventData, setEventData] = useState({} as any);
  const [userData, setUserData] = useState({} as any);

  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  const date = searchParams.get("date");
  const parsedDate = new Date(date as any);
  const fullDate = format(parsedDate, "EEEE, MMMM dd, yyyy");

  useEffect(() => {
    setLoading(true);
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `https://dev.cal.litschool.in/events/booking/${id}?eventId=${eventId}`
        );
        setLoading(false);
        setUserData(response.data.userData);
        setEventData(response.data.eventData);
      } catch (error) {
        console.error("Error fetching event data", error);
      }
    };

    fetchEventData();
  }, [id, eventId]);

  // Fetch autofill values from URL query parameters
  const nameParam = searchParams.get("name") || "";
  const emailParam = searchParams.get("email") || "";
  const bookingId = searchParams.get("bookingId") || "";
  console.log(startTime, endTime, date, "dateeeeeeTime");

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: nameParam,
      email: emailParam,
      details: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      details: Yup.string().max(500, "Details must be 500 characters or less"),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      console.log(
        "Form values",
        values,
        "===",
        bookingId,
        eventId,
        startTime,
        endTime,
        id,
        date,
        userId
      );

      const handlingSlotBooking = async () => {
        setIsSubmitting(true);
        try {
          const response: any = await axios.post(
            "http://localhost:8000/events/booking-slot",
            {
              ...values,
              eventId,
              startTime,
              endTime,
              id,
              date,
              userId,
              bookingId,
            }
          );

          console.log(response, "response=======>");

          console.log(response.data, "sucessspage respose");
          navigate(
            `/events-page/success?startTime=${
              response.data.booking.startTime
            }&endTime=${response.data.booking.endTime}&date=${
              response.data.booking.date
            }&eventName=${response.data.booking.eventName}&fullname=${
              response.data.booking.ownerfirstName +
              " " +
              response.data.booking.ownerlastName
            }`
          );
        } catch (error: any) {
          console.error("Error booking slo======>t", error);
          toast.error(error.response.data.message);
        } finally {
          setIsSubmitting(false);
        }
      };

      handlingSlotBooking();
    },
  });

  return (
    <>
      {" "}
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen bg-gray-100 z-50 absolute top-0 left-0">
          <ThreeDots color="gray" />{" "}
          {/* Assuming ThreeDots is the loader component */}
        </div>
      ) : (
        <div className="flex flex-col justify-center lg:flex-row px-4 py-8 mt-14  h-160 ">
          {/* Event Info */}
          <div className="p-10 pt-6 lg:w-1/3 border-t border-b border-l rounded-s-lg ">
            <div className="flex w-10 h-10 hover:bg-blue-200 border rounded-full cursor-pointer items-center justify-center mb-2 m">
              <div onClick={handleBack}>
                <ArrowLeft size={26} color="blue" />
              </div>
            </div>

            <h1 className="text-xl font-bold mb-4">{eventData.eventName}</h1>

            <div className="flex items-center mb-4">
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage src={userData.profileImageUrl} />
                <AvatarFallback>
                  {userData?.firstName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="mb-2">
              <h2 className="text-lg font-semibold text-gray-600">
                {`${userData.firstName} ${userData.lastName}`}
              </h2>
              {/* <p className="text-gray-600">@ {userData.username || "username"}</p> */}
            </div>
            <div className="flex items-center mb-4">
              <Clock className="mr-2" color="gray" />
              <span className="text-gray-600">
                {eventData.eventDuration} min
              </span>
            </div>
            <div className="flex items-center mb-4">
              <Calendar className="mr-2" color="gray" />
              <span className="text-md text-gray-600">
                {startTime} - {endTime}, {fullDate}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <Globe2 className="mr-2" color="gray" />
              <span className="text-gray-600">Indian Standard Time</span>
            </div>
            <p className="text-gray-700">{eventData.eventDescription}</p>
          </div>

          {/* Booking Form */}
          <div className="border rounded-r-md w-2/5  ">
            <form onSubmit={formik.handleSubmit} className="m-4">
              <div>
                <label htmlFor="name" className="font-semibold text-gray-800">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`border w-full h-11 rounded-md px-2 mt-2 ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : ""
                  }`}
                  {...formik.getFieldProps("name")}
                  disabled={!!bookingId}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <label htmlFor="email" className="font-semibold text-gray-800">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`border w-full h-11 rounded-md px-2 mt-2 ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : ""
                  }`}
                  {...formik.getFieldProps("email")}
                  disabled={!!bookingId}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="mt-4">
                <label
                  htmlFor="details"
                  className="font-semibold text-gray-800"
                >
                  Meeting Preparation Details
                </label>
                <textarea
                  id="details"
                  className={`border w-full rounded-md px-2 mt-2 ${
                    formik.touched.details && formik.errors.details
                      ? "border-red-500"
                      : ""
                  }`}
                  rows={3}
                  {...formik.getFieldProps("details")}
                  disabled={!!bookingId}
                />
                {formik.touched.details && formik.errors.details && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.details}
                  </div>
                )}
              </div>

              {/* Terms of Use */}
              <div className="mt-4">
                <p className="text-gray-600 text-sm">
                  By proceeding, you confirm that you have read and agree to{" "}
                  <span className="text-blue-600 cursor-pointer">
                    LIT's Terms of Use
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 cursor-pointer">
                    Privacy Notice
                  </span>
                  .
                </p>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 border rounded-3xl bg-blue-600 text-white text-sm flex items-center justify-center ${
                    isSubmitting ? "bg-blue-500 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <ThreeDots
                      visible={true}
                      height="18"
                      width="100"
                      color="#e5e7eb"
                      ariaLabel="three-dots-loading"
                    />
                  ) : (
                    "Schedule Event"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default BookingPage;
