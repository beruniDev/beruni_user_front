import styles from "./styles.module.scss";

const Header = () => {
  return (
    <div className={styles.block}>
      <img
        src="/assets/images/beruni_logo.png"
        alt="logo-image"
        className={styles.leftImg}
      />
      <div className="">
        <h1>HERITAGE OF BIRUNI</h1>
        <h2>AL - BIRUNI INSTITUTE OF ORIENTAL STUDIES</h2>
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
