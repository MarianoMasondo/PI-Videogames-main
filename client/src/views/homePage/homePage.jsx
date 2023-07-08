import styles from "./homePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/searchBar/searchBar";
import React, { useEffect, useState } from "react";
import { getVideogames, orderVideogames, orderVideogamesRating } from "../../redux/actions";
import GenderFilter from "../../components/filters/filters";
import Card from "../../components/card/card";
import Pagination from "../../components/pagination/pagination";

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
      <div className={`${styles.orderAscDesc}`}>
        <select onChange={(e) => handleOrderAscDesc(e)}>
          <option value="default">Select by order</option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
      </div>
      <div className={`${styles.orderByRating}`}>
        <select onChange={(e) => handleOrderRating(e)}>
          <option value="default">Select by rating</option>
          <option value="best">Best</option>
          <option value="worst">Worst</option>
        </select>
      </div>

      <div className={`${styles.paginationContainerCards} ${styles.cardContainer}`}>
        {currentGames?.map((game) => {
          return (
            <Card key={game.id} id={game.id} name={game.name} image={game.image} genres={game.genres} rating={game.rating} />
          );
        })}
      </div>

      <div className={styles.paginationContainer}>
        <Pagination currentPage={currentPage} gamesPerPage={gamesPerPage} allVideogames={allVideogames.length} paginate={paginate} />
      </div>
    </div>
  );
}
