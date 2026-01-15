import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import ErrorBoundary from "./components/ErrorBoundary";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load the main component for better initial load performance
const App = lazy(() => import("./App"));

// Widget-specific container ID to avoid conflicts with host site
const WIDGET_CONTAINER_ID = "sunvolt-widget-container";

const rootElement = document.getElementById(WIDGET_CONTAINER_ID);

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error(
    `Sunvolt Widget Error: Container element with id "${WIDGET_CONTAINER_ID}" not found. ` +
    `Please add <div id="${WIDGET_CONTAINER_ID}"></div> to your HTML.`
  );
}
