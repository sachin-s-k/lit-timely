import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarImage } from "./components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

import { BookingForm } from "./BookingForm";
const EventDetails = () => {
  return (
    <>
      <div className="flex flex-col justify-center lg:flex-row px-4 py-8 mt-16  ">
        <div className="p-10  pt-6 lg:w-1/4   border-t border-b  border-l  rounded-s-lg  min-h-screen  ">
          <h1 className="text-xl font-bold mb-4">Sachin K Siby</h1>
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
        <div className="">
          <BookingForm />
        </div>
      </div>
    </>
  );
};

export default EventDetails;
