import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import { logoutHandler, tokenSelector } from "src/store/reducers/auth";
import Button from "../Button";

const routes = [
  {
    name: "Main",
    url: "/users/main",
  },
  {
    name: "Search",
    url: "/users/search",
  },
  {
    name: "Search by tome",
    url: "/users/tome-search",
  },
  {
    name: "Detailed search",
    url: "/users/detailed-search",
  },
  {
    name: "List",
    url: "/users/list",
  },
];

const adminRoutes = [
  {
    name: "Add",
    url: "/admin/add",
  },
  // {
  //   name: "Change",
  //   url: "/admin/change",
  // },
  // {
  //   name: "On basis of",
  //   url: "/admin/on-basis-of",
  // },
  {
    name: "Search",
    url: "/admin/search",
  },
  {
    name: "Filter",
    url: "/admin/filter",
  },
  {
    name: "List",
    url: "/admin/list",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const token = useAppSelector(tokenSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutHandler());
    navigate("/users/main");
  };

  return (
    <div className={cl(styles.sidebar)}>
      <ul className={styles.mainList}>
        {(token ? adminRoutes : routes).map((route) => {
          return (
            <Fragment key={route.url + route.name}>
              <li className={cl("nav-item")}>
                <Link
                  className={cl("text-black flex items-center", styles.link, {
                    [styles.active]: pathname.includes(route.url!),
                  })}
                  to={`${route.url}`}
                  state={{ name: route.name }}
                >
                  {route.name}
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ul>

      <div>
        {!token ? (
          <Link
            className={cl("flex items-center justify-center")}
            to={"/users/login"}
          >
            <Button className="bg-green-500">Login</Button>
          </Link>
        ) : (
          <div
            onClick={handleLogout}
            className={cl("flex items-center justify-center cursor-pointer")}
          >
            <Button className="bg-red-500 text-white">Logout</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
