import React, { useEffect } from "react";

const GoogleOAuthPage = () => {
  //   useEffect(() => {
  //     // Ensure that the user is authenticated (e.g., check JWT token)
  //     const token = localStorage.getItem("jwtToken");
  //     if (!token) {
  //       window.location.href = "/login"; // Redirect to login if no JWT
  //     }
  //   }, []);

  const handleGoogleOAuth = () => {
    // This will redirect the user to the backend route that initiates Google OAuth flow
    window.location.href = "http://localhost:8000/auth/google"; // Backend route for OAuth
  };

  return (
    <div>
      <h2>Grant Google Permissions</h2>
      <button onClick={handleGoogleOAuth}>Grant Permissions</button>
    </div>
  );
};

export default GoogleOAuthPage;
