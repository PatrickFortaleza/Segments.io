import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.scss";

import { ScreenProvider } from "./context/ScreenProvider";

import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ScreenProvider>
        <App />
      </ScreenProvider>
    </React.StrictMode>
  </Provider>
);
