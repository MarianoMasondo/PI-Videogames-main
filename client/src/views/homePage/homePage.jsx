import styles from "./homePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../componets/searchBar/searchBar";
import Cards from "../../componets/cards/cards";
import React, { useEffect } from "react";
import  { getVideogames, searchVideogames } from "../../redux/actions";


export default function HomePage(){

    const dispatch = useDispatch();
    const videogames= useSelector((state) => state.Videogames);

    useEffect(() => {
        dispatch(getVideogames());
    },[dispatch]);

    const handleSearch = (searchValue) => {
      dispatch(searchVideogames(searchValue))
    }

    return(
        <div className={styles.container}>
            <SearchBar onSearch={handleSearch} />
            <Cards Videogames={videogames} />      
        </div>
    );
}