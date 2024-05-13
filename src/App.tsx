import Header from "src/components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import DetailedSearch from "src/pages/DetailedSearch";
import Home from "src/pages/Home";
import Login from "src/pages/Login";
import Search from "src/pages/Search";
import SearchTome from "src/pages/SearchTome";
import { useAppSelector } from "./store/utils/types";
import { tokenSelector } from "./store/reducers/auth";
import EditAddBook from "./pages/EditAddBook";
import BookList from "./pages/List";
import PrintComponent from "./components/PrintComponent";

const App = () => {
  const navigate = useNavigate();
  const token = useAppSelector(tokenSelector);

  useEffect(() => {
    if (window.location.pathname === "/") navigate("/users/main");
  }, []);

  return (
    <>
      <div className="relative inset-0" />
      <Header />
      <div className="relative flex flex-col h-full justify-between z-10">
        <div className="flex p-2 md:p-4 md:h-[62vh] h-[65vh] md:min-h-[560px] shadowed bg-white">
          <Sidebar />

          <div className="w-full overflow-y-auto relative content">
            <img
              src="/assets/images/app-bg.png"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full"
              alt=""
            />
            <Routes>
              {!token ? (
                <Route path="/users">
                  <Route element={<Home />} index path={"main"} />
                  <Route element={<Search />} path={"search"} />
                  <Route element={<SearchTome />} path={"tome-search"} />
                  <Route
                    element={<DetailedSearch />}
                    path={"detailed-search"}
                  />
                  <Route element={<Login />} path={"login"} />
                </Route>
              ) : (
                // admin routes
                <Route path={"/admin"}>
                  <Route element={<EditAddBook />} path={"add"} />
                  <Route element={<Search />} path={"search"} />
                  <Route element={<DetailedSearch />} path={"filter"} />
                </Route>
              )}
              <Route element={<EditAddBook />} path={"/list/:id"} />
              <Route element={<BookList />} path={"/list"} />
              <Route element={<PrintComponent />} path={"/print/:id"} />
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
