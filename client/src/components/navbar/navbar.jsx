import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <div className={styles.navBarContainer}>
      <img
        src="https://assets.soyhenry.com/LOGO-REDES-01_og.jpg"
        alt="Logo"
        className={styles.logo}
      />
      <div className={styles.titleContainer}>
        <h1>SPHERE</h1>
        <h3>The Henry´s Videogames App</h3>
      </div>
      <div className={styles.navButtons}>
        <Link to="/home">
          <button>Home</button>
        </Link>
        <Link to="/form">
          <button>Create</button>
        </Link>
      </div>
      <div className={styles.logoContainer}></div>
    </div>
  );
}
