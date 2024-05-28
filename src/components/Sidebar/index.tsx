import { Link, useLocation } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment } from "react";
import { useAppSelector } from "src/store/utils/types";
import { tokenSelector } from "src/store/reducers/auth";
import useQueryString from "src/hooks/useQueryString";

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
    name: "Search by country",
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
  const sidebarState = Number(useQueryString("sidebar"));

  return (
    <div
      className={cl(styles.block, "content", { [styles.open]: !!sidebarState })}
    >
      <div className="order-2 flex md:hidden"></div>
      <div className={cl(styles.sidebar)}>
        <ul className={styles.mainList}>
          {(token ? adminRoutes : routes).map((route) => {
            return (
              <Fragment key={route.url + route.name}>
                <li>
                  <Link
                    className={cl(
                      "shadow-md shadow-black rounded-lg bg-[#ecdbc9]",
                      styles.link,
                      {
                        [styles.active]: pathname.includes(route.url!),
                      }
                    )}
                    to={`${route.url}`}
                  >
                    {route.name}
                  </Link>
                </li>
              </Fragment>
            );
          })}
        </ul>
        <div className="">
          <img
            src="/assets/images/beruni_logo.png"
            className="w-full max-h-[70%] h-full m-auto"
            alt="beruni-logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
