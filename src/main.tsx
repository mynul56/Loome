import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeDB } from "./services/db";

// Initialize the mock localStorage database
initializeDB();

createRoot(document.getElementById("root")!).render(<App />);
