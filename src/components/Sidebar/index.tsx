import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment, useState } from "react";
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
    url: "/list",
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
    url: "/list",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const token = useAppSelector(tokenSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [active, $active] = useState(false);

  const toggleActive = () => $active((prev) => !prev);

  const handleLogout = () => {
    dispatch(logoutHandler());
    navigate("/users/main");
  };

  return (
    <div className={cl(styles.block, { [styles.open]: active })}>
      <img
        src="/assets/images/beruni_logo.png"
        alt=""
        className="absolute z-0 opacity-20 top-1/2 -translate-y-1/2 -translate-x-[60%] left-1/2 "
      />
      <div className="order-2 flex md:hidden">
        <div className="cursor-pointer h-5 w-5 -mt-3 " onClick={toggleActive}>
          {!active ? (
            <img
              src="/assets/icons/burger.svg"
              className="h-full w-full"
              alt="open"
            />
          ) : (
            <img
              src="/assets/icons/cross.svg"
              className="h-full w-full"
              alt="close"
            />
          )}
        </div>
      </div>
      <div className={cl(styles.sidebar)}>
        <ul className={styles.mainList}>
          {(token ? adminRoutes : routes).map((route) => {
            return (
              <Fragment key={route.url + route.name}>
                <li className="nav-item">
                  <Link
                    className={cl("text-black flex items-center", styles.link, {
                      [styles.active]: pathname.includes(route.url!),
                    })}
                    to={`${route.url}`}
                    onClick={toggleActive}
                  >
                    {route.name}
                  </Link>
                </li>
              </Fragment>
            );
          })}
        </ul>

        <div onClick={toggleActive}>
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
    </div>
  );
};

export default Sidebar;
