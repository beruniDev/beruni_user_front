import cl from "classnames";
import styles from "./styles.module.scss";
import Button from "../Button";
import { useNavigateParams } from "src/hooks/useCustomNavigate";
import useQueryString from "src/hooks/useQueryString";
import { isMobile } from "src/utils/helpers";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/store/utils/types";
import { logoutHandler, tokenSelector } from "src/store/reducers/auth";

const Header = () => {
  const navigateParams = useNavigateParams();
  const sidebar = Number(useQueryString("sidebar"));
  const token = useAppSelector(tokenSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutHandler());
    navigate("/users/main");
  };

  const handleSidebar = () =>
    !!isMobile && navigateParams({ sidebar: !sidebar ? 1 : 0 });
  return (
    <header>
      <div className={cl(styles.block)}>
        <img
          src="/assets/images/main_bg.png"
          alt="logo-image"
          className={styles.leftImg}
        />
        <div className={styles.middle}>
          <h2 className="md:text-3xl text-[10px] font-thin uppercase text-center text-[#fcd200]">
            Heritage of Al-Beruni
          </h2>
          <h2 className="md:text-3xl text-[10px] font-thin uppercase text-center text-[#fcd200]">
            Al-Beruni Institute of Oriental Studies
          </h2>
        </div>

        <img
          src="/assets/images/institute_img.png"
          alt="logo-image"
          className={styles.rightImg}
        />
      </div>
      <div className="w-full bg-mainBrown flex justify-between items-center p-2">
        <Button
          mainIcon="/assets/icons/burger.svg"
          textClassName="font-bold"
          className="bg-white w-min"
          onClick={handleSidebar}
        >
          Main
        </Button>
        {!token ? (
          <Button
            textClassName="font-bold"
            onClick={() => navigate("/users/login")}
            className="bg-white w-min"
          >
            Login
          </Button>
        ) : (
          <Button
            onClick={handleLogout}
            textClassName="font-bold"
            className="bg-white w-min"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
