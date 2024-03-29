import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { queryClient } from "./utils/helpers";
import "./index.scss";
import App from "./App.tsx";
import { persistor, store } from "./store/rootConfig.ts";
import BaseAPIClient from "src/api/axiosConfig.ts";
import Loading from "./components/Loader/index.tsx";
import "react-toastify/dist/ReactToastify.css";

// export const baseURL = "http://185.74.5.198:8002";
export const baseURL = "http://192.168.20.4:8000";
// export const baseURL = "http://10.0.0.137:8000";
export default new BaseAPIClient(baseURL, store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Loading absolute />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ToastContainer autoClose={600} />
        </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
