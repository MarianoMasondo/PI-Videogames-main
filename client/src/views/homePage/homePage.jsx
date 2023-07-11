import styles from "./HomePage.module.css"
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getVideogames, orderVideogames, orderVideogamesRating } from "../../redux/actions";
import GenderFilter from "../../components/filters/Filters";
import Cards from "../../components/card/Card";
import Order from "../../components/order/Order";
import Pagination from "../../components/pagination/Pagination";
import SearchBar from "../../components/searchBar/SearchBar";


export default function HomePage() {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);

  const allVideogames = useSelector((state) => state.Videogames);
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getVideogames());
  }, [dispatch]);

  const handleOrderAscDesc = (e) => {
    e.preventDefault();
    if (e.target.value === "default") {
      dispatch(getVideogames()); // Restablecer el orden original llamando a la acción correspondiente
    } else {
      dispatch(orderVideogames(e.target.value));
    }
    setAux(!aux);
  };

  const handleOrderRating = (e) => {
    e.preventDefault();
    if (e.target.value === "default") {
      dispatch(getVideogames()); // Restablecer el orden original llamando a la acción correspondiente
    } else {
      dispatch(orderVideogamesRating(e.target.value));
    }
    setAux(!aux);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBarContainer}>
        <SearchBar />
      </div>
      <div className={styles.filtersContainer}>
        <GenderFilter />
      </div>
      <Order handleOrderAscDesc={handleOrderAscDesc} handleOrderRating={handleOrderRating} />    

      <div className={`${styles.paginationContainerCards} ${styles.cardContainer}`}>
        {currentGames?.map((game) => {
          return (
          <Cards 
            allVideogames={allVideogames}
            key={game.id} 
            id={game.id} 
            name={game.name} 
            platforms= {game.platforms}
            image={game.image} 
            released = {game.released}
            genres={game.genres} 
            rating={game.rating}
             />
          );
        })}
      </div>

      <div className={styles.paginationContainer}>
        <Pagination
          currentPage={currentPage} 
          gamesPerPage={gamesPerPage} 
          allVideogames={allVideogames.length} 
          paginate={paginate} />
      </div>
    </div>
  );
}
