import Cookies from "js-cookie";
import axios from "axios";

// axios instance
const authentication = axios.create({
  baseURL: "https://backend.faresharellc.com",
  // timeout: 2000,
});

// Request interceptor to handle API calls without tokens
authentication.interceptors.request.use(
  (config) => {
    // List of API endpoints that don't need a token
    const nonTokenEndpoints = [
      "/auth/brokerSocialSignIn",
      "/auth/brokerSocialSignup",
      "/auth/brokerSignUp",
      "/auth/brokerSignIn",
      "/auth/validatePassOTP",
      "/auth/sendPassOTP",
      "/auth/updatePassOTP",
      // Add more endpoints here
    ];

    // Check if the request URL is in the list of non-token endpoints
    if (nonTokenEndpoints.includes(config.url)) {
      // Ensure the Authorization header is not included
      delete config.headers.Authorization;
    }

    // You can add additional conditions or logic here if needed

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional)
authentication.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
  },
  function (error) {
    // *For unAuthorized
    // if (error.response.status === 401) {
    //   localStorage.clear()
    // }
    return Promise.reject(error);
  }
);

export default authentication;
