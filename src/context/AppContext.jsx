import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiInterceptor";
import { useEffect } from "react";

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
