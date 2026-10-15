import { createRoot } from "react-dom/client";
import App from "./Profile";
import { LoadingGate } from "./components/LoadingGate";
createRoot(document.getElementById("root")!).render(<LoadingGate page="profile"><App /></LoadingGate>);
