import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className={styles.navBarContainer}>
      <Link to="/home" className={styles.logoArea}>
        <div className={styles.logoOrb}></div>
        <span className={styles.logoText}>SPHERE</span>
      </Link>

      <div className={styles.navButtons}>
        <Link to="/home">
          <button
            className={`${styles.navButton} ${
              location.pathname === "/home" ? styles.active : ""
            }`}
          >
            HOME
          </button>
        </Link>

        <Link to="/create">
          <button
            className={`${styles.navButton} ${
              location.pathname === "/create" ? styles.active : ""
            }`}
          >
            + CREATE GAME
          </button>
        </Link>

        <Link to="/">
          <button className={styles.exitButton}>EXIT</button>
        </Link>
      </div>
    </nav>
  );
}