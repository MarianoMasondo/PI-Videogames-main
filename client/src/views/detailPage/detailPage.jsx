import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getVideogames} from "../../redux/actions";
import styles from "./detailPage.module.css";
import Card from "../../componets/card/card";

export default function DetailPage(){
  const {id} = useParams();
  const dispatch = useDispatch();
  const videogames = useSelector((state) => state.Videogames);
  const videogame = videogames.find((game) => game.id === id);

  useEffect(() => {
    dispatch(getVideogames());
  },[dispatch]);

  if(!videogame){
    return <p>Juego no encontrado</p>
  }

    return(
      <div className={styles.container}>
          <Card
            id={videogame.id} 
            name={videogame.name}
            platforms={videogame.platforms}   
            image={videogame.image}
            released={videogame.released}
            rating={videogame.rating}
            genres={videogame.genres}    
          />
        </div>
    );
}