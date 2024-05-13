import { Link } from "react-router-dom";
import styles from "./index.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="md:flex flex-1 hidden" />

      <div className="flex flex-[3] gap-2 md:flex-row flex-col items-center">
        <img
          src="/assets/images/footer1.png"
          className="flex max-w-[300px] w-full"
          alt="footer-img"
        />
        <img
          src="/assets/images/footer2.png"
          alt="footer-img"
          className="flex max-w-[300px] w-full"
        />
        <img
          src="/assets/images/footer3.png"
          alt="footer-img"
          className="flex max-w-[250px] w-full"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center -order-1">
        <h2 className="text-textColor text-2xl font-bold">Contact</h2>
        <Link
          className="text-textColor font-bold text-xl"
          to={"tel:+998712625461"}
        >
          tel.: +(998-71)-262-54-61
        </Link>
        <Link
          className="text-textColor font-bold text-xl"
          to={"tel:+998712625277"}
        >
          faks: +(998-71)-262-52-77
        </Link>
        <Link
          className="text-textColor font-bold text-xl"
          to={"mailto:beruni1@academy.uz"}
        >
          e-mail: beruni1@academy.uz
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
