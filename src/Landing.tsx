import React, { useRef, useState } from "react";
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
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { addUserData } from "./app-store/registerSlice";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";
import axios from "axios";

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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const [emailValidationError, setEmailValidationError] = useState("");

  const validateEmailWithServer = async (email: string) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_BASE_URL}/check`,
        {
          email,
        }
      );
      return response.data.isValid;
    } catch (error) {
      return false;
    }
  };
  const validateEmail = debounce(async (email: string, setFieldError: any) => {
    if (!email) {
      setEmailValidationError("Email is required");
      return;
    }

    try {
      const isValid = await validateEmailWithServer(email);
      if (!isValid) {
        setEmailValidationError("This email does not exist in our records.");
      } else {
        setFieldError("email", "");
        setEmailValidationError(""); // Clear error if valid
      }
    } catch (error) {
      setFieldError(
        "email",
        "There was an issue validating the email. Please try again."
      );
      setEmailValidationError(
        "There was an issue validating the email. Please try again."
      );
    }
  }, 500); // Debounce with a 500ms delay

  const handleSubmit = async (values: any, { setErrors }: any) => {
    if (!emailValidationError) {
      try {
        const endpoint = isSignUp ? "/auth/sign-up" : "/auth/sign-in";
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_BASE_URL}${endpoint}`,
          values
        );

        if (response.data) {
          Cookies.set(
            `authToken${response.data.data.userData._id}`,
            response.data.data.token,
            { expires: 10 }
          );
          dispatch(addUserData(response.data.data.userData));
          navigate("/events/user/me");
        } else {
        }
      } catch (error: any) {
        if (error.response.data.type == "INVALID_PASSWORD") {
          setErrors({
            password: "The entered password is incorrect",
          });
        }
        if (error.response.data.type == "USER_NOT_FOUND") {
          setErrors({
            email: "This email is not registered with us.",
          });
        }
      }
    }
  };
  const formikRef = useRef(null);

  return (
    <>
      <div className="w-full min-h-screen bg-blue-500 relative flex items-center justify-center">
        {/* Grid Lines - Only show on larger screens */}
        <div className=" md:block absolute inset-0 grid grid-cols-96 grid-rows-96">
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
        <div className="z-10 text-center w-full px-4 sm:px-6">
          {/* App Logo */}
          <div className="animate-jump">
            <img
              src="https://dev-application-portal.s3.eu-north-1.amazonaws.com/calendLit.png"
              alt="App Logo"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 mx-auto"
            />
          </div>

          {/* Main Text */}
          <h1 className="text-white text-3xl sm:text-4xl font-bold">Cal.LIT</h1>
          <h2 className="text-white mb-4 mt-1 text-sm sm:text-base md:text-lg">
            Organise and schedule your meetings efficiently
          </h2>

          {/* Get Started Button */}
          <Dialog
            onOpenChange={(isOpen) => {
              if (!isOpen) {
                setEmailValidationError("");
                ((formikRef as any)?.current).resetForm();
              }
            }}
          >
            <DialogTrigger asChild>
              <button className="bg-white text-black py-2 px-4 sm:py-3 sm:px-6 rounded-md shadow-md hover:bg-blue-500 hover:text-white transition duration-200 text-sm sm:text-base">
                Get Started
              </button>
            </DialogTrigger>
            <DialogContent className="w-[90%] sm:max-w-[425px] md:w-2/3 lg:w-2/5">
              <DialogHeader>
                <div className="flex justify-center gap-4 py-2 sm:py-4">
                  <button
                    type="button"
                    className={`px-3 py-1 sm:px-4 sm:py-2 transition-all duration-300 text-sm sm:text-base ${
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
                    className={`px-3 py-1 sm:px-4 sm:py-2 transition-all duration-300 text-sm sm:text-base ${
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
                innerRef={formikRef}
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
                  email: Yup.string(),
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
                    <div className="space-y-3 py-2 sm:py-4">
                      {isSignUp && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Field
                              id="firstName"
                              name="firstName"
                              placeholder="First Name"
                              className="w-full p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
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
                              className="w-full p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
                            />
                            <ErrorMessage
                              name="lastName"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                        </div>
                      )}

                      <div className="relative flex items-center">
                        <Mail className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Email"
                          className="pl-9 sm:pl-10 p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-sm sm:text-base"
                          onChange={async (
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const email = e.target.value;
                            setFieldValue("email", email);
                            validateEmail(email, setFieldError);
                          }}
                        />
                      </div>
                      {emailValidationError && (
                        <div className="text-red-500 text-xs">
                          {emailValidationError}
                        </div>
                      )}
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs"
                      />

                      <div className="relative flex items-center">
                        <Lock className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                        <Field
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="pl-9 sm:pl-10 pr-9 sm:pr-10 p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-sm sm:text-base"
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setFieldValue("password", e.target.value);
                            setPasswordStrength(
                              evaluatePasswordStrength(e.target.value)
                            );
                          }}
                        />
                        <button
                          type="button"
                          className="absolute right-3 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          ) : (
                            <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                          )}
                        </button>
                      </div>

                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs"
                      />

                      {/* Password Strength Indicator */}
                      {passwordStrength >= 1 && isSignUp && (
                        <div className="mt-1 sm:mt-2">
                          <div
                            className={`h-0.5 rounded-full ${
                              passwordStrength === 0
                                ? "bg-gray-300"
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
                          <div className="text-xs text-gray-500 mt-1">
                            {passwordStrength <= 1
                              ? "Weak"
                              : passwordStrength === 3
                              ? "Medium"
                              : passwordStrength === 4
                              ? "Strong"
                              : "Very Strong"}
                          </div>
                        </div>
                      )}
                      {isSignUp && (
                        <>
                          <div className="relative flex items-center">
                            <Lock className="absolute left-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                            <Field
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm Password"
                              className="pl-9 sm:pl-10 pr-9 sm:pr-10 p-2 sm:p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-sm sm:text-base"
                            />
                            <button
                              type="button"
                              className="absolute right-3 text-gray-500"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              tabIndex={-1}
                            >
                              {showConfirmPassword ? (
                                <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                              ) : (
                                <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                              )}
                            </button>
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

                    <DialogFooter className="flex items-center justify-center py-2 sm:py-4">
                      <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-400 text-white w-full py-2 sm:py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
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
        <div className="absolute bottom-4 w-full text-center text-gray-200 text-xs sm:text-sm">
          Powered by <a>Disruptive Edu Pvt. Ltd.</a>
        </div>
      </div>

      {/* TailwindCSS Keyframes and Animation for Jump Effect */}
      <style>
        {`
        @keyframes jump {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        .animate-jump {
          animation: jump 1.5s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .animate-jump {
            animation: jump 2s ease-in-out infinite;
          }
        }
      `}
      </style>
    </>
  );
};

export default Landing;
