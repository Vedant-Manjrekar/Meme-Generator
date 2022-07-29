import React from "react";
import ReactDOM from "react-dom/client";
import "../src/css/main.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import textReducer from "./features/textSlice";
import { Provider } from "react-redux";

export const store = configureStore({
  reducer: {
    text: textReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
