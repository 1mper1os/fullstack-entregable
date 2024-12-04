import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { CourseProvider } from "./context/CourseContext";

import "./styles/reset.css";
import "./styles/global.css";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CourseProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </CourseProvider>
    </BrowserRouter>
  </React.StrictMode>
);