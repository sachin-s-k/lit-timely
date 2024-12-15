import { ErrorMessage, Field, Form, Formik } from "formik";

import { Label } from "./components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "./components/ui/dialog";
import * as Yup from "yup";
import { Button } from "./components/ui/button";
import { useState } from "react";
const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="border-gray-200 hover:bg-blue-100 w-52 h-11 flex justify-center items-center border-2 rounded-full mx-auto cursor-pointer">
            <div className="flex items-center gap-1 text-blue-600 font-light">
              <span className="text-xl">+</span>
              <span className="text-md">Login / Sign Up</span>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] lg:w-2/5">
          <DialogHeader>
            {/* Tab Selection */}
            <div className="flex justify-center gap-4">
              <button
                type="button"
                className={`px-4 py-2 ${
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
                className={`px-4 py-2 ${
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
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Email is required")
                .matches(
                  /^[a-zA-Z0-9._%+-]+@litschool\.in$/,
                  "Sorry,this mail is not registered with us"
                ),
              password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(
                  /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  "Password must contain at least one uppercase letter, one number, and one special character"
                )
                .required("Password is required"),
              confirmPassword: Yup.string().when(() => {
                if (isSignUp) {
                  return Yup.string()
                    .oneOf([Yup.ref("password")], "Passwords must match")
                    .required("Confirm Password is required");
                }
              }),
            })}
            onSubmit={(values) => {
              console.log(isSignUp ? "Sign Up" : "Login", values);
            }}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="grid gap-4 py-4">
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="col-span-4 p-2 border rounded-md w-full"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      className="w-full p-2 border rounded-md"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  {/* Confirm Password (only for Sign-Up) */}
                  {isSignUp && (
                    <div>
                      <Label htmlFor="confirmPassword" className="text-right">
                        Confirm Password
                      </Label>
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="w-full p-2 border rounded-md"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <DialogFooter className="flex items-center">
                  <Button type="submit" disabled={isSubmitting}>
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
    </>
  );
};

export default SignUp;
