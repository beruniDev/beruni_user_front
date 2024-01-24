import Header from "src/components/Header";
import Container from "./components/Container";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";
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
    <div className="relative">
      <img
        src="/assets/images/bg.png"
        alt="background-image"
        className="z-0 fixed opacity-10 inset-0"
      />
      <Container className="relative flex flex-col h-full ">
        {/* <img src="/assets/images/bg.png" alt="" /> */}
        <Header />
        <Card className="flex p-2 md:p-4 h-[81vh] min-h-[560px]">
          <Sidebar />

          <div className="w-full overflow-y-auto">
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
        </Card>
        <Footer />
      </Container>
    </div>
  );
};

export default App;
