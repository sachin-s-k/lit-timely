import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../src/components/ui/card";
import { Button } from "../src/components/ui/button";
import { Link, Trash2 } from "lucide-react";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../src/components/ui/avatar";

// Assuming you have an Avatar component
const bookedPersons = [
  { name: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
  { name: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
  { name: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "Daisy", avatar: "https://i.pravatar.cc/150?img=4" },
  { name: "Eve", avatar: "https://i.pravatar.cc/150?img=5" },
];

const EventCard = ({
  title,
  duration,
  visibility,
  bookings,
  maxBookings = 50, // Default max bookings for progress calculation
  description,
  onCopy,
  onDelete,
}) => {
  const bookingPercentage = Math.min((bookings / maxBookings) * 100, 100);

  return (
    <Card className="border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-gray-400 m-1">
      <CardHeader className="p-4">
        {/* Title */}
        <CardTitle className="text-lg font-semibold text-gray-800">
          {title} Litmus Test
        </CardTitle>

        {/* Description */}
        <CardDescription className="flex justify-between text-sm text-gray-500 mt-2">
          <span>
            {duration}45 mins | public {visibility}
          </span>
          <span>{bookings} 40 Bookings</span>
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 text-gray-700 text-sm">
        <p>{description}</p>

        {/* Progress Section */}
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${bookingPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {/* {bookingPercentage.toFixed(1)} */} 100% booked
          </p>
        </div>
        {/* Avatars Row */}
        <div className="mt-4 flex items-center gap-2">
          {/* Render Avatars */}
          <div className="flex -space-x-2">
            {bookedPersons?.slice(0, 4).map((person, index) => (
              <img
                key={index}
                src={person.avatar}
                alt={person.name}
                className="w-8 h-8 rounded-full border-2 border-white"
                title={person.name}
              />
            ))}
            {bookedPersons.length > 4 && (
              <div className="w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-700 rounded-full border-2 border-white text-xs font-medium">
                +{bookedPersons.length - 4}
              </div>
            )}
          </div>
        </div>
      </CardContent>

      {/* Footer with Buttons */}
      <CardFooter className="p-4 flex gap-3 justify-between">
        <Button
          variant="outline"
          className="flex items-center gap-2 text-blue-60 hover:bg-blue-50"
          onClick={onCopy}
        >
          <Link className="w-4 h-4" /> Copy
        </Button>
        <Button
          variant="destructive"
          className="flex items-center gap-2"
          onClick={onDelete}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
