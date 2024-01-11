import React from "react";
import ReactDOM from "react-dom/client";
import "./completed.css";
import { CompletedTask } from "./CompletedTask";

const root = ReactDOM.createRoot(document.getElementById("root_com"));
root.render(
  <React.StrictMode>
    <CompletedTask />
  </React.StrictMode>
);
