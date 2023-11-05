import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment } from "react";

const routes = [
  {
    name: "Main",
    url: "/main",
  },
  {
    name: "Search",
    url: "/search",
  },
  {
    name: "Search by tome",
    url: "/search-tome",
  },
  {
    name: "Detailed search",
    url: "/detailed-search",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className={cl(styles.sidebar, styles.block)}>
      <ul className={styles.mainList}>
        {routes.map((route) => {
          return (
            <Fragment key={route.url + route.name}>
              <li className={cl("nav-item")}>
                <Link
                  className={cl(
                    "nav-link d-flex align-items-center",
                    styles.link,
                    {
                      [styles.active]: pathname.includes(route.url!),
                    }
                  )}
                  to={`${route.url}`}
                  state={{ name: route.name }}
                >
                  <p className={styles.content}>{route.name}</p>
                </Link>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
