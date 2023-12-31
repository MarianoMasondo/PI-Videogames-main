import React from "react";
import styles from "./Card.module.css";
import { NavLink } from "react-router-dom";

export default function Card(props) {
  const id = props.id;

  return (
    <div className={styles.container}>
      <NavLink to={`/detail/${id}`} style={{ textDecoration: "none" }}>
        <img src={props.image} alt="" />
        <h1>{props.name}</h1>
        <p>Genres: {props.genres && props.genres.join(", ")}</p>
        <p className={styles.rating}>Rating: {props.rating}</p>
      </NavLink>
    </div>
  );
}
