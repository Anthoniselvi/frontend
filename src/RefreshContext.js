// RefreshContext.js
import React, { createContext, useContext, useState } from "react";

const RefreshContext = createContext();

export const useRefreshContext = () => {
  return useContext(RefreshContext);
};

export const RefreshProvider = ({ children }) => {
  const [refreshCount, setRefreshCount] = useState(0);

  const refreshPage = () => {
    setRefreshCount((prevCount) => prevCount + 1);
  };

  return (
    <RefreshContext.Provider value={{ refreshCount, refreshPage }}>
      {children}
    </RefreshContext.Provider>
  );
};
