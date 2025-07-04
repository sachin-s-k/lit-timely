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
          `https://dev.cal.litschool.in/api/events/booking/${id}?eventId=${eventId}`
        );
        setLoading(false);
        setUserData(response.data.userData);
        setEventData(response.data.eventData);
      } catch (error) {}
    };

    fetchEventData();
  }, [id, eventId]);

  // Fetch autofill values from URL query parameters
  const nameParam = searchParams.get("name") || "";
  const emailParam = searchParams.get("email") || "";
  const bookingId = searchParams.get("bookingId") || "";
  const eventCategory = searchParams.get("eventCategory") || "";
  const litApplicationUserId = searchParams.get("litApplicationUserId") || "";
  const cohortId = searchParams.get("cohortId") || "";

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

      const handlingSlotBooking = async () => {
        setIsSubmitting(true);
        try {
          const response: any = await axios.post(
            "https://dev.cal.litschool.in/api/events/booking-slot",
            {
              ...values,
              eventId,
              startTime,
              endTime,
              id,
              date,
              userId,
              bookingId,
              litApplicationUserId,
              eventCategory,
              cohortId,
            }
          );
          navigate(
            `/events-page/success?startTime=${
              response.data.responseData.booking.startTime
            }&endTime=${response.data.responseData.booking.endTime}&date=${
              response.data.responseData.booking.date
            }&eventName=${
              response.data.responseData.booking.event.name
            }&fullname=${
              response.data.responseData.booking.organizer.firstName +
              " " +
              response.data.responseData.booking.organizer.lastName
            }`
          );
        } catch (error: any) {
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
        // <div className="flex flex-col justify-center lg:flex-row px-4 py-8 mt-14  h-160 ">
        //   {/* Event Info */}
        //   <div className="p-10 pt-6 lg:w-1/3 border-t border-b border-l rounded-s-lg ">
        //     <div className="flex w-10 h-10 hover:bg-blue-200 border rounded-full cursor-pointer items-center justify-center mb-2 m">
        //       <div onClick={handleBack}>
        //         <ArrowLeft size={26} color="blue" />
        //       </div>
        //     </div>

        //     <h1 className="text-xl font-bold mb-4">{eventData.eventName}</h1>

        //     <div className="flex items-center mb-4">
        //       <Avatar className="w-12 h-12 mr-4">
        //         <AvatarImage src={userData.profileImageUrl} />
        //         <AvatarFallback>
        //           {userData?.firstName?.charAt(0).toUpperCase()}
        //         </AvatarFallback>
        //       </Avatar>
        //     </div>
        //     <div className="mb-2">
        //       <h2 className="text-lg font-semibold text-gray-600">
        //         {`${userData.firstName} ${userData.lastName}`}
        //       </h2>
        //       {/* <p className="text-gray-600">@ {userData.username || "username"}</p> */}
        //     </div>
        //     <div className="flex items-center mb-4">
        //       <Clock className="mr-2" color="gray" />
        //       <span className="text-gray-600">
        //         {eventData.eventDuration} min
        //       </span>
        //     </div>
        //     <div className="flex items-center mb-4">
        //       <Calendar className="mr-2" color="gray" />
        //       <span className="text-md text-gray-600">
        //         {startTime} - {endTime}, {fullDate}
        //       </span>
        //     </div>
        //     <div className="flex items-center mb-4">
        //       <Globe2 className="mr-2" color="gray" />
        //       <span className="text-gray-600">Indian Standard Time</span>
        //     </div>
        //     <p className="text-gray-700">{eventData.eventDescription}</p>
        //   </div>

        //   {/* Booking Form */}
        //   <div className="border rounded-r-md w-2/5  ">
        //     <form onSubmit={formik.handleSubmit} className="m-4">
        //       <div>
        //         <label htmlFor="name" className="font-semibold text-gray-800">
        //           Name
        //         </label>
        //         <input
        //           id="name"
        //           type="text"
        //           className={`border w-full h-11 rounded-md px-2 mt-2 ${
        //             formik.touched.name && formik.errors.name
        //               ? "border-red-500"
        //               : ""
        //           }`}
        //           {...formik.getFieldProps("name")}
        //           disabled={!!bookingId}
        //         />
        //         {formik.touched.name && formik.errors.name && (
        //           <div className="text-red-500 text-sm">
        //             {formik.errors.name}
        //           </div>
        //         )}
        //       </div>

        //       <div className="mt-4">
        //         <label htmlFor="email" className="font-semibold text-gray-800">
        //           Email
        //         </label>
        //         <input
        //           id="email"
        //           type="email"
        //           className={`border w-full h-11 rounded-md px-2 mt-2 ${
        //             formik.touched.email && formik.errors.email
        //               ? "border-red-500"
        //               : ""
        //           }`}
        //           {...formik.getFieldProps("email")}
        //           disabled={!!bookingId}
        //         />
        //         {formik.touched.email && formik.errors.email && (
        //           <div className="text-red-500 text-sm">
        //             {formik.errors.email}
        //           </div>
        //         )}
        //       </div>

        //       <div className="mt-4">
        //         <label
        //           htmlFor="details"
        //           className="font-semibold text-gray-800"
        //         >
        //           Meeting Preparation Details
        //         </label>
        //         <textarea
        //           id="details"
        //           className={`border w-full rounded-md px-2 mt-2 ${
        //             formik.touched.details && formik.errors.details
        //               ? "border-red-500"
        //               : ""
        //           }`}
        //           rows={3}
        //           {...formik.getFieldProps("details")}
        //           disabled={!!bookingId}
        //         />
        //         {formik.touched.details && formik.errors.details && (
        //           <div className="text-red-500 text-sm">
        //             {formik.errors.details}
        //           </div>
        //         )}
        //       </div>

        //       {/* Terms of Use */}
        //       <div className="mt-4">
        //         <p className="text-gray-600 text-sm">
        //           By proceeding, you confirm that you have read and agree to{" "}
        //           <span className="text-blue-600 cursor-pointer">
        //             LIT's Terms of Use
        //           </span>{" "}
        //           and{" "}
        //           <span className="text-blue-600 cursor-pointer">
        //             Privacy Notice
        //           </span>
        //           .
        //         </p>
        //       </div>

        //       <div className="mt-4 flex justify-end">
        //         <button
        //           type="submit"
        //           disabled={isSubmitting}
        //           className={`px-4 py-2 border rounded-3xl bg-blue-600 text-white text-sm flex items-center justify-center ${
        //             isSubmitting ? "bg-blue-500 cursor-not-allowed" : ""
        //           }`}
        //         >
        //           {isSubmitting ? (
        //             <ThreeDots
        //               visible={true}
        //               height="18"
        //               width="100"
        //               color="#e5e7eb"
        //               ariaLabel="three-dots-loading"
        //             />
        //           ) : (
        //             "Schedule Event"
        //           )}
        //         </button>
        //       </div>
        //     </form>
        //   </div>
        // </div>
        <div className="flex justify-center flex-col md:flex-row px-4 py-8 mt-0 sm:mt-14 min-h-[40rem]">
          {/* Event Info */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-6 md:p-8 lg:p-10 border md:border-r-0 lg:border-r-0 rounded-t-lg md:rounded-tr-none md:rounded-l-lg">
            <div className="flex w-10 h-10 hover:bg-blue-200 border rounded-full cursor-pointer items-center justify-center mb-4">
              <div onClick={handleBack}>
                <ArrowLeft size={26} color="blue" />
              </div>
            </div>

            {/* <h6 className="text-md md:text-3xl  mb-6">{eventData.eventName}</h6> */}
            <div className="text-md md:text-lg lg:text-lg font-bold mb-6">
              {eventData.eventName}
            </div>

            <div className="flex items-center mb-6">
              <Avatar className="w-12 h-12 mr-4">
                <AvatarImage src={userData.profileImageUrl} />
                <AvatarFallback>
                  {userData?.firstName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold text-gray-600">
                  {`${userData.firstName} ${userData.lastName}`}
                </h2>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Clock className="mr-2 min-w-[1rem]" color="gray" />
                <span className="text-gray-600">
                  {eventData.eventDuration} min
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2 min-w-[1rem]" color="gray" />
                <span className="text-md text-gray-600">
                  {startTime} - {endTime}, {fullDate}
                </span>
              </div>
              <div className="flex items-center">
                <Globe2 className="mr-2 min-w-[1rem]" color="gray" />
                <span className="text-gray-600">Indian Standard Time</span>
              </div>
            </div>

            <p className="text-gray-700">{eventData.eventDescription}</p>
          </div>

          {/* Booking Form */}
          <div className="w-full md:w-1/2 lg:w-2/5 border border-t-0 md:border-t rounded-b-lg md:rounded-bl-none md:rounded-r-lg">
            <form onSubmit={formik.handleSubmit} className="m-4 md:m-6">
              {/* Form fields remain the same as before */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block font-semibold text-gray-800 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`border w-full h-11 rounded-md px-3 ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  {...formik.getFieldProps("name")}
                  disabled={!!bookingId}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-semibold text-gray-800 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`border w-full h-11 rounded-md px-3 ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  {...formik.getFieldProps("email")}
                  disabled={!!bookingId}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="details"
                  className="block font-semibold text-gray-800 mb-1"
                >
                  Meeting Preparation Details
                </label>
                <textarea
                  id="details"
                  className={`border w-full rounded-md px-3 py-2 ${
                    formik.touched.details && formik.errors.details
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  rows={4}
                  {...formik.getFieldProps("details")}
                  disabled={!!bookingId}
                />
                {formik.touched.details && formik.errors.details && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.details}
                  </div>
                )}
              </div>

              {/* Terms of Use */}
              <div className="mb-6">
                <p className="text-gray-600 text-sm">
                  By proceeding, you confirm that you have read and agree to{" "}
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    LIT's Terms of Use
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 cursor-pointer hover:underline">
                    Privacy Notice
                  </span>
                  .
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 w-full sm:w-auto border rounded-3xl bg-blue-600 text-white text-sm md:text-base flex items-center justify-center ${
                    isSubmitting
                      ? "bg-blue-500 cursor-not-allowed"
                      : "hover:bg-blue-700"
                  } transition-colors`}
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
