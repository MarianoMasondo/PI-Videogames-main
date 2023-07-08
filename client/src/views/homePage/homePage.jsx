import styles from "./homePage.module.css";
import { useDispatch } from "react-redux";
import SearchBar from "../../components/searchBar/searchBar";
import Cards from "../../components/cards/cards";
import React, { useEffect, useState } from "react";
import  { getVideogames, orderVideogames, orderVideogamesRating } from "../../redux/actions";
import GenderFilter from "../../components/filters/filters";


export default function HomePage(){
    const dispatch = useDispatch();
    const [aux, setAux] = useState(false);

    useEffect(() => {
        dispatch(getVideogames());
    },[dispatch]);

    const handleOrderAscDesc = (e) => {
        e.preventDefault();
        dispatch(orderVideogames(e.target.value))
        setAux(!aux);
    }

    const handleOrderRating = (e) => {
        e.preventDefault();
        dispatch(orderVideogamesRating(e.target.value))
        setAux(!aux);
      }

    return(
        <div className={styles.container}>
            <SearchBar  />
            <GenderFilter />
            <div className={styles.orderAscDesc}>
            <select onChange={(e)=> handleOrderAscDesc(e)}>
              <option value="default" >Select by order</option>
              <option value="asc" >Ascendent</option>
              <option value="desc">Descendent</option>
            </select>
          </div>
          <div className={styles.orderByRating}>
            <select onChange={(e)=> handleOrderRating(e)}>
              <option value="default" >Select by rating</option>
              <option value="best" >Best</option>
              <option value="worst">Worst</option>
            </select>
          </div>
          
            <Cards />   
        </div>
        
    );
}