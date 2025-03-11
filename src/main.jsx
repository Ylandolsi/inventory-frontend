import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/index.scss";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
