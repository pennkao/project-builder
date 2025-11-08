import "@/index.css";
import Login from "@/pages/AuthPages/Login";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Login />
  </BrowserRouter>
);
