import React from "react";
import styles from "./card.module.css";

export default function card(props){
    return(
        <div className={styles.container} alt="">
            <img  src={props.image} />
            <p>Name: {props.name}</p>
            <p>Genres: {props.genres}</p>
        </div>
    );
}
