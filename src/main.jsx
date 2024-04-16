import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@/assets/index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./stories/index.js";
import { TranslateProvider } from "./components/TranslateProvider/index.jsx";
import china from "@/locales/china.json";
import vi from "@/locales/vi.json";

const translate = {
  china,
  vi,
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <TranslateProvider
        translate={{
          china,
          vi,
        }}
        defaultLang="vi"
      >
        <App />
      </TranslateProvider>
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>
);
