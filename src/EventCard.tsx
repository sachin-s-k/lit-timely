import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EventCard = ({ event, isPublicPage, handleEventPage }: any) => {
  const userData = useSelector((state: any) => state.registration.userData);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);

  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${userData.personalUrl}?eventId=${event._id}`
      );
      setCopied(true);
    } catch (error: any) {
      console.error("Error copying URL:", error);
    }
  };

  const openDeleteModal = (id: string) => {
    setCurrentEventId(id);
    setModalOpen(true);
  };

  return (
    <>
      <Card
        onClick={() => {
          handleEventPage(event._id, event.eventName);
        }}
        className="  cursor-pointer  shadow-md hover:shadow-lg transition-shadow duration-300  m-1"
      >
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-semibold text-gray-800 flex justify-between">
            <span>{event?.eventName}</span>
            {!isPublicPage && (
              <Edit
                size={22}
                onClick={() =>
                  navigate(`/create/new-events?eventId=${event._id}`)
                }
              />
            )}
          </CardTitle>
          <CardDescription className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{event?.eventDuration} mins</span>
            {/* {!isPublicPage && <span>{event?.Bookings?.length} Bookings</span>} */}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 text-gray-700 text-sm">
          {!isPublicPage && event?.eventDescription}
        </CardContent>

        {!isPublicPage && (
          <CardFooter className="p-4 flex gap-3 justify-between">
            <Button
              variant="outline"
              className="flex items-center gap-2 text-blue-60 hover:bg-blue-50"
              onClick={handleCopy}
            >
              <Link className="w-4 h-4" />
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button
              variant="destructive"
              className="flex items-center gap-2"
              onClick={() => openDeleteModal(event._id)}
            >
              <Trash2 className="w-4 h-4 " />
              Delete
            </Button>
          </CardFooter>
        )}
      </Card>

      <DeleteModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default EventCard;
