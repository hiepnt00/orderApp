import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import "./styles/app.scss";
import { store } from "./store";
import App from "./App";
import theme from "./theme";
import { CartProvider } from "./hooks/useCart";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <CartProvider>
          <BrowserRouter basename="/orderApp">
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </CartProvider>
      </Provider>
  </React.StrictMode>
);
