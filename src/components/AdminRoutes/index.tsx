import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { tokenSelector } from "src/store/reducers/auth";
import { useAppSelector } from "src/store/utils/types";

const AdminRoutes = () => {
  const navigate = useNavigate();
  const token = useAppSelector(tokenSelector);

  useEffect(() => {
    if (!token) navigate("/");
  }, [token]);
  return <Outlet />;
};

export default AdminRoutes;
