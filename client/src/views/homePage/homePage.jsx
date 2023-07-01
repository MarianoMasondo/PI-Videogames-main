import styles from "./homePage.module.css";
import { useDispatch } from "react-redux";
import SearchBar from "../../componets/searchBar/searchBar";
import Cards from "../../componets/cards/cards";
import React, { useEffect } from "react";
import  getVideogames from "../../redux/actions";


export default function HomePage(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVideogames());
    },[dispatch])

    return(
        <div className={styles.container}>
            <SearchBar />
            <Cards />      
        </div>
    );
}
