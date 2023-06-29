import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./landingPage.module.css"

export default function landingPage(props){
    return(
        <div className={styles.container}>
            <h1>Sphere</h1>
            <h3>Welcome to the games world</h3>   
            <NavLink to ="/home">
            <button>Ingresar</button>
            </NavLink>       
        </div>
    );
}