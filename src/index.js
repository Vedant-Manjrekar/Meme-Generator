import React from "react";
import ReactDOM from "react-dom/client";
import "../src/css/main.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import textReducer from "./features/textSlice";
import settingsReducer from "./features/settingsSlice";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: {
    text: textReducer,
    setting_drop: settingsReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
