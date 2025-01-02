import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../src/components/ui/card";
import { Button } from "../src/components/ui/button";
import { Edit, Link, Trash2 } from "lucide-react";
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { axiosInstance } from "./config/http";
import { useNavigate } from "react-router-dom";

// Assuming you have an Avatar component
// const bookedPersons = [
//   { name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
//   { name: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
//   { name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
//   { name: "Daisy", avatar: "https://i.pravatar.cc/150?img=4" },
//   { name: "Eve", avatar: "https://i.pravatar.cc/150?img=5" },
// ];

const EventCard = ({ event, isPublicPage }: any) => {
  const navigate = useNavigate();
  console.log(event, "evntt");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = async (id: string) => {
    console.log("Event deleted");
    setModalOpen(true); // Close modal after action
    const deleteResponse = await axiosInstance.delete(`/events/${id}`);
    if (deleteResponse.data.success) {
      navigate("/events/user");
    }
  };

  // const bookingPercentage = Math.min(
  //   (event?.bookings / event.maxBookings) * 100,
  //   100
  // );

  return (
    <>
      <Card
        // onClick={() => {
        //   handleEventPage(event._id, event.eventName);
        // }}
        className="border border-gray-200 cursor-pointer rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-gray-400 m-1"
      >
        <CardHeader className="p-4">
          {/* Title */}
          <CardTitle className="text-lg font-semibold text-gray-800 flex justify-between">
            <span> {event.eventName}</span>
            <span className="text-md">
              {!isPublicPage && (
                <Edit
                  size={22}
                  onClick={() => {
                    navigate(`/create/new-events?eventId=${event._id}`);
                  }}
                />
              )}
            </span>
          </CardTitle>

          {/* Description */}
          <CardDescription className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{event.eventDuration} mins</span>
            {!isPublicPage && <span>{event.Bookings.length} Bookings</span>}
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="p-4 text-gray-700 text-sm">
          <p>{event.eventDescription}</p>

          {/* Progress Section */}
          {!isPublicPage && (
            <></>
            // <div className="mt-4">
            //   <div className="bg-gray-200 rounded-full h-2">
            //     <div
            //       className="bg-blue-500 h-2 rounded-full"
            //       style={{ width: `${bookingPercentage}%` }}
            //     ></div>
            //   </div>
            //   <p className="text-xs text-gray-500 mt-1">
            //     {/* {bookingPercentage.toFixed(1)} */} 100% booked
            //   </p>
            // </div>
          )}
          {/* Avatars Row */}
          {!isPublicPage && (
            // <div className="mt-4 flex items-center gap-2">
            //   {/* Render Avatars */}
            //   <div className="flex -space-x-2">
            //     {bookedPersons?.slice(0, 4).map((person, index) => (
            //       <img
            //         key={index}
            //         src={person.avatar}
            //         alt={person.name}
            //         className="w-8 h-8 rounded-full border-2 border-white"
            //         title={person.name}
            //       />
            //     ))}
            //     {bookedPersons.length > 4 && (
            //       <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full border-2 border-white text-xs font-medium">
            //         +{bookedPersons.length - 4}
            //       </div>
            //     )}
            //   </div>
            // </div>
            <></>
          )}
        </CardContent>

        {/* Footer with Buttons */}
        {!isPublicPage && (
          <CardFooter className="p-4 flex gap-3 justify-between">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-blue-60 hover:bg-blue-50"
            >
              <Link className="w-4 h-4" /> Copy
            </Button>
            <Button variant="destructive" className="flex items-center gap-2">
              <Trash2
                className="w-4 h-4 "
                onClick={() => {
                  handleDelete(event._id);
                }}
              />{" "}
              Delete
            </Button>
          </CardFooter>
        )}
      </Card>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default EventCard;
