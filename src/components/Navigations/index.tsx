import { Route, Routes } from "react-router-dom";
import DetailedSearch from "src/pages/DetailedSearch";
import Home from "src/pages/Home";
import Search from "src/pages/Search";
import SearchTome from "src/pages/SearchTome";

const Navigations = () => {
  return (
    <div className="overflow-y-auto w-full">
      <Routes>
        <Route element={<Home />} index path={"/main"} />
        <Route element={<Search />} index path={"/search"} />
        <Route element={<SearchTome />} index path={"/tome-search"} />
        <Route element={<DetailedSearch />} index path={"/detailed-search"} />
      </Routes>
    </div>
  );
};

export default Navigations;
