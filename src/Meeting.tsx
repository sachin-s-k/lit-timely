import { useEffect } from "react";
import BabelRow from "./BabelRow";
import { axiosInstance } from "./config/http";

const Meeting = () => {
  const fetcBookingData = async () => {
    const meetigDetails = await axiosInstance.get("/events/meeting/:id");
    console.log(meetigDetails);
  };
  useEffect(() => {
    fetcBookingData();
  }, []);
  const event = {
    time: "06:00am - 06:30am",
    markerColor: "rgb(130, 71, 245)",
    name: "Hello",
    type: "45",
    email: "sachin@litschool.in",
    location: null,
    timezone: "India Standard Time",
    questions: "Please share anything that will help prepare for our meeting.",
    host: "Sachin K Siby",
  };
  return (
    <>
      {/* <div className="border border-1 w-full mt-1 rounded-lg">
        <div className="m-2">
          <span className="text-md text-gray-600">My Meetings</span>
        </div>
      </div> */}
      <div className="border mt-4 rounded-lg">
        <div className="border-b p-2 mb-3">
          <ul className="flex m-3 mb-0  gap-4 rounded-lg cursor-pointer ">
            <li> Upcoming </li>
            <li> Pending</li>
            <li> Past </li>
          </ul>
        </div>
        {/* <div className="border h-4 m-4">elements</div>
        <div className="border h-4 m-4">elements</div>
        <div className="border h-4 m-4">elements</div> */}
        <div className="m-2">
          <BabelRow event={event} />
          <BabelRow event={event} />
          <BabelRow event={event} />
          <BabelRow event={event} />
        </div>
        <div className="border-t mb-12"></div>
      </div>
    </>
  );
};

export default Meeting;
