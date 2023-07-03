import React from "react";
import Card from "../card/card";
import styles from "./cards.module.css";
import { useSelector } from "react-redux";

export default function Cards(){
    const videogames= useSelector(state => state.Videogames)
    return(
        <div className={styles.container}>
            {videogames.map((game) => (
                <Card
                key= {game.id}
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