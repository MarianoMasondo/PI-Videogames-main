import React from "react";
import styles from "./landingPage.module.css"

export default function landingPage(props){
    return(
        <div className={styles.container}>
            <h1>Sphere</h1>
            <h3>Welcome to the games world</h3>
            <img src="" alt="background image" />
            <button onClick={props.ingresar}>Ingresar</button>
        </div>
    );
}
