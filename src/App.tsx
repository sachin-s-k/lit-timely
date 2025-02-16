import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./SideBar";
import EventDetails from "./EventDetails";

import Success from "./Success";
import BookingPage from "./BookingPage";

import UserPage from "./UserPage";

import SlidingSidebar from "./SlidingSidebar";
import ProtectedRoute from "./ProtectedRoute";
import AppointmentTypesList from "./AppoinmentTypeList";
import Landing from "./Landing";
import SkeletonCard from "./SkeletonCard";
import CancelPublic from "./CancelPublic";
import CancelPage from "./CancelPage";
import Deactive from "./Deactive";

// import EventCard from "./NewCard";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* <Route path="/events/user" element={<SideBar />} />
          <Route path="/booking-page" element={<EventDetails />} />
          <Route path="/availability/user" element={<SideBar />} />
          <Route path="/meetings/user/" element={<SideBar />} /> */}

          {/* Protected Routes */}
          <Route
            path="/events/user/me"
            element={
              <ProtectedRoute>
                <SideBar />
              </ProtectedRoute>
            }
          />

          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute>
                <UserPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event-types/list"
            element={
              <ProtectedRoute>
                <SideBar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/event-types/list"
            element={
              <ProtectedRoute>
                <AppointmentTypesList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/meetings/user"
            element={
              <ProtectedRoute>
                <SideBar />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/tab/user"
            element={
              <ProtectedRoute>
                <SlidingSidebar />
              </ProtectedRoute>
            }
          /> */}
          <Route path="/availability/user" element={<SideBar />} />
          <Route path="/:id/:eventName" element={<EventDetails />} />
          <Route path="/:id/:eventName/booking" element={<BookingPage />} />

          <Route path="/:id" element={<UserPage />} />
          <Route path="/events-page/success" element={<Success />} />
          {/* <Route path="/events-page/List" element={<AppointmentTypesList />} /> */}
          <Route path="/events/types_list" element={<SideBar />} />
          <Route path="/create/new-events" element={<SlidingSidebar />} />
          {/* <Route path="/create/card" element={<Card />} /> */}
          <Route path="/create/card2" element={<SkeletonCard />} />
          <Route
            path="/meetings/cancel/:bookingId"
            element={<CancelPublic />}
          />
          <Route path="/events-page/cancel" element={<CancelPage />} />
          <Route path="/cancel-page/link-expired" element={<Deactive />} />

          {/*
          <Route path="/Sign-up" element={<SignUp />} />
         
          <Route path="/auth" element={<GoogleOAuthPage />} />
          <Route path="/test" element={<TestForm />} />
          <Route path="/shi" element={<SkeletonCard />} /> */}
        </Routes>
      </Router>
    </>
  );
};

export default App;
