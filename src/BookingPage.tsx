import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { ArrowBigLeft, ArrowLeft, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row px-4 py-8 mt-16 h-screen ">
        <div className="p-10 pt-6 lg:w-1/3   border-t border-b  border-l  rounded-s-lg    ">
          <div className="flex w-10 h-10 hover:bg-blue-200 border rounded-full cursor-pointer items-center justify-center mb-2">
            <div onClick={() => navigate("/booking-page")}>
              <span>
                <ArrowLeft size={26} color="blue" />
              </span>
            </div>
          </div>

          <h1 className="text-lg font-semibold mb-4 text-gray-600 ">
            Sachin K Siby
          </h1>

          <div className="flex items-center mb-4">
            <Avatar className="w-12 h-12 mr-4">
              <AvatarImage src="https://i.pravatar.cc/150?img=2" />
              <AvatarFallback>iojojjoijo</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h2 className="text-lg font-semibold">jssjojojaj</h2>
            <p className="text-gray-600">@sfpskapopo</p>
          </div>
          <div className="flex items-center mb-4">
            <Clock className="mr-2" />
            <span>45 minutes</span>
          </div>
          <div className="flex items-center mb-4">
            <Calendar className="mr-2" />
            <span>Google meeet:https://helloworldddd</span>
          </div>
          <p className="text-gray-700">helloo csosjcisjcsppokkcpska</p>
        </div>
        <div className="border rounded-r-md w-2/5 ">
          <div className="m-4 ">
            <span className="font-bold text-gray-800">Enter Details</span>
          </div>
          <div className="m-4">
            <label htmlFor="" className="font-semibold text-gray-800">
              Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                className="border w-full h-11 rounded-md px-2"
              />
            </div>
          </div>
          <div className="m-4">
            <label htmlFor="" className="font-semibold text-gray-800">
              Email
            </label>
            <div className="mt-2">
              {" "}
              <input
                type="text"
                className="border w-full h-11 rounded-md px-2"
              />
            </div>
          </div>
          <div className="m-4 ">
            <label htmlFor="" className="font-semibold text-gray-800">
              Please share anything that will help prepare for our meeting.
            </label>
            <div className="mt-2">
              <textarea className="border w-full rounded-md px-2" rows={3} />
            </div>
          </div>
          <div className="m-4">
            <span className="text-gray-600 text-sm">
              By proceeding, you confirm that you have read and agree to{" "}
              <span className="text-blue-600">LIT's Terms of Use</span> and{" "}
              <span className="text-blue-600">Privacy Notice</span>.
            </span>
          </div>
          <div className="m-4">
            <button
              className="px-6 py-2.5 border rounded-3xl bg-blue-600 text-white"
              onClick={() => {
                navigate("/success");
              }}
            >
              Scheudle Event
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
