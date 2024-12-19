import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { axiosInstance } from "./config/http";
import EventCard from "./EventCard";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Header from "./Header";
import { addEventData } from "./app-store/eventSlice";

const UserPage = () => {
  const [events, setEvents] = useState([]); // State to store events
  const { id } = useParams();
  console.log("idd", id);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log(searchParams, "sear");

  const email = searchParams.get("email");
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  console.log(email, userId, name, "nameeeee");
  useEffect(() => {
    console.log("called");

    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(`/events/${id}`);
        // dispatch(addEventData(response.data.data));
        console.log(response.data.data);

        setEvents(response.data.data);
        //setEvents(response.data); // Assuming the response contains event data
        //console.log(response, "eree");
      } catch (error) {
        console.error("Error fetching events", error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventPage = (eventId: any, eventName: string) => {
    console.log(eventId, "eventId");
    navigate(
      `/${id}/${eventName}?email=${"sachinksibymuttar@gmail.com"}&userId=${1234444}&name=${"John Doe"}&eventId=${eventId}`
    );
  };
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-10 ">
        <div className="flex flex-col items-center mb-8">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="" alt="Av" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <h1>{"sachin"}</h1>
          <p className="text-center text-gray-600">
            Welcome to my schudling page.Please select an event below to book a
            call with me.
          </p>
        </div>
        {events?.length === 0 ? (
          <div>
            <p className="text-center text-gray-600">
              No Public events available
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {events?.map((event, index) => {
              return (
                <EventCard
                  key={index}
                  event={event}
                  isPublicPage={true}
                  handleEventPage={handleEventPage}
                />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default UserPage;
// function dispatch(arg0: any) {
//   throw new Error("Function not implemented.");
// }
