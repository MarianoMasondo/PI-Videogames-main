import React from "react";
import styles from "./card.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Card(props){
    const id = props.id;
    const DetailGame = useSelector((state) => state.DetailGame);
    
    return(
        <div className={styles.container} >
            <NavLink to={`/detail/${id}`} style={{ textDecoration: "none" }}>
            <img src={props.image} alt="" />
            <h1>{props.name}</h1>
            <p>Genres: {DetailGame.genres && DetailGame.genres.join(", ")}</p>
            <p className={styles.rating}>rating: {props.rating}</p>
            </NavLink>
            
        </div>
    )
    }
