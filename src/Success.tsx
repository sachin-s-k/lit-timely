import {
  Calendar,
  Calendar1,
  Globe,
  Globe2,
  User,
  User2,
  User2Icon,
} from "lucide-react";

const Success = () => {
  return (
    <>
      <div className="lg:border h-screen mx-auto mt-16     lg:rounded-md lg:shadow-lg w-3/4">
        <div className="flex justify-center  ">
          <div className="flex justify-center mt-16 gap-2  ">
            <div>
              {" "}
              <span className="font-extrabold text-lg">
                {" "}
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  className="w-6 h-6"
                >
                  <path
                    d="M10 0a10 10 0 1 0 10 10A10.012 10.012 0 0 0 10 0Zm4.884 8.384-5.5 5.5a1.251 1.251 0 0 1-1.768 0l-2.5-2.5a1.25 1.25 0 0 1 1.768-1.768L8.5 11.232l4.616-4.616a1.25 1.25 0 1 1 1.768 1.768Z"
                    fill="#028164"
                  ></path>
                </svg>
              </span>
            </div>
            <div>
              <span className="font-bold">You are scheduled </span>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-gray-600">
            A calendar invitation has been sent to your email address.
          </span>
        </div>
        <div className="mx-auto flex justify-center m-4">
          <div className="border items-center rounded-md justify-center p-2">
            <div className="flex gap-2 m-3">
              <div className="">
                {" "}
                <span className="font-bold">LITMUS Test Interview</span>
              </div>
            </div>
            <div className="flex gap-2 m-3">
              <User className="" />
              <div className="">
                {" "}
                <span>Sachin K Siby</span>
              </div>
            </div>
            <div className="flex  gap-2 m-3">
              <Calendar />
              <div>
                {" "}
                <span>9:00am - 9:45am, Tuesday, December 10, 2024</span>
              </div>
            </div>
            <div className="flex  gap-2 m-3">
              <Globe2 />
              <div>
                {" "}
                <span>Indian Standard Time</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Success;
