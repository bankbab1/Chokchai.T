import { createRoot } from "react-dom/client";
import App from "./Landing";
import { LoadingGate } from "./components/LoadingGate";
createRoot(document.getElementById("root")!).render(<LoadingGate page="landing"><App /></LoadingGate>);
