import React from "react";
import { Avatar, AvatarFallback } from "./components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { axiosInstance } from "./config/http";
import EventCard from "./EventCard";

const UserPage = () => {
  //const users: any = axiosInstance.get("/");
  const users = [];
  return (
    <>
      <div className="container mx-auto px-4 py-10">
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
        {users?.events?.length === 0 ? (
          <div>
            <p className="text-center text-gray-600">
              No Public events available
            </p>
          </div>
        ) : (
          <div>
            {users?.events?.map((event: any) => {
              return <EventCard key={event.id} />;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default UserPage;
