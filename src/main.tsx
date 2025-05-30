import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./app-store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app-store/store.ts";
import "@fontsource/open-sauce-one/400.css"; // Specify weight
import "@fontsource/open-sauce-one/400-italic.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
