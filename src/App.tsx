import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Navigation } from "./navigation";

import "dayjs";
import "dayjs/locale/pt-br";
import "react-toastify/dist/ReactToastify.min.css";
import "./styles/global.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { SidebarProvider } from "./hooks/useSidebar";
import Loading from "./components/Loading";

const App: React.FC = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Loading />
      <BrowserRouter>
        <SidebarProvider>
          <Navigation />
        </SidebarProvider>
      </BrowserRouter>
      <ToastContainer />
    </Provider>
  );
};

export default App;
