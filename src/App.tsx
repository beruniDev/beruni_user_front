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

const App = () => {
  const navigate = useNavigate();
  const token = useAppSelector(tokenSelector);

  useEffect(() => {
    if (window.location.pathname === "/") navigate("/main");
  }, []);

  return (
    <Container className="relative flex flex-col h-[100vh]">
      <Header />
      <Card className="flex p-4 h-[75vh]">
        <Sidebar />
        <div className="w-full overflow-y-auto">
          <Routes>
            {token ? ( //user routes //todo !
              <Route path="/users">
                <Route element={<Home />} index path={"main"} />
                <Route element={<Search />} path={"search"} />
                <Route element={<SearchTome />} path={"tome-search"} />
                <Route element={<DetailedSearch />} path={"detailed-search"} />
                <Route element={<Login />} path={"login"} />
              </Route>
            ) : (
              // admin routes
              <Route path={"/admin"}>
                <Route element={<EditAddBook />} index path={"add"} />
              </Route>
            )}
          </Routes>
        </div>
      </Card>
      <Footer />
    </Container>
  );
};

export default App;
