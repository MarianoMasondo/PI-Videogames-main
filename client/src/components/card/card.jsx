import React from "react";
import styles from "./Card.module.css";
import { NavLink } from "react-router-dom";

export default function Card(props) {
  const genres = Array.isArray(props.genres) ? props.genres : [];

  return (
    <NavLink to={`/videogames/${props.id}`} className={styles.cardLink}>
      <article className={styles.container}>
        <button
          type="button"
          className={styles.favoriteButton}
          onClick={(e) => e.preventDefault()}
          aria-label="favorite"
        >
          ♡
        </button>

        <div className={styles.imageWrapper}>
          <img src={props.image} alt={props.name} />
        </div>

        <div className={styles.info}>
          <h2>{props.name}</h2>

          <div className={styles.genres}>
            {genres.length > 0 ? (
              genres.slice(0, 3).map((genre) => (
                <span key={genre} className={styles.genrePill}>
                  {genre}
                </span>
              ))
            ) : (
              <span className={styles.genrePill}>Unknown</span>
            )}
          </div>

          <div className={styles.footer}>
            <span className={styles.id}>#{props.id}</span>
            <span className={styles.rating}>⭐ {props.rating}</span>
          </div>
        </div>
      </article>
    </NavLink>
  );
}