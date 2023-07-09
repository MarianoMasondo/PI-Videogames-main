import React, { useEffect } from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {detailVideogames} from "../../redux/actions";
import styles from "./detailPage.module.css";

export default function DetailPage(){
  const {id} = useParams();
  const dispatch = useDispatch();
  const DetailGame = useSelector((state) => state.DetailGame);

  function stripTags(html){
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.tectContent || div.innerText || "";
  }

  useEffect(() => {
    dispatch(detailVideogames(id));
  },[dispatch, id]);

    return(
      <div className={styles.container}>
        <div className={styles.detailContainer}$>              
            <h1 className={styles.h1}>{DetailGame.name}</h1>
            <div><img src={DetailGame.image} className={styles.image} alt="" /></div>
            <p className={styles.description}>Description: {stripTags(DetailGame.description)}</p>
            <div className={styles.infoContainer}>
            <p className={styles.info}>Genres: {DetailGame.genres && DetailGame.genres.join(", ")}</p>           
            <p className={styles.info}><span className={styles.infoTitle}>Rating:</span><br/>{DetailGame.rating}</p>
            <p className={styles.info}>Released: {DetailGame.released}</p>
            <p className={styles.info}>Platforms: {DetailGame.platforms && DetailGame.platforms.map(platform => platform.platform.name).join(", ")}</p>
            <p className={styles.info}>Id:{DetailGame.id}</p> 
            </div>
        </div>
      </div>
    );
}