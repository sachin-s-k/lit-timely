import axios from "axios";
import Cookies from "js-cookie";
export const axiosInstance = axios.create({
  //baseURL: "http://localhost:8000",

  baseURL: "https://dev.cal.litschool.in/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Interceptor triggered");

    // Fetch the token from cookies
    const authToken = Cookies.get("authToken");
    console.log(authToken, "authhhh");
    if (!authToken) {
      window.location.href = "/"; // Redirect to the home page or login page
    }

    if (authToken) {
      if (config.headers) {
        config.headers.token = authToken; // Attach the token to the headers
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
