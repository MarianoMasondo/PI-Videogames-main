import React from "react";
import styles from "./landingPage.module.css"
import { Link } from "react-router-dom";

export default function landingPage(){
    return(
        <div className={styles.landingContainer}>
            <h1 className={styles.titleContainer}>SPHERE </h1>
            <h3 className={styles.subTitleContainer}>Welcome to the Henry´s Videogames App</h3> 
            <Link to="/home">
            <button type="submit">Ingresar</button>
            </Link>              
        </div>
    );
}

