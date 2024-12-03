import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const testUrl = "";
  const prodUrl = "";

  const [activeLink, setActiveLink] = useState("Home");
  const [tab, setTab] = useState("");
  const [requestOpen, setRequestOpen] = useState(false);

  const push = useNavigate();
  const navigate = (name, url) => {
    push(url);
    setActiveLink(name);
    if (url !== "/ride/new-request/info") {
      setRequestOpen(false);
    }
  };

  // Global Error State
  const [error, setError] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isSocialLogin, setIsSocialLogin] = useState(false);
  const [vehicle_id, setVehicle_id] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntent, setPaymentIntent] = useState("");

  return (
    <AppContext.Provider
      value={{
        testUrl,
        prodUrl,
        navigate,
        activeLink,
        setActiveLink,
        tab,
        setTab,
        error,
        setError,
        requestOpen,
        setRequestOpen,
        isUploaded,
        setIsUploaded,
        isSocialLogin,
        setIsSocialLogin,
        vehicle_id,
        setVehicle_id,
        clientSecret,
        setClientSecret,
        paymentIntent,
        setPaymentIntent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
