import { Route, Routes } from "react-router-dom";
import Home from "src/pages/Home";

const Navigations = () => {
  return (
    <div className="overflow-y-auto">
      <Routes>
        <Route element={<Home />} index path={"/main"} />
      </Routes>
    </div>
  );
};

export default Navigations;
