import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const script = document.createElement("script");

script.async = true;
script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${
  import.meta.env.VITE_ADSENSE_CLIENT
}`;
script.crossOrigin = "anonymous";

document.head.appendChild(script);

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
);
