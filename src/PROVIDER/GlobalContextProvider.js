import React, { createContext, useState, useContext } from "react";

// Create context
const GlobalContext = createContext();

// Provider component to wrap your app
export const GlobalContextProvider = ({ children }) => {
  
  const [globalData, setGlobalData] = useState(localStorage.getItem("globalData") || {
    "data": "init"
  });

  const globalFunction = {
    flush: () => {
      setGlobalData({})
    }
  }

  return (
    <GlobalContext.Provider
      value={{ globalData, globalFunction }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => useContext(GlobalContext);
