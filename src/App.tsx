import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import SideBar from "./SideBar";
import EventDetails from "./EventDetails";

import Success from "./Success";
import BookingPage from "./BookingPage";

import UserPage from "./UserPage";
import GoogleOAuthPage from "./Google";
import TestForm from "./TestForm";

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
          <Route path="/:id/:eventName" element={<EventDetails />} />
          <Route path="/:id/:eventName/booking" element={<BookingPage />} />

          <Route path="/test" element={<TestForm />} />
          <Route path="/:id" element={<UserPage />} />
          <Route path="/auth/:id" element={<GoogleOAuthPage />} />
          <Route path="/events-page/success" element={<Success />} />
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
