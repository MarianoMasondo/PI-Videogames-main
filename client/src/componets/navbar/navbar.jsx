import { Link } from "react-router-dom";
import styles from "./navBar.module.css";


export default function navBar(){
    return(
        <div className={styles.container}>
            <Link to="/home">home</Link>
            <Link to="/detail">detail</Link>         
            <Link to="/form">form</Link>         
        </div>
    );
}