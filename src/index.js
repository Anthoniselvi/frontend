import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserAuthContextProvider, useUserAuth } from "./auth";

function Root() {
  const auth = useUserAuth();
  return (
    <BrowserRouter>
      <UserAuthContextProvider>
        <App auth={auth} />
      </UserAuthContextProvider>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
