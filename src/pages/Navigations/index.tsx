import { Outlet } from "react-router-dom";

const Navigations = () => {
  return (
    <div className="overflow-y-auto w-full">
      <Outlet />
    </div>
  );
};

export default Navigations;
