// const OTP = () => {
//   return (
//     <>
//       <div className="relative w-96 h-60 border border-gray-300 p-6 bg-white shadow-md">
//         {/* Content */}
//         <h3 className="text-xl font-semibold">Welcome to my scheduling</h3>
//         <p className="text-gray-600 mt-2">
//           Follow the instructions to add an event to my calendar.
//         </p>

//         {/* Powered by Tag */}
//         <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-gray-700 text-white text-xs font-semibold py-1 px-3 rounded-sm shadow-md">
//           Powered by Calendly
//         </div>
//       </div>
//     </>
//   );
// };

// export default OTP;
import { useState } from "react";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithCredential,
  PhoneAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";
const OTPVerification = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Step 1: Request OTP
  const requestOtp = async () => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      );
      setVerificationId(confirmationResult.verificationId);
      alert("OTP sent to your phone!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  // Step 2: Verify OTP
  const verifyOtp = async () => {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    try {
      const data = await signInWithCredential(auth, credential);
      setIsVerified(true);
      console.log(data, "dtaa");

      alert("Phone number verified!");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="otp-verification">
      {!isVerified ? (
        <>
          <h2>OTP Verification</h2>

          {/* Phone Number Input */}
          <div>
            <label>Phone Number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91XXXXXXXXXX"
            />
          </div>

          {/* OTP Input */}
          {verificationId && (
            <div>
              <label>Enter OTP:</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </div>
          )}

          {/* Buttons */}
          <div>
            {!verificationId ? (
              <button onClick={requestOtp}>Request OTP</button>
            ) : (
              <button onClick={verifyOtp}>Verify OTP</button>
            )}
          </div>

          {/* Recaptcha */}
          <div id="recaptcha-container"></div>
        </>
      ) : (
        <h3>Phone number successfully verified!</h3>
      )}
    </div>
  );
};

export default OTPVerification;
