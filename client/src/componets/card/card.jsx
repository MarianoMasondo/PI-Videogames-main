import React from "react";
import styles from "./card.module.css";

export default function card(props){
    return(
        <div className={styles.container} >
            <img src={props.image} alt="" />
            <p>Name: {props.name}</p>
            {
                
            }
            <p>Genres: {props.genres}</p>
        </div>
    );
}
