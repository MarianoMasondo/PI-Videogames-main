import { Link } from "react-router-dom";
import styles from "./navBar.module.css";


export default function navBar(){
    
    return(
        <div className={styles.navBarContainer}>
            <div>
            <h1 className={styles.titleContainer}>Sphere</h1>
                </div>

            <div>
            <Link to="/home">
                <button>Home</button>
                </Link>
            <Link to="/form">
                <button>Create</button>        
                </Link> 
                </div>

        </div>
    );
}