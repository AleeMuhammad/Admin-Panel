import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import "./firebase"; 

import { Provider } from "react-redux";
import Store, { persistor } from "./redux/Store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
