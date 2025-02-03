import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../app-store/store";

export const axiosInstance = axios.create({
  //baseURL: "http://localhost:8000",

  baseURL: "https://dev.cal.litschool.in/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Interceptor triggered");
    const userData: any = store.getState().registration.userData;

    // Fetch the tokezn from cookies
    const authToken = Cookies.get("authToken" + userData._id);
    console.log(authToken, "authhhh");
    if (!authToken) {
      window.location.href = "/"; // Redirect to the home page or login page
    }

    if (authToken) {
      // If the authToken exists, attach it to the headers
      config.headers["Authorization"] = `Bearer ${authToken}`; // Common way to send JWT tokens
      // Alternatively, you can use 'token' if that is the custom header name
      // config.headers['token'] = authToken;
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
