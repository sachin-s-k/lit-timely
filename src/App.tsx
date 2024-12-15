import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SideBar from "./SideBar";
import EventDetails from "./EventDetails";
import Availabilty from "./Availabilty";
import WeeklyAvailability from "./Availabilty";
import Success from "./Success";
import BookingPage from "./BookingPage";
import Test from "./Test";
import Testing from "./Testing";
import SignUp from "./SignUp";
import UserPage from "./UserPage";
import GoogleOAuthPage from "./Google";
import TestForm from "./TestForm";
import SkeletonCard from "./SkeletonCard";
import ProtectedRoute from "./ProtectedRoute";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/events/user" element={<SideBar />} />
          <Route path="/booking-page" element={<EventDetails />} />
          <Route path="/availability/user" element={<SideBar />} />
          <Route path="/meetings/user/" element={<SideBar />} /> */}

          {/* Protected Routes */}
          <Route
            path="/events/user"
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
            path="/availability/user"
            element={
              <ProtectedRoute>
                <SideBar />
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
          <Route path="/booking-page" element={<EventDetails />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/test" element={<TestForm />} />
          <Route path="/user" element={<UserPage />} />
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
