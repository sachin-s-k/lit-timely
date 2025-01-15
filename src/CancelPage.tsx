import { Calendar, Globe2, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams } from "react-router-dom";

const CancelPage = () => {
  const [searchParams] = useSearchParams();

  const startTime = searchParams.get("startTime");
  const endTime = searchParams.get("endTime");
  //const date = searchParams.get("date");
  //   const eventName :any= searchParams.get("eventName");
  const fullname = searchParams.get("fullname");
  //const date = new Date(searchParams.get("date") as any);
  //   const formattedDate = date.toLocaleDateString("en-GB", {
  //     weekday: "long",
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   });

  return (
    <div>
      <div className="lg:border h-fit mx-auto mt-16 lg:rounded-md lg:shadow-lg w-3/4">
        <div className="">
          <div className="flex justify-center lg:mr-12">
            <div className="flex justify-center mt-16 gap-2">
              <div className="flex items-center justify-center"></div>

              <div>
                <span className="font-bold">Meeting cancelled</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-4"></div>
          <div className="mx-auto flex justify-center m-4 mt-6">
            <div className="border items-center rounded-lg justify-center p-2 w-2/5">
              <div className="flex gap-2 m-3">
                <div>
                  <span className="font-bold">{}</span>
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
                    {startTime} - {endTime},
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
    </div>
  );
};

export default CancelPage;
