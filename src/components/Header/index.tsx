import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.block}>
      <img
        src="/assets/images/beruni_logo.png"
        alt="logo-image"
        className={styles.leftImg}
      />
      <div className={styles.middle}>
        <h1 className="md:text-2xl text-[10px] font-bold">
          HERITAGE OF BIRUNI
        </h1>
        <h2 className="text-[8px] md:text-base">
          <span className={styles.capital}>A</span>L -{" "}
          <span className={styles.capital}>B</span>IRUNI{" "}
          <span className={styles.capital}>I</span>NSTITUTE OF
          <span className={styles.capital}> O</span>RIENTAL{" "}
          <span className={styles.capital}>S</span>TUDIES
        </h2>
      </div>

      <img
        src="/assets/images/institute_img.png"
        alt="logo-image"
        className={styles.rightImg}
      />
    </div>
  );
};

export default Header;
