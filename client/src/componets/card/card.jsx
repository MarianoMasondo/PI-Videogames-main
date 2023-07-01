import React from "react";
import styles from "./card.module.css";

export default function card(props){
    return(
        <div className={styles.container} >          
            <img src={props.image} alt="" />
            <h1>{props.name}</h1>
            <p>Genres: {props.genres}</p>
        </div>
    )
    }
