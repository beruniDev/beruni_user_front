import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/rootConfig.ts";
import BaseAPIClient from "src/api/axiosConfig.ts";
import Loading from "./components/Loader/index.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/helpers";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// export const baseURL = "https://api.cakes.safiabakery.uz";
export const baseURL = "http://10.0.0.133:8000";
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
