import styles from "./homePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchBar/searchBar";
import React, { useEffect, useState } from "react";
import  { getVideogames, orderVideogames, orderVideogamesRating } from "../../redux/actions";
import GenderFilter from "../../components/filters/filters";
import Card from "../../components/card/card";
import Pagination from "../../components/pagination/pagination";

export default function HomePage(){
    const dispatch = useDispatch();
    const [aux, setAux] = useState(false);

    const allVideogames = useSelector((state) => state.Videogames);
    //estados locales para el paginado
    const [currentPage, setCurrentPage] = useState(1);
    const [gamesPerPage] = useState(15);
  
    //obtener el indice del ultimo game
    const indexOfLastGame = currentPage * gamesPerPage;
  
    //obtener el indice del primer game
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  
    //obtener el corte de los games por pagina
    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);
  
    //paginado
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    }

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
          <div className={styles.searchBarContainer}>
            <SearchBar  />
          </div>
          <div className={styles.filtersContainer}>
            <GenderFilter />
          </div>
            <div className={`${styles.orderAscDesc}`}>
            <select onChange={(e)=> handleOrderAscDesc(e)}>
              <option value="default" >Select by order</option>
              <option value="asc" >Ascendent</option>
              <option value="desc">Descendent</option>
            </select>
          </div>
          <div className={`${styles.orderByRating}`}>
            <select onChange={(e)=> handleOrderRating(e)}>
              <option value="default" >Select by rating</option>
              <option value="best" >Best</option>
              <option value="worst">Worst</option>
            </select>
          </div>          
           
            <div className={`${styles.paginationContainerCards} ${styles.cardContainer}`}>
        {
          currentGames?.map(game => {
            return (
              <Card
                key={game.id}
                id={game.id}
                name={game.name}
                image={game.image}
                genres={game.genres}
                rating={game.rating}
              />
            )
          })
        }
      </div>
      {/* paginado */}
      <div className={styles.paginationContainer}>
        <Pagination 
          currentPage={currentPage} /* pagina actual */
          gamesPerPage={gamesPerPage} /* juegos por paginas */
          allVideogames={allVideogames.length} /* todos los juegos */
          paginate={paginate} /* función para paginar */
        />
      </div>
        </div>
        
    );
}