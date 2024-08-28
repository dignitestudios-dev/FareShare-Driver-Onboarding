import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiInterceptor";
import { useEffect } from "react";

export const RideBookingContext = createContext();

export const RideBookingContextProvider = ({ children }) => {
  // Global Error State
  const [error, setError] = useState(false);
  const [personalInfo, setPersonalInfo] = useState(null);

  return (
    <RideBookingContext.Provider
      value={{ personalInfo, setPersonalInfo, setError, error }}
    >
      {children}
    </RideBookingContext.Provider>
  );
};
