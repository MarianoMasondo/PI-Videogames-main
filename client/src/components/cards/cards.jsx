import React from "react";
import styles from "./Cards.module.css";
import Card from "../card/Card";

export default function Cards({allVideogames, key, id, name, platforms, image, released, genres, rating}){
    
    return(
        <div className={styles.container}>
            {allVideogames.map((game) => (
                <Card
                key= {game.key}
                id= {game.id}
                name = {game.name}
                platforms= {game.platforms}
                image = {game.image}
                released = {game.released}
                rating = {game.rating}
                genres = {game.genres}
                />
            ))}
        </div>
    );
}