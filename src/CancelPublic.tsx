import { TailSpin, ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Calendar, Clock, Globe2 } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const BookingPage = () => {
  const [loading, setLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { bookingId } = useParams();

  const [eventData, setEventData] = useState({} as any);

  useEffect(() => {
    setLoading(true);
    const fetchEventData = async () => {
      try {
        const response = await axios.get(
          `https://cal.litschool.in/api/events/meetings/booking/${bookingId}`
        );
        if (!response.data.success) {
          navigate("/cancel-page/link-expired");
        }
        setLoading(false);
        setEventData(response.data.data);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [bookingId, navigate]);

  const formik = useFormik({
    initialValues: {
      cancelReason: "",
    },
    validationSchema: Yup.object({
      cancelReason: Yup.string().max(
        500,
        "Details must be 500 characters or less"
      ),
    }),
    onSubmit: (values) => {
      setIsSubmitting(true);
      const handlingSlotBooking = async () => {
        try {
          const response: any = await axios.post(
            `https://cal.litschool.in/api/events/meetings/cancel/${bookingId}`,
            { cancelReason: values.cancelReason }
          );

          if (response.data.success) {
            const redirectUrl = searchParams.get("redirectUrl");
            if (redirectUrl) {
              setIsRedirecting(true);
              setTimeout(() => window.location.replace(redirectUrl), 100);
            } else {
              navigate(
                `/events-page/cancel?startTime=${eventData.eventStartTime}&endTime=${eventData.eventEndTime}&date=${eventData?.eventDate}&eventName=${eventData?.eventId?.eventName}&fullname=${eventData?.userId?.firstName} ${eventData?.userId?.lastName}`
              );
            }
          }
        } catch (error: any) {
          toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
          setIsSubmitting(false);
        }
      };
      handlingSlotBooking();
    },
  });

  return (
    <>
      {isRedirecting && searchParams.get("redirectUrl") && (
        <div className="fixed inset-0 bg-white bg-opacity-100 backdrop-blur-sm flex items-center justify-center z-50">
          <TailSpin
            height="40"
            width="40"
            color="#9CA3AF"
            ariaLabel="redirecting-spinner"
          />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center w-full h-screen bg-gray-100 z-50 fixed top-0 left-0">
          <ThreeDots color="gray" />
        </div>
      ) : (
        <>
          {/* Original Desktop View (unchanged) */}
          <div className="hidden lg:block">
            <div className="relative flex flex-col justify-center lg:flex-row px-4 py-6 mt-14 h-screen">
              <div className="relative flex flex-col justify-center lg:flex-row w-full h-144 px-4 mt-">
                {/* Event Info */}
                <div className="p-10 pt-6 lg:w-1/3 border-t border-b border-l rounded-s-sm shadow-sm">
                  <h1 className="text-xl font-bold mb-4">
                    {eventData?.eventId?.eventName}
                  </h1>
                  <div className="mb-2">
                    <h2 className="text-lg font-semibold text-gray-600">
                      {`${eventData?.userId?.firstName} ${eventData?.userId?.lastName}`}
                    </h2>
                  </div>
                  <div className="flex items-center mb-4">
                    <Clock className="mr-2" color="gray" />
                    <span className="text-gray-600">
                      {eventData?.eventId?.eventDuration} min
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Calendar className="mr-2" color="gray" />
                    <span className="text-md text-gray-600">
                      {eventData?.eventStartTime} - {eventData?.eventEndTime},
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Globe2 className="mr-2" color="gray" />
                    <span className="text-gray-600">Indian Standard Time</span>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="relative border rounded-r-sm w-2/5 p-4 shadow-sm">
                  <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                      <h1 className="font-bold text-lg">Cancel Event?</h1>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="cancelReason"
                        className="font-semibold text-gray-800"
                      >
                        Reason for Canceling
                      </label>
                      <textarea
                        id="cancelReason"
                        className={`border w-full rounded-md px-2 mt-2 ${
                          formik.touched.cancelReason &&
                          formik.errors.cancelReason
                            ? "border-red-500"
                            : ""
                        }`}
                        rows={3}
                        {...formik.getFieldProps("cancelReason")}
                      />
                      {formik.touched.cancelReason &&
                        formik.errors.cancelReason && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.cancelReason}
                          </div>
                        )}
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
                          "Cancel Event"
                        )}
                      </button>
                    </div>
                  </form>

                  {/* Top-right Powered By */}
                  <a
                    href="https://lit.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-0 right-0 bg-gray-600 text-white text-xs font-bold w-24 h-24 flex items-start justify-center [clip-path:polygon(100%_0,0_0,100%_100%)]"
                  >
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <span className="transform rotate-45 text-xs font-semibold text-center translate-x-[20px] translate-y-[22px]">
                        Powered By
                      </span>
                      <span className="transform rotate-45 text-sm font-bold text-center translate-x-[8px] translate-y-[12px]">
                        LIT
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet View */}
          <div className="lg:hidden min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {/* Event Info */}
              <div className="p-6 border-b border-gray-200">
                <h1 className="text-xl font-bold mb-3">
                  {eventData?.eventId?.eventName}
                </h1>
                <div className="mb-3">
                  <h2 className="text-lg font-semibold text-gray-600">
                    {`${eventData?.userId?.firstName} ${eventData?.userId?.lastName}`}
                  </h2>
                </div>
                <div className="flex items-center mb-2">
                  <Clock className="mr-2" color="gray" size={18} />
                  <span className="text-gray-600">
                    {eventData?.eventId?.eventDuration} min
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  <Calendar className="mr-2" color="gray" size={18} />
                  <span className="text-gray-600">
                    {eventData?.eventStartTime} - {eventData?.eventEndTime}
                  </span>
                </div>
                <div className="flex items-center">
                  <Globe2 className="mr-2" color="gray" size={18} />
                  <span className="text-gray-600">Indian Standard Time</span>
                </div>
              </div>

              {/* Booking Form */}
              <div className="p-6">
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <h1 className="font-bold text-lg">Cancel Event?</h1>
                  <div className="mt-4">
                    <label
                      htmlFor="cancelReason"
                      className="block font-medium text-gray-800 mb-2"
                    >
                      Reason for Canceling
                    </label>
                    <textarea
                      id="cancelReason"
                      className={`border w-full rounded-md px-3 py-2 text-sm min-h-[120px] ${
                        formik.touched.cancelReason &&
                        formik.errors.cancelReason
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      {...formik.getFieldProps("cancelReason")}
                    />
                    {formik.touched.cancelReason &&
                      formik.errors.cancelReason && (
                        <div className="text-red-500 text-sm mt-1">
                          {formik.errors.cancelReason}
                        </div>
                      )}
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-4 py-3 border rounded-3xl bg-blue-600 text-white text-sm flex items-center justify-center ${
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
                        "Cancel Event"
                      )}
                    </button>
                  </div>
                </form>

                {/* Mobile Powered By */}
                <div className="mt-6 text-center">
                  <a
                    href="https://lit.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 text-xs"
                  >
                    Powered by LIT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Toaster />
    </>
  );
};

export default BookingPage;
