import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./components/App";

import "./assets/styles/normalize.css";
import "./assets/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
