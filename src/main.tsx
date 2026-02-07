import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CssBaseline } from "@mui/material";
import App from "./App.tsx";

import { BrowserRouter as Router } from "react-router-dom";
import ContextProvider from "./app/context/ContextProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <ContextProvider>
          <CssBaseline />
          <App />
        </ContextProvider>
      </Router>
    </Provider>
  </StrictMode>,
);
