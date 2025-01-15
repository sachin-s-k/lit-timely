import { Calendar, Globe2, User } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
const Success = () => {
  const [searchParams] = useSearchParams();

  // Extract parameters
  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  //const date = searchParams.get("date");
  const eventName = searchParams.get("eventName");
  const fullname = searchParams.get("fullname");
  const date = new Date(searchParams.get("date") as any);
  const formattedDate = date.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <>
      <div className="lg:border h-fit mx-auto mt-16 lg:rounded-md lg:shadow-lg w-3/4">
        <div className="">
          <div className="flex justify-center lg:mr-12">
            <div className="flex justify-center mt-16 gap-2">
              <div>
                <span className="font-extrabold text-lg">
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    className="w-5 h-5 mt-1"
                  >
                    <path
                      d="M10 0a10 10 0 1 0 10 10A10.012 10.012 0 0 0 10 0Zm4.884 8.384-5.5 5.5a1.251 1.251 0 0 1-1.768 0l-2.5-2.5a1.25 1.25 0 0 1 1.768-1.768L8.5 11.232l4.616-4.616a1.25 1.25 0 1 1 1.768 1.768Z"
                      fill="#028164"
                    ></path>
                  </svg>
                </span>
              </div>
              <div>
                <span className="font-bold">Your booking is complete.</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-600">
              A calendar invitation has been sent to your email address.
            </span>
          </div>
          <div className="mx-auto flex justify-center m-4 mt-6">
            <div className="border items-center rounded-lg justify-center p-2 w-2/5">
              <div className="flex gap-2 m-3">
                <div>
                  <span className="font-bold">{eventName}</span>
                </div>
              </div>
              <div className="flex gap-2 m-3">
                <User className="" color="gray" />
                <div>
                  <span className="text-gray-600">{fullname}</span>
                </div>
              </div>
              <div className="flex gap-2 m-3">
                <Calendar color="gray" />
                <div>
                  <span className="text-gray-600">
                    {startTime} - {endTime}, {formattedDate}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 m-3 text-gray-600">
                <Globe2 color="gray" />
                <div>
                  <span>Indian Standard Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Signup Section */}
        {/* Signup Section */}
        <div className="rounded-lg p-6 mx-auto mt-8 w-3/4 text-center mb-16">
          <h2 className="text-lg font-bold mb-4">
            Schedule your own meetings with Calendlit for free
          </h2>
          <p className="text-gray-600 mb-4">
            Eliminate the back-and-forth emails for finding time.
          </p>
          <div className="flex justify-center">
            {/* Google Signup */}
            <button className="flex items-center border border-b justify-center w-fit rounded-full p-3 text-white hover:bg-blue-50">
              {/* Google Icon */}
              <FcGoogle className="text-lg mr-2" />
              <span className="text-black font-thin text-sm">
                Google workspace account
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Success;
