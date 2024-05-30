import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { queryClient } from "./utils/helpers";
import App from "./App.tsx";
import { persistor, store } from "./store/rootConfig.ts";
import Loading from "./components/Loader/index.tsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={<Loading />}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
          <ToastContainer autoClose={600} />
        </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
