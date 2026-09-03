import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./index.css";

const content = (
  <HelmetProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </HelmetProvider>
);

// Only use Strict Mode in production for better DX in development
const root = ReactDOM.createRoot(document.getElementById("root"));

if (import.meta.env.DEV) {
  // Development: render without Strict Mode to avoid double-mounting
  root.render(content);
} else {
  // Production: use Strict Mode for additional safety checks
  root.render(<React.StrictMode>{content}</React.StrictMode>);
}
