import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import cl from "classnames";
import { Fragment, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import { logoutHandler, tokenSelector } from "src/store/reducers/auth";
import useToken from "src/hooks/useToken";

const Sidebar = () => {
  const navigate = useNavigate();
  const token = useAppSelector(tokenSelector);

  const routes = useMemo(() => {
    return [
      { name: "Главная страница", url: "/home", param: "?" },
      {
        name: "Поиск",
        url: "/search",
        hasline: true,
      },
      {
        name: "Все заявки",
        url: "/orders",
      },
      {
        name: "Принятые заказы",
        url: "/received-orders",
      },
      {
        name: "Товары",
        url: "/products",
      },
      {
        name: "Категории",
        url: "/categories",
      },
      {
        name: "Начинки",
        url: "/fillings",
      },
      { name: "Клиенты", url: "/clients" },
      {
        name: "Отзывы",
        url: "/comments",
        hasline: true,
      },
      { name: "Пользователи", url: "/users" },
      { name: "Филиалы", url: "/branches" },
      {
        name: "Роли",
        url: "/roles",
      },
      {
        name: "Test: View Web App",
        url: `/tg/order-type?key=${token}`,
      },
    ];
  }, []);

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { data } = useToken({});
  const permission = data?.permissions;
  const { data: me } = useToken({ enabled: false });

  const handleLogout = () => dispatch(logoutHandler());

  return (
    <div className={cl(styles.sidebar)}>
      <div className={styles.block}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img
            className="w-full m-3"
            src="/assets/icons/main-logo.svg"
            alt="safia-logo"
          />
        </div>
        <ul className={styles.mainList}>
          <li className={cl(styles.navItem)}>
            <Link
              className={cl(styles.link, {
                [styles.active]: pathname === "/home",
              })}
              to={"/home"}
            >
              <p className={styles.content}>Главная страница</p>
            </Link>
          </li>
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
                {route.hasline && <div className={styles.line} />}
              </Fragment>
            );
          })}
        </ul>
      </div>
      <div onClick={handleLogout} className={styles.logout}>
        Выйти ({me?.user.username})
      </div>
    </div>
  );
};

export default Sidebar;
