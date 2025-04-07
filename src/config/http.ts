import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../app-store/store";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userData: any = store.getState().registration.userData;

    // Fetch the tokezn from cookies
    const authToken = Cookies.get("authToken" + userData._id);
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
