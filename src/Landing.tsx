import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./components/ui/dialog";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Label } from "./components/ui/label";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./config/http";
import { addUserData } from "./app-store/registerSlice";
import Cookies from "js-cookie";

// Function to evaluate password strength
const evaluatePasswordStrength = (password: string): number => {
  let strength = 0;

  if (password.length >= 6) strength++;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

  return strength;
};

const Landing = () => {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const validateEmailWithServer = async (email: string) => {
    console.log("called server");

    try {
      const response = await axiosInstance.post("/check", { email });

      return response.data.isValid; // Expecting `isValid` in the response
    } catch (error) {
      console.error("Error validating email:", error);
      return false;
    }
  };

  const handleEmailValidationError = (
    email: string,
    setFieldError: (field: string, message: string) => void
  ) => {
    console.log("callled");

    // Check domain with regex
    if (!/^[a-zA-Z0-9._%+-]+@litschool\.in$/.test(email)) {
      setFieldError("email", "Sorry, this mail is not registered with us");
      return;
    }

    // Proceed with async email validation
    validateEmailWithServer(email)
      .then((isValid) => {
        console.log("API call success, isValid:", isValid);
        if (!isValid) {
          setFieldError("email", "This email does not exist in our records.");
        } else {
          setFieldError("email", ""); // Reset error if valid
        }
      })
      .catch((error) => {
        console.error("Error during email validation:", error);
        setFieldError("email", "There was an issue validating the email.");
      });
  };

  const handleSubmit = async (values: any, { setErrors }: any) => {
    try {
      const endpoint = isSignUp ? "/auth/sign-up" : "/auth/sign-in";
      const response = await axiosInstance.post(endpoint, values);

      if (response.data) {
        Cookies.set("authToken", response.data.data.token);
        dispatch(addUserData(response.data.data.userData));
        navigate("/events/user");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.data.message === "Invalid credentials") {
          setErrors({
            email: "This email is not registered with us.",
            password: "Password is incorrect.",
          });
        } else {
          setErrors({
            email: "An error occurred. Please try again.",
          });
        }
      } else {
        setErrors({
          email: "An error occurred. Please try again.",
        });
      }
    }
  };

  // function setFieldError(arg0: string, arg1: string) {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <>
      <div>
        <div className="w-screen h-screen bg-blue-500 relative flex items-center justify-center">
          {/* Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-96 grid-rows-96">
            {Array.from({ length: 97 }).map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full h-[0.5px] bg-gray-50 opacity-5"
                style={{ top: `${(i / 96) * 100}%` }}
              ></div>
            ))}
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full w-[0.5px] bg-gray-50 opacity-5"
                style={{ left: `${(i / 99) * 100}%` }}
              ></div>
            ))}
          </div>

          {/* Center Content */}
          <div className="z-10 text-center">
            {/* App Logo */}
            <div className=" animate-jump">
              <img
                src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png" // Replace with your logo path
                alt="App Logo"
                className="w-52 h-52 mx-auto"
              />
            </div>
            {/* Main Text */}
            <h1 className="text-white text-4xl font-bold">CalendLIT</h1>
            <h2 className="text-white mb-4 mt-1">
              Organise and schedule your meetings efficiently
            </h2>

            {/* Get Started Button */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="bg-white text-black py-3 px-6 rounded-md shadow-md hover:bg-blue-500 hover:text-white transition duration-200">
                  Get Started
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] lg:w-2/5">
                <DialogHeader>
                  <div className="flex justify-center gap-4 py-4">
                    <button
                      type="button"
                      className={`px-4 py-2 transition-all duration-300 ${
                        isSignUp
                          ? "text-gray-400"
                          : "text-blue-600 border-b-2 border-blue-600"
                      }`}
                      onClick={() => setIsSignUp(false)}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className={`px-4 py-2 transition-all duration-300 ${
                        isSignUp
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-400"
                      }`}
                      onClick={() => setIsSignUp(true)}
                    >
                      Sign Up
                    </button>
                  </div>
                </DialogHeader>
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    mobile: "",
                  }}
                  validationSchema={Yup.object({
                    firstName: isSignUp
                      ? Yup.string().required("First Name is required")
                      : Yup.string(),
                    lastName: isSignUp
                      ? Yup.string().required("Last Name is required")
                      : Yup.string(),
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Email is required")
                      .matches(
                        /^[a-zA-Z0-9._%+-]+@litschool\.in$/,
                        "Sorry, this mail is not registered with us"
                      ),
                    password: isSignUp
                      ? Yup.string()
                          .min(8, "Password must be at least 8 characters")
                          .matches(
                            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            "Password must contain at least one uppercase letter, one number, and one special character"
                          )
                          .required("Password is required")
                      : Yup.string().required("Password is required"),
                    confirmPassword: isSignUp
                      ? Yup.string()
                          .oneOf([Yup.ref("password")], "Passwords must match")
                          .required("Confirm Password is required")
                      : Yup.string(),
                  })}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, setFieldValue, setFieldError }) => (
                    <Form>
                      <div className="space-y-3 py-4">
                        {isSignUp && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="firstName">First Name</Label>
                              <Field
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                              <ErrorMessage
                                name="firstName"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div>
                              <Label htmlFor="lastName">Last Name</Label>
                              <Field
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                              />
                              <ErrorMessage
                                name="lastName"
                                component="div"
                                className="text-red-500 text-xs "
                              />
                            </div>
                          </div>
                        )}

                        <div className="relative flex items-center">
                          <Mail className="absolute left-3 w-5 h-5 text-gray-500" />
                          <Field
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                            onBlur={async (
                              e: React.FocusEvent<HTMLInputElement>
                            ) => {
                              const email = e.target.value;
                              // This is firing, so onBlur is working
                              handleEmailValidationError(email, setFieldError);
                              // Debug the email validation flow
                              console.log("Email onBlur triggered:", email);

                              // Check domain with regex
                              if (
                                !/^[a-zA-Z0-9._%+-]+@litschool\.in$/.test(email)
                              ) {
                                setFieldError(
                                  "email",
                                  "Sorry, this mail is not registered with us"
                                );
                                return;
                              }
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-500 text-xs"
                        />

                        <div className="relative flex items-center">
                          <Lock className="absolute left-3 w-5 h-5 text-gray-500" />
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setFieldValue("password", e.target.value);
                              setPasswordStrength(
                                evaluatePasswordStrength(e.target.value)
                              );
                            }}
                          />
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-red-500 text-xs"
                        />

                        {/* Password Strength Indicator */}
                        {passwordStrength >= 1 && isSignUp && (
                          <div className="mt-2">
                            <div
                              className={`h-1 rounded-full ${
                                passwordStrength === 0
                                  ? "bg-gray-200"
                                  : passwordStrength <= 2
                                  ? "bg-red-500"
                                  : passwordStrength === 3
                                  ? "bg-yellow-500"
                                  : passwordStrength === 4
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${(passwordStrength / 6) * 100}%`,
                              }}
                            ></div>
                            {passwordStrength >= 1 && (
                              <div className="text-xs text-gray-500 mt-1">
                                {passwordStrength <= 1
                                  ? "Weak"
                                  : passwordStrength === 3
                                  ? "Medium"
                                  : passwordStrength === 4
                                  ? "Strong"
                                  : "Very Strong"}
                              </div>
                            )}
                          </div>
                        )}

                        {isSignUp && (
                          <>
                            <div className="relative flex items-center">
                              <Lock className="absolute left-3 w-5 h-5 text-gray-500" />
                              <Field
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                className="pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                              />
                            </div>
                            <div>
                              <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </>
                        )}
                      </div>

                      <DialogFooter className="flex items-center justify-center py-4">
                        <Button
                          type="submit"
                          className="bg-blue-500 hover:bg-blue-400 text-white w-full py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                          {isSubmitting
                            ? "Submitting..."
                            : isSignUp
                            ? "Sign Up"
                            : "Login"}
                        </Button>
                      </DialogFooter>
                    </Form>
                  )}
                </Formik>
              </DialogContent>
            </Dialog>
          </div>

          {/* Footer Attribution */}
          <div className="absolute bottom-4 w-full text-center text-gray-200 text-sm">
            Powered by{" "}
            <a href="https://disruptiveacademy.com" className="underline">
              Disruptive Edu Pvt. Ltd.
            </a>
          </div>
        </div>
      </div>

      {/* TailwindCSS Keyframes and Animation for Jump Effect */}
      <style>
        {`
        @keyframes jump {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0); }
        }
        .animate-jump {
          animation: jump 1s ease-in-out infinite;
        }
      `}
      </style>
    </>
  );
};

export default Landing;
