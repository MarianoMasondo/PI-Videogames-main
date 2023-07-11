import React from "react";
import Card from "../card/card";
import styles from "./nameSearch.module.css";
import { useSelector } from "react-redux";


export default function NameSearch(){
    const searchName= useSelector(state => state.searchName)
    console.log(searchName, "name");
    return(
        <div className={styles.container}>
            {searchName.map((game) => (
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