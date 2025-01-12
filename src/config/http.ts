import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",

  //baseURL: "http://13.48.71.110:8000/",
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Interceptor triggered");

    // Fetch the token from cookies
    const authToken = Cookies.get("authToken");
    console.log(authToken, "authhhh");

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
