import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../src/components/ui/button";
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

const Header = () => {
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();
  const validateEmailWithServer = async (email: string) => {
    try {
      const response = await axiosInstance.post("/check", { email });
      return response.data.isValid; // Expecting `isValid` in the response
    } catch (error) {
      console.error("Error validating email:", error);
      return false;
    }
  };

  const handleSubmit = async (values: any, { setErrors }: any) => {
    try {
      const endpoint = isSignUp ? "/auth/sign-up" : "/auth/sign-in";
      const response = await axiosInstance.post(endpoint, values);

      if (response.data) {
        Cookies.set("authToken", response.data.data.token);
        dispatch(addUserData(response.data.data.userData));
        navigate("/events/user");

        //navigate("/events/user");
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

  return (
    <>
      <nav className="mx-auto py-1 px-6 flex justify-between items-center shadow-md border-b-2">
        <img src="" alt="Logo" className="w-16 h-16" />
        <div className="flex items-center gap-2">
          <Button className="bg-blue-500 hover:bg-blue-400">Get Started</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-gray-200 hover:bg-gray-300 text-black"
              >
                LogIn
              </Button>
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
                {({ isSubmitting, setFieldValue }) => (
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
                          onBlur={async (e: any) => {
                            const email = e.target.value;

                            // Check domain with regex
                            if (
                              !/^[a-zA-Z0-9._%+-]+@litschool\.in$/.test(email)
                            ) {
                              alert(
                                "Sorry, this mail is not registered with us."
                              );

                              return;
                            }

                            // Validate with the server
                            const isValid = await validateEmailWithServer(
                              email
                            );
                            if (!isValid) {
                              // alert(
                              //   "This email does not exist in our records."
                              // );
                            }
                          }}
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs"
                      />

                      {/* {isSignUp && (
                        <>
                          <div className="relative flex items-center">
                            <Phone className="absolute left-3 w-5 h-5 text-gray-500" />
                            <Field
                              id="mobile"
                              name="mobile"
                              type="text"
                              placeholder="Mobile Number"
                              className="pl-10 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
                            />
                          </div>
                          <div>
                            <ErrorMessage
                              name="mobile"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                        </>
                      )} */}

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
      </nav>
    </>
  );
};

export default Header;
