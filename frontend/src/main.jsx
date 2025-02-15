import "./app.css";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import queryClient from "config/queryClientConfig";

// import { StrictMode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ErrorPage from "pages/ErrorPage";
import ErrorBoundary from "components/wrappers/ErrorBoundary";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary fallback={<ErrorPage />}>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </ErrorBoundary>
);
