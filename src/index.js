import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import AuthProvider from "./components/store/UserAuthentication/AuthProvider";
import { BrowserRouter } from "react-router-dom";
import TaskProvider from "./components/store/tasks/TaskProvider";


const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <TaskProvider>
        <App />
      </TaskProvider>
    </AuthProvider>
  </BrowserRouter>
);
