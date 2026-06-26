import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Hide preloader after React mounts
const preloader = document.getElementById("preloader");
if (preloader) {
  preloader.style.opacity = "0";
  setTimeout(() => preloader.remove(), 500);
}
